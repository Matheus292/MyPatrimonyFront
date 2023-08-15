<template>
    <nav>
        <router-link to="/dashboard" class="menu-item">
             <span class="material-symbols-outlined" title="Página inicial">home</span>
        </router-link>
       
        <div class="menu-item">
            <span id="logout" @click="logout" class="material-symbols-outlined logout" title="Sair">logout</span>
        </div>
       
    </nav>        
</template>

<script>
    export default{
        name: 'Menu',
        methods:{
            logout(){
                localStorage.removeItem('token');
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>
    nav{
        background: #000;
        width: 100vw;
        height: 8vh;
        position: fixed;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .menu-item{
        margin-right: 2vw;
        margin-left: 2vw;
        align-self: center;
        text-decoration: none;
    }
    .menu-item span{
        font-size: 2.5em;
        color: #fff;
    }
    .menu-item span:hover{
        color: #1688d4;
    }

    .logout{
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
    }

    .logout:hover{
        cursor: pointer;        
    }
</style>