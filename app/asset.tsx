import { View, Text } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useMedia } from '~/providers/MediaProvider';
import { Image } from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
const asset = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getAssetById } = useMedia();

  const asset = getAssetById(id);
  if (!asset) {
    return <Text>asset not found</Text>;
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Photo',
          headerRight: () => <AntDesign name="cloudupload" size={24} color="black" />,
        }}
      />
      <Image
        contentFit="contain"
        source={{ uri: asset.uri }}
        style={{ width: '100%', height: '100%' }}
      />
    </>
  );
};

export default asset;
