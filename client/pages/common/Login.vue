<template>
    <div class="row">
        <div class="col s4">
            <div class="row">
                <form @submit="getLogin">
                    <h3>Login</h3>
                    <div class="input-field col s12">
                        <text-input 
                            type="text"
                            :value="model.username"
                            name="username"
                            v-model="model.username"
                            v-validate="'required'"
                            placeholder="Enter your Username"
                            :error="errors.first('username')"
                        />
                    </div>
                    <div class="input-field col s12">
                        <text-input 
                            type="password"
                            :value="model.password"
                            name="password"
                            v-model="model.password"
                            v-validate="'required'"
                            placeholder="Enter your Password"
                            :error="errors.first('password')"
                        />
                    </div>
                    <div class="input-field col s12">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Login
                            <i class="fa fa-sign"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="col s6">
            <div class="row">
                <form @submit="getRegister">
                    <h3>Register</h3>
                    <div class="input-field col s12">
                        <input id="first_name" type="text" class="validate" v-model="register.username">
                        <label for="first_name">Username</label>
                    </div>
                    <div class="input-field col s12">
                        <input id="last_name" type="password" class="validate" v-model="register.password">
                        <label for="last_name">Password</label>
                    </div>
                    <div class="input-field col s12">
                        <button class="btn waves-effect waves-primary" type="submit" name="action">Register
                            <i class="fa fa-sign"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import formMixin from '@client/mixins/form';
import { POST_LOGIN, POST_REGISTER } from '@store/auth/actions'
export default {
    name: 'Login',
    mixins: [formMixin],
    data() {
        return {
            model: {
                username: '',
                password: ''
            },
            register: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        getLogin (e) {
            e.preventDefault();
            this.$validator.validate().then(isValid => {
                if (!isValid) {
                    return
                }
                
                this.$store.dispatch(POST_LOGIN, this.model)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.status) {
                        localStorage.setItem('auth', JSON.stringify(response.data.auth));
                        this.$router.push('/Dashboard');
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            })
        },
        getRegister (e) {
            e.preventDefault();
            
            this.$store.dispatch(POST_REGISTER, this.register)
                .then((response) => {
                    console.log('response: ', response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
}
</script>