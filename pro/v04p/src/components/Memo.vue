<template>
  <div class="content">
    <div class="list" v-if="mode === 'list'">
      <ul>
        <li v-for="memo in memos" :key="memo" @click="open(memo.id)">
          {{ memo.content }}
        </li>
      </ul>
      <button class="add-btn" @click=";(mode = 'write'), (inData = '')">
        +
      </button>
    </div>
    <!-- <div class="write" v-if="mode!=='list'"> -->
    <div class="write" v-else>
      <textarea v-model="inData" autofocus></textarea>
      <div>
        <button v-if="mode === 'write'" class="save-btn" @click="save">
          저장
        </button>
        <button v-if="mode === 'edit'" class="del-btn" @click="del">
          삭제
        </button>
        <button class="x-btn" @click="mode = 'list'">취소</button>
      </div>
      <div>
        <button v-if="mode === 'edit'" class="edit-btn" @click="edit">
          수정
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const mode = ref('list')
const inData = ref('비었음')
let memo = reactive({})
const memos = reactive(JSON.parse(localStorage.getItem('memos')) ?? [])
const save = () => {
  memos.push({ id: memos.length + 1, content: inData.value, date: new Date() })
  saveList()
}
const open = (m) => {
  for (const v of memos)
    if (m === v.id) {
      memo = v
    }
  inData.value = memo.content // 내용을 표현
  mode.value = 'edit'
}
const edit = () => {
  for (const v of memos) {
    if (memo.id === v.id) {
      v.content = inData.value
      v.date = new Date()
    }
  }
  saveList()
}
const del = () => {
  memos.forEach((v, i) => {
    if (memo.id === v.id) {
      memos.splice(i, 1)
    }
  })
  saveList()
}
const saveList = () => {
  localStorage.setItem('memos', JSON.stringify(memos))
  mode.value = 'list'
}
</script>
<style>
body {
  font-family: 'Poppins', sans-serif;
}
ul {
  margin: 0;
  padding: 0;
}

ul li {
  font-size: 1.2rem;
  padding: 20px 28px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.add-btn {
  padding: 25px;
  font-size: 30px;
  position: fixed;
  right: 10px;
  bottom: 10px;
  background-color: cornflowerblue;
  color: #fff;
  margin: 10px;
  border: none;
  border-radius: 50%;
}

textarea {
  width: 100%;
  /* 임시조절 */
  height: 330px;
  font-size: 2.5rem;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
}

.save-btn,
.edit-btn,
.del-btn,
.x-btn {
  color: #fff;
  width: 50%;
  height: 50px;
  font-size: 1.3em;
}

.save-btn {
  background-color: dodgerblue;
}

.x-btn {
  color: coral;
}

.del-btn {
  background-color: coral;
}

.edit-btn {
  margin-top: 5px;
  width: 100%;
  background-color: dodgerblue;
}
</style>
