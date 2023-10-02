/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, SetStateAction } from 'react';
import { client } from '../../api/axios';
import { Box, Card, Container, Flex, Paper, Skeleton, Title, useMantineTheme } from '@mantine/core';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useUser from '../../store/userStore';
import { notifications } from '@mantine/notifications';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Column } from './components';
import { v4 as uuid } from 'uuid';

const itemsFromBackend = [
    { id: uuid(), content: "First task" },
    { id: uuid(), content: "Second task", },
    { id: uuid(), content: "Third task", },
    { id: uuid(), content: "Fourth task", },
    { id: uuid(), content: "Fifth task", },

];

const columnsFromBackend = [
    {
        id: uuid(),
        name: 'Backlog',
        items: itemsFromBackend,
    },
    {
        id: uuid(),
        name: 'To do',
        items: [],
    },
    {
        id: uuid(),
        name: 'In Progress',
        items: [],
    },
    {
        id: uuid(),
        name: 'Done',
        items: [],
    },
];
function setId(destination, column) {
    let id;
    if (destination === '0') {
        id = column[0].id;
    } else if (destination === '1') {
        id = column[1].id;
    } else if (destination === '2') {
        id = column[2].id
    } else if (destination === '3') {
        id = column[3].id
    } else {
        return;
    }
    return id;
}
const Board = () => {
    const [board, setBoard] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const theme = useMantineTheme()
    const { token } = useUser();
    const [columns, setColumns] = useState(columnsFromBackend);
    const { boardId } = useParams();
    console.log(columns);

    const onDragEnd = (result: { destination: any; source?: any; }, columns: { id: any; name: string; items: { id: any; content: string; }[]; }[], setColumns: { (value: SetStateAction<{ id: any; name: string; items: { id: any; content: string; }[]; }[]>): void; (arg0: any): void; }) => {
        if (!result.destination) return;
        console.log(columns);
        const { source, destination } = result;
        console.log(result);
        console.log(destination);
        console.log(setId(destination.droppableId, columns))
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
    // console.log(columns)

    const getBoard = async () => {
        try {
            const res = await client.get(`boards/${boardId}`, { headers: { 'Authorization': `Bearer ${token}` } });
            setBoard(res.data);
            console.log(res.data.columns);
            const newColumns = res.data.columns.map(col => ({
                id: col.id,
                name: col.name,
                items: col.Ticket || [],
            }))
            console.log(newColumns);
            setColumns(newColumns);

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
        } finally {
            setLoading(false);
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
                <Title align='center' my='xs' size='h2'>{board ? board.title : 'Not found'}</Title>
                <Paper sx={{ boxShadow: theme.colorScheme === 'dark' ? '5px 5px 15px 5px #1C7ED6' : '5px 5px 15px 5px #91A7FF' }} shadow="lg" radius="lg" withBorder p="xl">
                    <Container fluid>
                        <Flex
                            mih={50}
                            gap='xs'
                            justify="center"
                            align="flex-start"
                            direction="row"
                        // wrap="wrap"
                        >

                            <DragDropContext
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
                            >
                                {Object.entries(columns).map(([columnId, column], index) => {
                                    return (
                                        <Skeleton visible={loading}>
                                            <Column column={column} columnId={columnId} index={index} />
                                        </Skeleton>
                                    );
                                })}
                            </DragDropContext>
                        </Flex>
                    </Container>
                </Paper>
            </Skeleton >

        </>

    )
}

export default Board;