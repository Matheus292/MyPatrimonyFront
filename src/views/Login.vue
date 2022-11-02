<template>
    <main class="container">
        <LoginForm v-if="this.option === 'LOGIN'"/>
    </main>
</template>

<style scoped>
    .container{
        width: 100vw;
        height: 100vh;     
        background-color: #000;
        background-size: 100% auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<script>
import LoginForm from '@/components/forms/LoginForm.vue'
export default {
    name: 'Login',
    components:{
    LoginForm,
    },
    data(){
        return {
            option: 'LOGIN'
        }
    }
}
</script>