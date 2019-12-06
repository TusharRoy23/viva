export const NOTE_LIST = 'NOTE_LIST';

export default {
    [NOTE_LIST](state, note) {
        state.noteList = note;
    }
};