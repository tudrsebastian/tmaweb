import { client } from "../api/axios";
export const setId = function(destination, column) {
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
export const updatePosition = async function (id: string, index: number, token: string) {
    try {
        await client.patch(`tickets/${id}`, { position: index }, { headers: { 'Authorization': `Bearer ${token}` } })
    } catch (error) {
        console.log(error);
    }
}
export const updateColumn = async function (id: string, updateColId: string, token: string) {
    try {
        await client.patch(`tickets/${id}`, { columnID: updateColId }, { headers: { 'Authorization': `Bearer ${token}` } })
    } catch (error) {
        console.log(error);
    }
};