import React from 'react';
import { Image, StyleSheet, ImageProps } from 'react-native';

interface AvatarProps extends ImageProps {
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ source, size = 40, style }) => {
  const styles = StyleSheet.create({
    avatar: {
      width: size,
      height: size,
      borderRadius: size / 2,
    },
  });

  return <Image source={source} style={[styles.avatar, style]} />;
};

export default Avatar;
