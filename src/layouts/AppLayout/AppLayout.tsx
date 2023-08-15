import { AppShell, Navbar, Header } from '@mantine/core';
import { ReactNode } from 'react';


const AppLayout = (props: { children: ReactNode }) => {
    return (
        <AppShell
            padding="md"
            navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{/* Navbar content */}</Navbar>}
            header={<Header height={60} p="xs">Routes will be here</Header>}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            {props.children}
        </AppShell>
    )
}

export default AppLayout;