import React from "react";
import { Task } from '../Task';
import { Droppable } from "react-beautiful-dnd";
import { Box, Container, Paper, Title, useMantineTheme } from "@mantine/core";


export default function Column({ column, columnId, index }) {
    const theme = useMantineTheme();
    return (
        <Paper
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
            key={columnId}
        >
            <Title size='h2'>{column.name}</Title>
            <Paper style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                        return (
                            <Box
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    background: snapshot.isDraggingOver
                                        ? theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[2] : theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0]
                                    ,
                                    padding: 4,
                                    width: 300,
                                    minHeight: 500
                                }}
                            >
                                {column.items.map((item, index) => {
                                    return (
                                        <>
                                            <Task item={item} index={index} />
                                        </>
                                    )
                                })}
                                {provided.placeholder}
                            </Box>
                        );
                    }}
                </Droppable>
            </Paper>
        </Paper>
    );
}