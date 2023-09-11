<template>
  <div class="head" @click="stat = stat == 'memo' ? 'sub' : 'memo'">
    My memo
  </div>
  <component :is="stat == 'memo' ? Memo : Subway"></component>
</template>
<script setup>
import { ref } from 'vue'
import Memo from './components/Memo.vue'
import Subway from './components/Subway.vue'
const stat = ref('memo')
</script>
<style>
#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.head {
  font-size: 1.6rem;
  padding: 20px;
  background-color: rgb(43, 137, 184);
  color: #fff;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2px;
}
</style>
