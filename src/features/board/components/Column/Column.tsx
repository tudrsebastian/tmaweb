import React from "react";
import { Task } from '../Task';
import { Droppable } from "react-beautiful-dnd";
import { Box, Badge, Paper, Text, useMantineTheme, Flex } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks'

export default function Column({ column, columnId, index }) {
    const theme = useMantineTheme();
    const mobile = useMediaQuery('(max-width: 36em)');
    const tablet = useMediaQuery('(max-width: 62em)');
    const laptop = useMediaQuery('(max-width: 75em)');
    const desktop = useMediaQuery('(max-width: 88em)');
    const desktopWide = useMediaQuery('(min-width: 160em)');
    const badgeColor = column.name === 'Backlog' ? 'gray' : column.name === 'Todo' ? 'red' : column.name === 'In Progress' ? 'cyan' : column.name === 'Done' ? 'teal' : '';
    return (
        <Flex
            // mih={50}

            gap="xs"
            justify="flex-start"
            align="center"
            direction="column"
            wrap="wrap"
            key={columnId}
        >
            {/* <Paper my='xs' shadow="xs" radius="sm" p='4px' withBorder> */}
            <Badge color={badgeColor} size={mobile ? 'xs' : 'md'} >
                <Text fz={mobile ? 5 : 10}>{column.name}</Text>
            </Badge>
            {/* </Paper> */}
            <Paper my='md'  >
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
                                    padding: 5,
                                    width: mobile ? 60 : tablet ? 150 : laptop ? 250 : desktop ? 250 : desktopWide ? 500 : 300,
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
        </Flex>
    );
}
