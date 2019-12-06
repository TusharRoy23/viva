<template>
    <div class="row">
        <div class="col s12">
            <div class="row">
                <div class="input-field col s12">
                    <a class="waves-effect waves-light btn" @click="logout" style="cursor:pointer">Logout</a>
                </div>
                <form @submit="submitTodo">
                    <h3>Note Down</h3>
                    <div class="input-field col s12">
                        <textarea class="materialize-textarea" placeholder="Type Here ..." v-model="note"></textarea>
                    </div>
                    <div class="input-field col s12">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="col s12">
            <div class="col s12 m12 animated fadeIn" v-for="note in noteList" :key="note.noteID">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                        <p>{{note.note}}</p>
                    </div>
                    <div class="card-action">
                        <a @click="deleteTodo(note.noteID)" style="cursor:pointer">Delete</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { POST_NOTE, UPDATE_NOTE, DELETE_NOTE } from '@store/note/actions'
export default {
    name:'Dashboard',
    data() {
        return {
            note:''
        }
    },
    methods: {
        submitTodo(e) {
            e.preventDefault();
            var userID = JSON.parse(localStorage.getItem('auth')).userID;
            if (userID) {
                if (this.note) {
                    
                    this.$store.dispatch(POST_NOTE, {note: this.note, userID:userID})
                    .then((response) => {
                        if (response.data) {
                            console.log(response.data);
                            this.getNoteList();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
                }
            }
        },
        deleteTodo (noteID) {
            if (noteID) {
                var userID = JSON.parse(localStorage.getItem('auth')).userID;

                this.$store.dispatch(DELETE_NOTE, {userID, noteID})
                .then((response) => {
                    this.getNoteList();
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        logout() {
            localStorage.removeItem('auth');
            this.$router.push('/');
        }
    },
    mounted() {
        this.getNoteList();
    },
}
</script>