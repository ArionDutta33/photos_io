import { Stack } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';

import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { Image } from 'expo-image';

export default function Home() {
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
    if (loading) return;
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

  console.log(JSON.stringify(persmissionResponse, null, 2));
  return (
    <>
      <Stack.Screen options={{ title: 'Photos' }} />
      <FlatList
        data={localAssets}
        numColumns={4}
        contentContainerClassName="gap-[2px]"
        columnWrapperClassName="gap-1"
        // columnWrapperStyle={{ gap: 2 }}
        // contentContainerStyle={{ padding: 2 }}
        renderItem={({ item }) => (
          <Image style={{ width: '25%', aspectRatio: 1 }} source={{ uri: item.uri }} />
        )}
      />
      {hasNextPage && (
        <Text onPress={loadLocalAssets} className="p-2 text-center">
          Load next
        </Text>
      )}
    </>
  );
}
