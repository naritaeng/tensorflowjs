<template>
  <div>
    <div>{{ upd }}</div>
    <h1>Props 와 Emit 을 사용하여 데이터 주고 받기</h1>
    <h3>Main 페이지 입니다.</h3>
    <button @click="downd = '위에서 아래로 던져진 데이터'">
      데이터 아래로 던지기
    </button>
    <button @click="downd = '111을 아래로 던지기'">111을 아래로 던지기</button>
    <button @click="downd = '아래로 999를 던지기'">아래로 999를 던지기</button>
    <button @click="downd = '아래로 반가워 던지기'">
      아래로 반가워 던지기
    </button>
    v-on:keyup형식:<input type="text" @keyup="downd = $event.target.value" />
    v-model:형식 <input type="text" v-model="downd" />
    <emsub :downdata="downd" @updata="upd = $event"></emsub>
    <!-- @updata = "func(a1,a2,a3,a4)" -->
  </div>
</template>
<script>
import emsub from '@/components/PropsEmitSub.vue'
export default {
  data() {
    return {
      downd: '',
      upd: ''
    }
  },
  components: { emsub }
}
</script>
<style></style>
