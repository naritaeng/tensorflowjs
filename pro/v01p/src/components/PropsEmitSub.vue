<template>
  <div id="inner">
    <h3>Sub의 내용입니다.</h3>
    <div>{{ downdata }}</div>
    <button @click="$emit('updata', '아래에서 위로 던져진 데이터')">
      데이터 위로 던지기
    </button>
    <button @click="$emit('updata', '111')">111 위로 던지기</button>
    <button @click="$emit('updata', '333')">333 위로 던지기</button><br />
    v-on:keyup형식:
    <input type="text" @keyup="$emit('updata', $event.target.value)" /><br />
    v-model형식: <input type="text" v-model="downd" />
  </div>
</template>
<script>
export default {
  name: 'insub',
  props: ['downdata']
}
</script>
<style scoped>
#inner {
  border: 5px dashed red;
  margin: 10px;
  padding: 10px;
  background: lightblue;
}
</style>
