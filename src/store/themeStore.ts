// MantineColorScheme.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ColorScheme } from '@mantine/core';

type TMantineColorScheme = {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
};

const useMantineColorScheme = create<TMantineColorScheme>()(
  persist((set) => ({
    colorScheme: 'light', // Set the default color scheme here
    setColorScheme: (scheme: ColorScheme) => set({ colorScheme: scheme }),
  }), {
    name: 'mantineColorScheme', // You can choose a name for the persisted store
  })
);

export default useMantineColorScheme;
