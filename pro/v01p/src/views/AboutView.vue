<template>
  <div class="about">
    <header><div>기본 헤더의 글</div></header>
    <div ref="scrollLine"></div>
    <br />
    <div>==========이곳이 사라지면==========</div>
    <div>
      <div v-for="n in 100" :key="n">{{ n }}</div>
    </div>
  </div>
  <header v-if="isFixed" class="header_fixed">
    <div>상단에 고정되는 글</div>
    <button @click="gotop">최상위로 ㄱㄱ</button>
  </header>
</template>
<script>
export default {
  data() {
    return {
      isFixed: false
    }
  },
  mounted() {
    console.log('마운트됨')
    document.addEventListener('scroll', this.scroll)
  },
  methods: {
    scroll() {
      console.log(this.$refs.scrollLine.offsetTop)
      console.log(window.scrollY)
      if (window.scrollY > this.$refs.scrollLine.offsetTop) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    gotop() {
      window.scrollTo(0, 0)
    }
  }
}
</script>
<style scoped>
.header_fixed {
  position: fixed;
  top: 0;
  /* right: 0; */
  left: 0;
  width: 100%;
  background: aliceblue;
  padding: 5px;
  z-index: 1000;
}
</style>
