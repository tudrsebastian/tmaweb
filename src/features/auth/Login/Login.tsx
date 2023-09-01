/* eslint-disable @typescript-eslint/no-unused-vars */
import { TextInput, Button, Group, Box, Paper, Container, Text, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import useUser from '../../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useUser(
        (state) => [state.name, state.setName],
    )
    const [email, setEmail] = useUser(
        (state) => [state.email, state.setEmail],
    )
    const [token, setToken] = useUser(
        (state) => [state.token, state.setToken]
    )

    const login = async (values: { email: string; password: string; }) => {
        try {
            const res = await axios.post('http://localhost:3000/auth/login', values)
            console.log(res.data);
            if (res.status === 201) {
                navigate('/dashboard')
            }
            setEmail(res.data.email)
            setName(res.data.name)
            setToken(res.data.accessToken)
        } catch (error) {
            if (error?.response.status === 404) {
                notifications.show(
                    {
                        title: 'Not found',
                        message: 'User does not exist!Try again or create an account!',
                        color: 'red',
                        radius: 'md',
                    }
                )
            } else if (error?.response.status === 401) {
                notifications.show(
                    {
                        title: 'Unauthorized!',
                        message: 'Invalid credentials!Try again!',
                        color: 'red',
                        radius: 'md',
                    }
                )
            }
        }
    }
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => value.length < 8 ? 'Password must be at least 8 characters' : null
        },
    });

    return (
        <Container maw={500}>
            <Paper shadow="lg" radius="md" p="md">
                <Text variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} align='center' fw={500}>Login</Text>
                <Box maw={300} mx="auto">
                    <form onSubmit={form.onSubmit((values) => login(values))}>
                        <TextInput
                            withAsterisk
                            required
                            label="Email"
                            placeholder="your@email.com"
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            required
                            type='password'
                            withAsterisk
                            label="Password"
                            placeholder="password"
                            {...form.getInputProps('password')}
                        />
                        <Group position="center" mt="md">
                            <Text fz='md' fw={300} color='dimmed'>Don't have an account? <Anchor href='/register'>Register</Anchor></Text>
                            <Button type="submit">Login</Button>
                        </Group>
                    </form>

                </Box>
            </Paper>
        </Container>
    );
}

export default Login;