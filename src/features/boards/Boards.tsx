import { Key, ReactNode, ReactPortal, useEffect, useState } from "react";
import useUser from "../../store/userStore";
import { client } from "../../api/axios";
import { Anchor } from "@mantine/core";
import { Navigate } from "react-router-dom";
import { notifications } from '@mantine/notifications';

interface Boards {
    id: number;
    title: string;
}[]

const Boards = () => {
    const [boards, setBoards] = useState<Boards>();
    const { id, token } = useUser();

    const getBoardsTest = async () => {
        try {
            const res = await client.get(`/users/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
            console.log(res.data);
            setBoards(res.data.boards);
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
            <h3>Boards</h3>
            <ul>
                {boards && boards.map((board: { id: Key | null | undefined; title: string | number | boolean | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {
                    return (
                        <Anchor href={`/boards/${board.id}`} ><li key={board.id}>{board.title}</li></Anchor>
                    )
                })}
            </ul>

        </>
    )
}


export default Boards;