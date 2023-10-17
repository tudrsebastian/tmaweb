/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, SetStateAction } from 'react';
import { client } from '../../api/axios';
import { Box, Button, Card, Container, Flex, Modal, Paper, Skeleton, Title, useMantineTheme } from '@mantine/core';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useUser from '../../store/userStore';
import { notifications } from '@mantine/notifications';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Column } from './components';
import { setId, updateColumn, updatePosition } from '../../helpers/updateTicket';
import { v4 as uuid } from 'uuid';
import { useDisclosure } from '@mantine/hooks';
import { TicketModal } from './components';
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

//TODO: Fix this function to update the whole array of items
// const updateTasks = async function (column, index, token) {
//     for (const task of column.items) {
//         const newPosition = column.items.indexOf(task);
//         if (newPosition !== index) {
//             try {
//                 const res = await client.patch(`tickets/${task.id}`, { position: newPosition }, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 console.log(`Task ${task.id} updated. Response:`, res);
//             } catch (error) {
//                 console.error(`Error updating task ${task.id}:`, error);
//             }
//             // Introduce a delay between requests (e.g., 200ms)
//             await delay(200);
//         }
//     }
// }

const Board = () => {
    const [board, setBoard] = useState();
    const [loading, setLoading] = useState(true);
    const [columnNames, setColumnNames] = useState();
    const navigate = useNavigate();
    const theme = useMantineTheme()
    const { token } = useUser();
    const [columns, setColumns] = useState(columnsFromBackend);
    const { boardId } = useParams();

    const onDragEnd = (result: { destination: any; source?: any; }, columns: { id: any; name: string; items: { id: any; content: string; }[]; }[], setColumns: { (value: SetStateAction<{ id: any; name: string; items: { id: any; content: string; }[]; }[]>): void; (arg0: any): void; }) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;

        if (source.droppableId !== destination.droppableId) {
            console.log('This executed', result.draggableId)
            updateColumn(result.draggableId, setId(destination.droppableId, columns), token)
            updatePosition(result.draggableId, destination.index, token)
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
            // updateTasks(sourceColumn, source.index, token)
            // updateTasks(destColumn, destination.index, token)
        } else {
            console.log('This executed aswell')
            updatePosition(result.draggableId, destination.index, token)
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
            // updateTasks(column, destination.index, token)
        }
    };
    // const columnNames = getNames(columns);
    const getBoard = async () => {
        try {
            const res = await client.get(`boards/${boardId}`, { headers: { 'Authorization': `Bearer ${token}` } });
            setBoard(res.data);
            const newColumns = res.data.columns.map(col => ({
                id: col.id,
                name: col.name,
                items: col.Ticket || [],
            }))
            const columnName = res.data.columns.map(col => col.name);
            setColumnNames(columnName)
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
                <TicketModal columnNames={columnNames} columns={columns} />
                <Paper sx={{ boxShadow: theme.colorScheme === 'dark' ? '5px 5px 15px 5px #1C7ED6' : '5px 5px 15px 5px #91A7FF' }} shadow="lg" radius="lg" withBorder p="xl">
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

                </Paper>
            </Skeleton >

        </>

    )
}

export default Board;