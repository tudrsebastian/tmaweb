import { AppShell, } from '@mantine/core';
import { ReactNode, useState } from 'react';
import { CustomHeader, CustomNavbar } from '../../features';
import useUser from '../../store/userStore';


const AppLayout = (props: { children: ReactNode }) => {
    const [opened, setOpened] = useState(false);
    const { id } = useUser();
    console.log(window.location.pathname)
    const noNav = id === null || window.location.pathname === '/' ? true : false;
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