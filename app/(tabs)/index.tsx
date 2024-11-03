import { Link, Stack } from 'expo-router';

import { FlatList, Pressable, Text } from 'react-native';
import { Image } from 'expo-image';
import { useMedia } from '~/providers/MediaProvider';

export default function Home() {
  const { assets, loadLocalAssets } = useMedia();

  return (
    <>
      <Stack.Screen options={{ title: 'Photos' }} />
      <Link href="/asset">Go to asset </Link>
      <FlatList
        data={assets}
        numColumns={4}
        contentContainerClassName="gap-[2px]"
        columnWrapperClassName="gap-1"
        onEndReached={loadLocalAssets}
        onEndReachedThreshold={1}
        // refreshing={loading}
        renderItem={({ item }) => (
          <Link href={`/asset/?id=${item.id}`} asChild>
            <Pressable style={{ width: '25%' }}>
              <Image style={{ width: '100%', aspectRatio: 1 }} source={{ uri: item.uri }} />
            </Pressable>
          </Link>
        )}
      />
    </>
  );
}
