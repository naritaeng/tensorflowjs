const app = require('express')()
const cors = require('cors')

const port = 3000

app.use(cors())

const option = {
  origin: '*', // 접근 권한을 부여하는 도메인
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentilals 추가
  optionSuccessStatus: 200 // 응답 상태 200으로 설정
}

app.use(cors(option))

const memos = [
  '메모1의 내용들',
  '메모2의 내용들',
  '메모3의 내용들',
  '메모4의 내용들',
  '메모5의 내용들'
]

app.get('/v1/memos', (req, res) => {
  res.send(memos)
})

app.listen(port, () => console.log('listening on port : ' + port))
