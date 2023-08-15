<template>
  <main>
        <Menu></Menu>
  </main>
</template>

<script>

import Menu from '@/components/Menu.vue';

export default {
    name: 'Dashboard',
    components:{
      Menu
    }
}
</script>

<style scoped>
  main{
    background-color: #222;
    width: 100vw;
    height: 100vh;
  }
</style>