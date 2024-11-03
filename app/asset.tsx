import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useMedia } from '~/providers/MediaProvider';
import { Image } from 'expo-image';

const asset = () => {
  const { id } = useLocalSearchParams();
  const { getAssetById } = useMedia();

  const asset = getAssetById(id);
  if (!asset) {
    return <Text>asset not found</Text>;
  }
  return (
    <>
      <Image source={{ uri: asset.uri }} style={{ width: '100%', height: '100%' }} />
    </>
  );
};

export default asset;
