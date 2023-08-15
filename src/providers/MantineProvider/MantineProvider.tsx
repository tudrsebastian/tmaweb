import { MantineProvider } from "@mantine/core";
import { ReactNode } from "react";


const MantineGlobalProvider = (props: { children: ReactNode }) => {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            {props.children}
        </MantineProvider>
    )
}

export default MantineGlobalProvider;