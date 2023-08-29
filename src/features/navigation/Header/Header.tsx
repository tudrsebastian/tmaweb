import { Header, Flex, Anchor, Burger, MediaQuery, useMantineTheme, Title } from '@mantine/core';
import { Home, Login, Logout } from 'tabler-icons-react';
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
    const isNavVisible = window.location.pathname === '/dashboard' ? false : true;
    const [name, setName] = useUser(
        (state) => [state.name, state.setName],
    )
    const [email, setEmail] = useUser(
        (state) => [state.email, state.setEmail],
    )
    const [token, setToken] = useUser(
        (state) => [state.token, state.setToken]
    )

    return (
        <Header height={60} p="xs">

            <Flex gap="md"
                justify={isNavVisible ? 'flex-end' : 'center'}
                align="center"
                direction="row"
                wrap="wrap">

                {name !== '' && email !== '' ?
                    <>
                        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                            <Burger
                                opened={props.opened}
                                onClick={() => props.setOpened((o: boolean) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}

                            />
                        </MediaQuery>
                        <MediaQuery smallerThan='md' styles={{ fontSize: '1.3rem' }}>
                            <Title align='center' >Task Manager App</Title>
                        </MediaQuery>
                    </> : <>
                        {links.map(link =>
                            <Flex
                                gap={2}
                                direction="row"><span>{link.icon}</span>
                                <Anchor href={link.path}>{link.name}</Anchor>
                            </Flex>
                        )}
                    </>
                }

            </Flex>
        </Header>
    )
}
export default CustomHeader;