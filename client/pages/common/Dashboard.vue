<template>
    <div class="wrapper">
        <div class="container">
            <div class="row">
                <div class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <button class="waves-effect waves-light btn" @click="logout" style="cursor:pointer">Logout</button>
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
                                <span class="card-title">{{note.postDate | dateFormat }}</span>
                                <span :id="'name-'+note.noteID">
                                    {{note.note}}
                                </span>
                                <span :id="'inputF-'+note.noteID" style="display:none">
                                    <textarea class="materialize-textarea" placeholder="Type Here ..." :id="'ref-'+note.noteID" :value="note.note"></textarea>
                                    <p :id="'msg-'+note.noteID" style="display: none; color: #ff7979">
                                        Value Required !
                                    </p>
                                </span>
                            </div>
                            <div class="card-action">
                                <button class="btn waves-effect waves-light" @click="edit(note.noteID)" :id="'edit-'+note.noteID">Edit</button>
                                <button style="display:none" class="btn waves-effect waves-light" @click="save(note.noteID)" :id="'save-'+note.noteID">Update</button>
                                <button style="display:none" class="btn waves-effect waves-light" @click="editClose(note.noteID)" :id="'close-'+note.noteID">Close</button>
                                <button @click="deleteTodo(note.noteID)" style="cursor:pointer" class="btn">Delete</button>
                            </div>
                        </div>
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
                            this.note = '';
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
        edit(id) {
            this.$nextTick(function() {
                document.getElementById('name-'+id).style.display = document.getElementById('edit-'+id).style.display ="none";
                document.getElementById('inputF-'+id).style.display = document.getElementById('close-'+id).style.display = document.getElementById('save-'+id).style.display = "inline";
                document.getElementById('ref-'+id).focus();
            }.bind(this))
        },
        editClose (id){
            this.$nextTick(function() {
                document.getElementById('close-'+id).style.display = document.getElementById('save-'+id).style.display = document.getElementById('inputF-'+id).style.display = "none";
                document.getElementById('name-'+id).style.display = document.getElementById('edit-'+id).style.display = "inline";
            }.bind(this));
        },
        save (noteID) {
            var note = document.getElementById('ref-'+noteID).value;
            if (note) {
                var userID = JSON.parse(localStorage.getItem('auth')).userID;
                this.$store.dispatch(UPDATE_NOTE, {note, noteID, userID})
                .then((response) => {
                    if (response.data) {
                        this.getNoteList();
                        this.editClose(noteID);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
            else{
                document.getElementById('msg-'+noteID).style.display = "inline";
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
    created() {
        this.checkAuthUser();
    },
}
</script>