import { AppShell, } from '@mantine/core';
import { ReactNode, useState } from 'react';
import { CustomHeader, CustomNavbar } from '../../features';


const AppLayout = (props: { children: ReactNode }) => {
    const [opened, setOpened] = useState(false);
    const noNav = window.location.pathname === '/dashboard' ? false : true;
    return (
        <AppShell
            padding="md"
            navbar={noNav ? <></> : <CustomNavbar opened={opened} />
            }
            header={<CustomHeader opened={opened} setOpened={setOpened} />}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            {props.children}
        </AppShell>
    )
}

export default AppLayout;