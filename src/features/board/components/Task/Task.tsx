import { Card, Container, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { Draggable } from "react-beautiful-dnd";



export default function Task({ item, index }) {
    const theme = useMantineTheme();
    return (
        <Draggable
            key={item.id}
            draggableId={item.id}
            index={index}
        >
            {(provided, snapshot) => {
                return (
                    <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            userSelect: "none",
                            padding: 20,
                            margin: "0 0 8px 0",
                            minHeight: "100px",
                            backgroundColor: snapshot.isDragging
                                ? theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[6]
                                : theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[3],
                            color: "white",
                            ...provided.draggableProps.style
                        }}
                    >
                        <Card.Section>
                            <Text color={theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[9]}>{item.title}</Text>
                        </Card.Section>
                    </Card>
                );
            }}
        </Draggable>
    );
}