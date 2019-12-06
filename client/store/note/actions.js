import client from '@client/utils/axios';

export const POST_NOTE = 'POST_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const GET_NOTE_LIST = 'GET_NOTE_LIST';

export default {
    [POST_NOTE]: (context, data) => client.post('note/submitNotes', data),
    [UPDATE_NOTE]: (context, data) => client.post('note/updateNotes', data),
    [DELETE_NOTE]: (context, data) => client.post('note/deleteNotes', data),
    [GET_NOTE_LIST]: (context, data) => client.post('note/getNoteList', data)
};