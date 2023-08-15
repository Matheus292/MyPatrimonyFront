<template>
    <main class="container">
        <div class="card-login">
            <div class="title">
                <img src="@/assets/img/user.png">
                <h2>Acesso ao sistema</h2>
            </div>
            <div class="body">
                <div class="row">
                    <InputForm v-model="user" type="text" label="Login" />
                </div>
                <div class="row">
                    <InputForm v-model="password" type="password" label="Senha" />
                </div>
                <!--<div class="forgot">
                    <a href="#">Esqueci minha senha</a>
                    <a href="#">Registrar-se</a>
                </div>-->
                <div class="row">
                    <div class="row-btn">
                        <input type="button" v-show="user.trim() !== '' && password.trim() !== ''" class="btn-action" value="Entrar" @click="login">
                    </div>                    
                </div>
            </div>
        </div>
        <AlertModal v-show="isModalVisible" @close="closeModal" :content="content" :title="title"></AlertModal>
    </main>
</template>

<style scoped>
    .container{
        width: 100vw;
        height: 100vh;     
        background: rgb(7,19,57);
        background: linear-gradient(117deg, rgba(7,19,57,1) 10%, rgba(13,40,112,1) 40%, rgba(24,72,160,1) 50%, rgba(13,40,112,1) 60%, rgba(7,19,57,1) 96%);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card-login {
        width: 75vw;
        height: 55vh;
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 8px 32px 0 rgba(3, 138, 187, 0.37);
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
            box-shadow: 0 8px 32px 0 rgba(3, 138, 187, 0.37);
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
        color: #16c4d4;
        margin-right: 2%;
    }

    .btn-action {
        background-color: rgba(13,40,112,1);
        color: #16c4d4;
        border: #16c4d4 solid 1px;
        padding: 15px;
        border-radius: 5px;
        width: 30%;
    }

    .btn-action:hover {
        background-color: rgb(7,19,57);
        color: #16c4d4;
        border: #16c4d4 solid 1px;
        padding: 15px;
        width: 30%;
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

<script>
import { mapState } from 'vuex'
import api from '@/services/api'
import InputForm from '@/components/input/InputForm.vue'
import AlertModal from '@/components/alert/AlertModal.vue'


export default {
    name: 'Login',
    components:{
        InputForm,
        AlertModal
    },
    computed: {
        ...mapState(['authentication'])
    },
    data(){
        return {
            user: '',
            password: '',
            isModalVisible: false,
            title:'',
            content:''
        }
    },
    methods:{
        login(){
            api.post('/login', {login: this.user, password: this.password}).then(response=>{
                if(response.status === 200){
                }
            }).catch(error =>{
                    this.password = ''
                    this.title = 'Falha ao acessar o sistema'
                    this.content = error.response.data.message
                    this.showModal()
            })
       },
       showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        }
    }
}
</script>