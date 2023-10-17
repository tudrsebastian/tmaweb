
import { Button, Modal, TextInput, Textarea, NativeSelect } from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../../../api/axios";
import useUser from "../../../../store/userStore";
import { notifications } from "@mantine/notifications";
interface TicketProps {
    columnNames: string[],
    columns: {
        id: string;
        name: string;
        items: { id: string; name: string; description: string }[]
    }[],
}


const TicketModal = (props: TicketProps) => {
    const [opened, { open, close }] = useDisclosure(false)
    const [columnInput, setColumnInput] = useState<string | undefined>('')
    const [ticketTitle, setTicketTitle] = useState('');
    const { token } = useUser();
    const [ticketDescription, setTicketDescription] = useState('');
    const { boardId } = useParams();
    const matchesSmall = useMediaQuery('(max-width: 840px)')
    // const columnId = props.columns.find(column => column.name === columnInput)
    // console.log(typeof columnId?.id, ticketDescription, ticketTitle)

    async function createTicket() {
        const column = Object.entries(props.columns);
        const foundColumn = column.find(([key, value]) => value.name === columnInput)

        try {
            const res = await client.post('/tickets', {
                title: ticketTitle,
                description: ticketDescription,
                boardID: Number(boardId),
                columnID: foundColumn?.[1].id,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            console.log(res)
            if (res.status === 201) {
                notifications.show(
                    {
                        title: 'Task Successfully Created',
                        message: 'Start Coding 💪🏻!',
                        color: 'teal',
                        radius: 'md',
                    }
                )
            }
        } catch (error) {
            console.log(error);
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

            } else if (error?.response.status === 400) {
                notifications.show(
                    {
                        title: error?.response.data.error,
                        message: error?.response.data.message[0],
                        color: 'red',
                        radius: 'md',
                    }
                )
            }
        } finally {
            close();
        }
    }
    return (
        <>
            <Modal fullScreen={matchesSmall} opened={opened} onClose={close} title="Add New Ticket" centered>
                {/* Modal content */}
                <TextInput
                    value={ticketTitle}
                    onChange={(e) => {
                        e.preventDefault();
                        setTicketTitle(e.target.value);
                    }}
                    variant="filled"
                    radius="md" label='Ticket Title' withAsterisk />
                <Textarea
                    value={ticketDescription}
                    onChange={(e) => {

                        e.preventDefault()

                        setTicketDescription(e.target.value)
                    }
                    }
                    variant="filled"
                    radius="md"
                    label="Ticket Description"
                    withAsterisk
                    description="Input description"
                    // error="Max 255 chars"
                    placeholder="Input placeholder"
                />
                <NativeSelect value={columnInput} onChange={(e) => {
                    e.preventDefault();

                    setColumnInput(e.target.value)
                }
                } variant="filled" radius="md" label="Column" withAsterisk description="Input description" data={props.columnNames} />
                <Button onClick={createTicket} variant="light" color="teal" size="xs" radius="lg" my={12} >Create</Button>
            </Modal>
            <Button variant="light" color="teal" size="xs" radius="lg" onClick={open} my={12} >Add ticket</Button>
        </>
    )
}

export default TicketModal;