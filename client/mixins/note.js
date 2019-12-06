import { NOTE_LIST } from '@store/note/mutations';
import { GET_NOTE_LIST } from '@store/note/actions';

export default {
    computed: {
        noteList () {
            return this.$store.state.note.noteList;
        }
    },
    methods: {
        getNoteList () {
            var userID = JSON.parse(localStorage.getItem('auth')).userID;
            this.$store.dispatch(GET_NOTE_LIST, {userID})
            .then((response) => {
                this.$store.commit(NOTE_LIST, response.data.msg);
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
};