// MantineGlobalProvider.tsx
import React, { ReactNode } from 'react';
// import { useState } from 'react';
import {
    MantineProvider,
    ColorSchemeProvider,
    ColorScheme,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import useMantineColorScheme from '../../store/themeStore'; // Import the Zustand store

const MantineGlobalProvider = (props: { children: ReactNode }) => {
    const [colorScheme, setColorScheme] = useMantineColorScheme((state) => [
        state.colorScheme,
        state.setColorScheme,
    ]);

    const toggleColorScheme = (value?: ColorScheme) => {
        const newScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        setColorScheme(newScheme); // Update the Zustand store when the color scheme changes
    };

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                <Notifications />
                {props.children}
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

export default MantineGlobalProvider;
