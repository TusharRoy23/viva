<template>
    <div class="wrapper">
        <div class="container">
            <div class="row">
                <div class="col s6">
                    <div class="row">
                        <form @submit.prevent="getLogin('getLogin')" data-vv-scope="getLogin">
                            <h3>Login</h3>
                            <div class="input-field col s12">
                                <input name="username" 
                                        v-validate="'required|min:3'" 
                                        class="form-control"
                                        type="text" 
                                        v-model="model.username"
                                        placeholder="Enter your Username"
                                >
                                <span v-show="errors.has('getLogin.username')" style="color:#ff7979">{{ errors.first('getLogin.username') }}</span>
                                
                            </div>
                            <div class="input-field col s12">
                                <input name="password" 
                                        v-validate="'required|min:6'" 
                                        class="form-control"
                                        type="password" 
                                        v-model="model.password"
                                        placeholder="Enter your Password"
                                >
                                <span v-show="errors.has('getLogin.password')" style="color:#ff7979">{{ errors.first('getLogin.password') }}</span>
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
                        <form @submit.prevent="getRegister('getRegister')" data-vv-scope="getRegister">
                            <h3>Register</h3>
                            <div class="input-field col s12">
                                <input name="UserName" 
                                        v-validate="'required|min:3'" 
                                        class="form-control"
                                        type="text" 
                                        v-model="register.username"
                                        placeholder="Enter your Username"
                                >
                                <span v-show="errors.has('getRegister.UserName')" style="color:#ff7979">{{ errors.first('getRegister.UserName') }}</span>
                            </div>
                            <div class="input-field col s12">
                                <input name="UserPassword" 
                                        v-validate="'required|min:6'" 
                                        class="form-control"
                                        type="password" 
                                        v-model="register.password"
                                        placeholder="Enter your Password"
                                >
                                <span v-show="errors.has('getRegister.UserPassword')" style="color:#ff7979">{{ errors.first('getRegister.UserPassword') }}</span>

                                
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
        getLogin (getLogin) {
            
            this.$validator.validateAll(getLogin).then(isValid => {
                if (!isValid) {
                    return
                }
                
                this.$store.dispatch(POST_LOGIN, this.model)
                .then((response) => {
                    console.log(response);
                    if (response.data.status) {
                        localStorage.setItem('auth', JSON.stringify(response.data.auth));
                        this.$router.push('/Dashboard');
                    }
                    else{
                        this.message.loginErr = response.data.msg;
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
        getRegister (getRegister) {
            
            this.$validator.validateAll(getRegister).then(isValid => {
                if (!isValid) {
                    return
                }
                
                this.$store.dispatch(POST_REGISTER, this.register)
                .then((response) => {
                        console.log(response);
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