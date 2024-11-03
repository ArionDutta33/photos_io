import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
type MediaContextTYpe = {
  assets: MediaLibrary.Asset[];
  loadLocalAssets: () => void;
  getAssetById: (id: string) => MediaLibrary.Asset | undefined;
};

const MediaContext = createContext<MediaContextTYpe>({
  assets: [],
  loadLocalAssets: () => {},
  getAssetById: () => undefined,
});
export default function MediaContextProvider({ children }: PropsWithChildren) {
  const [persmissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [localAssets, setLocalAssets] = useState<MediaLibrary.Asset[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [endCursor, setEndCursor] = useState<string>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //!!!!og
    if (persmissionResponse?.status !== 'granted') {
      requestPermission();
    }
  }, []);
  useEffect(() => {
    if (persmissionResponse?.status === 'granted') {
      loadLocalAssets();
    }
  }, [persmissionResponse]);

  const loadLocalAssets = async () => {
    if (loading || !hasNextPage) return;
    setLoading(true);
    const assetsPage = await MediaLibrary.getAssetsAsync({
      after: endCursor,
    });
    console.log(assetsPage);
    setLocalAssets((existingItems) => [...existingItems, ...assetsPage.assets]);
    setHasNextPage(assetsPage.hasNextPage);
    setEndCursor(assetsPage.endCursor);
    setLoading(false);
  };

  const getAssetById = (id: string) => {
    return localAssets.find((asset) => asset.id === id);
  };

  return (
    <MediaContext.Provider value={{ assets: localAssets, loadLocalAssets, getAssetById }}>
      {children}
    </MediaContext.Provider>
  );
}
export const useMedia = () => useContext(MediaContext);
