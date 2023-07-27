<template>
  <div id="display"></div>
  <button @click="main"></button>
  <div>{{ result }}</div>
</template>
<script>
const videoElement = document.createElement('video')
export default {
  name: 'cam',
  data() {
    return {
      result: '스샷을 찍어 이미지 분석을 시작하세요.'
    }
  },
  methods: {
    main: async function () {
      const tf = this.$tf
      const mobilenet = this.$mobilenet
      console.log(tf)
      console.log(mobilenet)

      this.result = document.getElementById('display')
      display.append(videoElement)
      videoElement.width = 400
      videoElement.height = 400

      const cam = tf.data.webcam(videoElement)
      const net = mobilenet.load()
      const img = cam.capture()
      const result = await net.classify(img)
      img.print()
      tf.dispose(img)
      this.result = result = `분석결과 (${result[0].className} ${(
        result[0].probability * 100
      ).toFixed(2)})`
    }
  },
  mounted() {
    this.main()
  }
}
</script>
<style></style>
