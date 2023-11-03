import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';

const LoadFont = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadCustomFont = async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
        'Poppins-Medium': require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
      });
      setFontLoaded(true);
    };

    loadCustomFont();
  }, []);

  if (!fontLoaded) {
    return null; 
  }

  return children;
};

export default LoadFont;
