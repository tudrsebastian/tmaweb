/* eslint-disable react-hooks/exhaustive-deps */
import { Text } from "@mantine/core"
import useUser from "../../store/userStore";
import { Navigate } from "react-router-dom";
import { client } from "../../api/axios";
import { useEffect } from "react";
const Dashboard = () => {
    const { email, token } = useUser();
    const getBoardsTest = async () => {
        try {
            const res = await client.get('/boards/2', { headers: { 'Authorization': `Bearer ${token}` } })
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getBoardsTest()
    }, []);
    if (!email) {
        return <Navigate to='/login' replace />
    }
    return <Text>Dashboard</Text>
}

export default Dashboard;