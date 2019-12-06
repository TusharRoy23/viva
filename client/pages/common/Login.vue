<template>
    <div class="wrapper">
        <div class="container">
            <div class="row">
                <div class="col s6">
                    <div class="row">
                        <form @submit="getLogin" data-vv-scope="formLogin">
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
                            <div class="input-field col s12" v-if="message.loginErr" style="color:#ff7979">
                                <p>{{message.loginErr}}</p>
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
                        <form @submit="getRegister" data-vv-scope="formRegister">
                            <h3>Register</h3>
                            <div class="input-field col s12">
                                <!-- <input id="first_name" type="text" class="validate" v-model="register.username"> -->
                                <text-input 
                                    type="text"
                                    :value="register.username"
                                    name="UserName"
                                    v-model="register.username"
                                    v-validate="'required'"
                                    placeholder="Enter your Username"
                                    :error="errors.first('UserName')"
                                />
                            </div>
                            <div class="input-field col s12">
                                <text-input 
                                    type="password"
                                    :value="register.password"
                                    name="UserPassword"
                                    v-model="register.password"
                                    v-validate="'required'"
                                    placeholder="Enter your Password"
                                    :error="errors.first('UserPassword')"
                                />
                            </div>
                            <div class="input-field col s12" v-if="message.registerErr" style="color:#ff7979">
                                <p>{{message.registerErr}}</p>
                            </div>
                            <div class="input-field col s12" v-if="message.registerSuccess" style="color:rgb(33, 177, 7)">
                                <p>{{message.registerSuccess}}</p>
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
            },
            message: {
                loginErr: '',
                registerErr: '',
                registerSuccess: ''
            }
        }
    },
    methods: {
        getLogin (e) {
            e.preventDefault();
            this.$validator.validateAll('formLogin').then(isValid => {
                if (!isValid) {
                    return
                }
                
                this.$store.dispatch(POST_LOGIN, this.model)
                .then((response) => {
                    if (response.data.status) {
                        localStorage.setItem('auth', JSON.stringify(response.data.auth));
                        this.$router.push('/Dashboard');
                    }
                    else{
                        this.msg.loginErr = response.data.msg;
                    }
                })
                .catch(error => {
                    Object.keys(error.response.data).forEach(field => {
                        this.errors.add({
                            field,
                            msg: error.response.data[field]
                        });
                    });
                })
            })
        },
        getRegister (e) {
            e.preventDefault();
            this.$validator.validateAll('formRegister').then(isValid => {
                if (!isValid) {
                    return
                }

                this.$store.dispatch(POST_REGISTER, this.register)
                .then((response) => {
                        if (response.data.status) {
                            this.message.registerErr = '';
                            this.message.registerSuccess = response.data.msg;
                        }
                        else{
                            this.message.registerSuccess = '';
                            this.message.registerErr = response.data.msg;
                        }
                })
                .catch(error => {
                        Object.keys(error.response.data).forEach(field => {
                            this.errors.add({
                                field,
                                msg: error.response.data[field]
                            });
                        });
                })
            })
        }
    },
}
</script>