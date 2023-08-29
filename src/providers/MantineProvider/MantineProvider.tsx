import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import { ReactNode } from "react";


const MantineGlobalProvider = (props: { children: ReactNode }) => {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Notifications />
            {props.children}
        </MantineProvider>
    )
}

export default MantineGlobalProvider;