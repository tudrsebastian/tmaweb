import { TextInput, Button, Group, Box, Paper, Container, Text, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },

        validate: {
            name: (value) => value.length < 3 ? 'Name must be at least 3 characters' : null,
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => value.length < 8 ? 'Password must be at least 8 characters' : null
        },
    });
    const register = async (values: { name: string; email: string; password: string; }) => {
        try {
            const res = await axios.post('http://localhost:3000/users', values)
            console.log(res.status);
            if (res.status === 201) {
                notifications.show({
                    title: 'Registration successful',
                    message: `Welcome ${values.name} You can login now!`,
                })
                setTimeout(() => { navigate('/login') }, 3000)
            }

        } catch (error) {
            if (error?.response?.data.statusCode === 409) {
                setError('An account with this email already exists')
                notifications.show({
                    title: 'Error creating new account',
                    message: `An account with this email already exists`,
                    radius: 'md',
                    color: 'red',
                })
            }
        }
    }
    return (
        <Container maw={500}>
            <Paper shadow="lg" radius="md" p="md">
                <Text variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} align='center' fw={500}>Register</Text>
                <Box maw={300} mx="auto">
                    <form onSubmit={form.onSubmit((values) => register(values))}>
                        <TextInput
                            withAsterisk
                            required
                            label="Name"
                            placeholder="Your Name"
                            {...form.getInputProps('name')}
                        />
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
                            <Text fz='md' fw={300} color='dimmed'>Already have an account? <Anchor href='/login'>Login</Anchor></Text>
                            <Button type="submit">Register</Button>
                        </Group>
                    </form>

                </Box>
            </Paper>
        </Container>
    )
}

export default Register;