import { Divider, Navbar, Title, Text, Group, Anchor, Flex } from "@mantine/core"
import { Logout } from "tabler-icons-react"
import useUser from "../../../store/userStore";

interface CustomNavbarProps {
    opened: boolean;
}
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

    const logout = () => {
        setEmail('');
        setName('');
        setToken('');
    }
    return (
        <Navbar hidden={!props.opened} width={{ sm: 200, lg: 300 }} height='full' p="xs">
            <Navbar.Section>
                <Title size='h3' >Dashboard</Title>
            </Navbar.Section>
            <Divider size="sm" color='blue' />
            <Navbar.Section grow mt="md">
                <Text>Link</Text>
                <Text>Link</Text>
                <Text>Link</Text>
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