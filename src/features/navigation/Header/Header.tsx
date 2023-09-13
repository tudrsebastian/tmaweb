/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header, Flex, Anchor, Burger, MediaQuery, useMantineTheme, Title, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Home, Login, Sun, Moon } from 'tabler-icons-react';
import useUser from '../../../store/userStore';
const links = [
    {
        path: '/',
        name: 'Home',
        icon: <Home
            size={25}
            strokeWidth={1}
            color={'#4080bf'}
        />
    },
    {
        path: '/login',
        name: 'Login',
        icon: <Login
            size={25}
            strokeWidth={1}
            color={'#4080bf'}
        />
    }
]
interface CustomHeaderProps {
    opened: boolean;
    setOpened: (opened: boolean) => void;
}
const CustomHeader = (props: CustomHeaderProps) => {
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    const { id } = useUser();
    const isNavVisible = id === null ? true : false;

    return (
        <Header height={60} p="xs">

            <Flex gap="md"
                justify={isNavVisible ? 'flex-end' : 'center'}
                align="center"
                direction="row"
                wrap="wrap">

                {id === null ?
                    <>
                        {links.map(link =>
                            <Flex
                                gap={2}
                                direction="row"><span>{link.icon}</span>
                                <Anchor href={link.path}>{link.name}</Anchor>
                            </Flex>
                        )}
                    </>
                    :
                    <>
                        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                            <Burger
                                opened={props.opened}
                                onClick={() => props.setOpened((opened: boolean) => !opened)}
                                size="sm"
                                color={theme.colors.gray[6]}

                            />
                        </MediaQuery>
                        <MediaQuery smallerThan='md' styles={{ fontSize: '1.3rem' }}>
                            <Title align='center' >Task Manager App</Title>
                        </MediaQuery>

                    </>
                }
                <ActionIcon
                    color={dark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme"
                >
                    {dark ? <Sun
                        size={25}
                        strokeWidth={2}
                        color={'#bfba40'}
                    /> : <Moon
                        size={25}
                        strokeWidth={2}
                        color={'#19394d'}
                    />}
                </ActionIcon>
            </Flex>
        </Header>
    )
}
export default CustomHeader;