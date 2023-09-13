
import { useState, useEffect } from 'react';
import { client } from '../../api/axios';
import { Box, Card, Container, Paper, Skeleton, Title, useMantineTheme } from '@mantine/core';
import { Navigate, useParams } from 'react-router-dom';
import useUser from '../../store/userStore';
import { notifications } from '@mantine/notifications';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Column, Task } from './components';
import { v4 as uuid } from 'uuid';

const itemsFromBackend = [
    { id: uuid(), content: "First task", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { id: uuid(), content: "Second task", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { id: uuid(), content: "Third task", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { id: uuid(), content: "Fourth task", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { id: uuid(), content: "Fifth task", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },

];

const columnsFromBackend = {
    'deafdsafa': {
        name: "Backlog",
        items: itemsFromBackend
    },
    [uuid()]: {
        name: "To do",
        items: []
    },
    [uuid()]: {
        name: "In Progress",
        items: []
    },
    [uuid()]: {
        name: "Done",
        items: []
    }
};

const Board = () => {
    const [board, setBoard] = useState();
    const [loading, setLoading] = useState(true);
    const theme = useMantineTheme()
    const { token } = useUser();
    const [columns, setColumns] = useState(columnsFromBackend);
    const { boardId } = useParams();
    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        console.log(result);
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };


    const getBoard = async () => {
        try {
            const res = await client.get(`boards/${boardId}`, { headers: { 'Authorization': `Bearer ${token}` } });
            setBoard(res.data);
            setLoading(false);
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
            } else if (error?.response.status === 404) {
                notifications.show(
                    {
                        title: 'Not found!',
                        message: 'Board does not exist!',
                        color: 'red',
                        radius: 'md',
                    }
                )
            }
        }
    }
    useEffect(() => {
        getBoard()
    }, [])
    if (!token) {
        return <Navigate to='/login' replace />
    }
    return (
        <>
            <Skeleton visible={loading}>
                <p>{JSON.stringify(board)}</p>
            </Skeleton>
            <Box style={{ display: "flex", justifyContent: "center", }}>
                <DragDropContext
                    onDragEnd={result => onDragEnd(result, columns, setColumns)}
                >
                    {Object.entries(columns).map(([columnId, column], index) => {
                        return (
                            <Column column={column} columnId={columnId} index={index} />
                        );
                    })}
                </DragDropContext>
            </Box>
        </>

    )
}

export default Board;