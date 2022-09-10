<template>
    <div class="card-login">
        <div class="title">
            <img src="@/assets/img/user.png">
            <h2>Acesso ao sistema</h2>
        </div>
        <div class="body">
            <div class="row">
                <div class="label-float">
                    <input v-model="user" type="text" placeholder=" "  />
                    <label>Login</label>
                </div>
            </div>
            <div class="row">
                <div class="label-float">
                    <input v-model="password" type="password" placeholder=" " />
                    <label>Senha</label>
                </div>
            </div>
            <div class="forgot">
                <a href="#">Esqueci minha senha</a>
            </div>
            <div class="row">
                <div class="row-btn">
                    <input type="button" class="btn-action" value="Entrar" v-on:click="login">
                    <input type="button" class="btn-action" value="Novo usuário">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/services/api'

export default {
    name: 'LoginForm',
    data(){
        return {
            user: '',
            password: ''
        }
    },
    methods:{
       login(){
            api.post('/login', {login: this.user, password: this.password}).then(response=>{
                if(response.status === 200){
                    alert('logado com sucesso')
                }
            }).catch(error =>{
                    this.password = ''
            })
       }
    }
}
</script>

<style scoped>
.card-login {
    width: 75vw;
    height: 55vh;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(222, 103, 13, 0.37);
    backdrop-filter: blur(13.5px);
    -webkit-backdrop-filter: blur(13.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    overflow: auto;
}

@media screen and (min-width: 601px) {
    .card-login {
        width: 50vw;
        height: 60vh;
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 8px 32px 0 rgba(222, 103, 13, 0.37);
        backdrop-filter: blur(13.5px);
        -webkit-backdrop-filter: blur(13.5px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);

        overflow: auto;
    }
}

.title {
    margin-top: 25px;
    color: #FFF;
    text-align: center;
    margin-bottom: 20px;
}

img {
    width: 20%;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}

.body {
    width: 80%;
    height: 50%;
    margin: auto;
}

.row {
    margin-bottom: 15px;
}

.forgot {
    direction: rtl;
    color: #000;
}

a {
    text-decoration: none;
    color: #d44916;
}

.label-float {
    position: relative;
    padding-top: 13px;
    width: 100%;
    color: #FFF;

}

.label-float input {
    border: 0;
    border-bottom: 2px solid lightgrey;
    outline: none;
    min-width: 180px;
    font-size: 16px;
    transition: all .3s ease-out;
    -webkit-transition: all .3s ease-out;
    -moz-transition: all .3s ease-out;
    border-radius: 0;
    background-color: transparent;
    width: 100%;
    color: #FFF;
    height: 30px;
}

.label-float input:focus {
    border-bottom: 2px solid #d44916;
}

.label-float input::placeholder {
    color: transparent;
}

.label-float label {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 13px;
    transition: all .3s ease-out;
    -webkit-transition: all .3s ease-out;
    -moz-transition: all .3s ease-out;
}

.label-float input:required:invalid+label {
    color: red;
}

.label-float input:focus:required:invalid {
    border-bottom: 2px solid red;
}

.label-float input:required:invalid+label:before {
    content: '*';
}

.label-float input:focus+label,
.label-float input:not(:placeholder-shown)+label {
    font-size: 13px;
    margin-top: 0;
    color: #d44916;
}

.btn-action {
    background-color: transparent;
    color: #d44916;
    border: #d44916 solid 1px;
    padding: 15px;
    border-radius: 5px;
}

.btn-action:hover {
    background-color: #d44916;
    color: #000;
    border: #000 solid 1px;
    padding: 15px;
}

.row-btn {
    display: flex;
    justify-content: center;
    position: relative;
    bottom: -2em;
}


.row-btn input {
    margin-right: 18px;
}
</style>