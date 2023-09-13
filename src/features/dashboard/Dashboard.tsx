/* eslint-disable react-hooks/exhaustive-deps */
import { Text } from "@mantine/core"
import useUser from "../../store/userStore";
import { Navigate } from "react-router-dom";


const Dashboard = () => {
    const { id } = useUser();

    if (!id) {
        return <Navigate to='/login' replace />
    }
    return <Text>Dashboard</Text>
}

export default Dashboard;