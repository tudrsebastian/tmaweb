/* eslint-disable react-hooks/exhaustive-deps */
import { Anchor, Text } from "@mantine/core"
import useUser from "../../store/userStore";
import { Navigate, useNavigate } from "react-router-dom";
import { Key, ReactNode, ReactPortal, useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { client } from "../../api/axios";
interface Boards {
    id: number;
    title: string;
}[]


const Dashboard = () => {
    const [boards, setBoards] = useState<Boards>();
    const [createdBoards, setCreatedBoards] = useState<Boards>();
    const { id, token } = useUser();
    const navigate = useNavigate();
    const getBoardsTest = async () => {
        try {
            const res = await client.get(`/users/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
            console.log(res.data);
            setBoards(res.data.boards);
            setCreatedBoards(res.data.Boards);
        } catch (error) {
            if (error?.response.status === 403) {
                notifications.show(
                    {
                        title: 'No Access',
                        message: 'You do not have access to this board!',
                        color: 'red',
                        radius: 'md',
                    }
                )
            } else if (error?.response.status === 401) {
                notifications.show(
                    {
                        title: 'Unauthorized!',
                        message: 'Invalid credentials!',
                        color: 'red',
                        radius: 'md',
                    }
                )
                navigate('/login')
            }
        }
    }
    useEffect(() => {
        getBoardsTest()
    }, []);
    if (!token) {
        return <Navigate to='/login' replace />
    }
    return (
        <>
            <h3>Projects</h3>
            <ul>
                {boards && boards.map((board: { id: Key | null | undefined; title: string | number | boolean | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {
                    return (
                        <Anchor href={`/dashboard/${board.id}`} ><li key={board.id}>{board.title}</li></Anchor>
                    )
                })}
            </ul>
            <ul>
                {createdBoards && createdBoards.map((board: { id: Key | null | undefined; title: string | number | boolean | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {
                    return (
                        <Anchor href={`/dashboard/${board.id}`} ><li key={board.id}>{board.title}</li></Anchor>
                    )
                })}
            </ul>

        </>
    )
}

export default Dashboard;