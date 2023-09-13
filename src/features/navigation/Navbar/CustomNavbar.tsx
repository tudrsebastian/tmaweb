/* eslint-disable @typescript-eslint/no-unused-vars */
import { Divider, Navbar, Title, Text, Group, Anchor, Flex } from "@mantine/core"
import { Logout } from "tabler-icons-react"
import useUser from "../../../store/userStore";
import { capitalizeFirstLetter } from "../../../helpers/capitalizeLetter";
import { Clipboard, Inbox, LayoutDashboard } from "tabler-icons-react";
interface CustomNavbarProps {
    opened: boolean;
}
const links = [
    {
        name: 'Inbox',
        path: '/inbox',
        icon: <Inbox
            size={22}
            strokeWidth={2}
            color={'#2d7986'}
        />
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: <LayoutDashboard
            size={22}
            strokeWidth={2}
            color={'#2d7986'}
        />
    },
    {
        name: 'Boards',
        path: '/boards',
        icon: <Clipboard
            size={22}
            strokeWidth={2}
            color={'#2d7986'}
        />
    }]
const CustomNavbar = (props: CustomNavbarProps) => {
    const [name, setName] = useUser(
        (state) => [state.name, state.setName],
    )
    const [email, setEmail] = useUser(
        (state) => [state.email, state.setEmail],
    )
    const [token, setToken] = useUser(
        (state) => [state.token, state.setToken]
    )
    const [id, setId] = useUser(
        (state) => [state.id, state.setId]
    )

    const logout = () => {
        setId(null);
        setEmail('');
        setName('');
        setToken('');
    }
    return (
        <Navbar hidden={!props.opened} width={{ sm: 200, lg: 300 }} height='full' p="xs">
            <Navbar.Section>
                <Title size='h3' >{capitalizeFirstLetter(window.location.pathname)}</Title>
            </Navbar.Section>
            <Divider size="sm" color='blue' />
            <Navbar.Section grow mt="md">
                {links.map(link =>
                    <Flex
                        gap={2}
                        direction="row"><span>{link.icon}</span>
                        <Anchor href={link.path}>{link.name}</Anchor>
                    </Flex>
                )}
            </Navbar.Section>
            <Divider size="sm" color='blue' />
            <Navbar.Section>
                <Text >{name}</Text>
                <Group>

                    <Text color='dimmed'>{email}</Text>
                    <Flex
                        gap={2}>
                        <Logout
                            size={24}
                            strokeWidth={1}
                            color={'#4080bf'}
                        /> <Anchor onClick={logout} component='button'>Logout</Anchor>
                    </Flex>
                </Group>
            </Navbar.Section>
        </Navbar>
    )
}

export default CustomNavbar;