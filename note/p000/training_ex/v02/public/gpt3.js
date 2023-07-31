import axios from 'axios'

export async function gptApi(prompt, max_tokens = 32, temperature, topP, n) {
  const REST_API_KEY = process.env.VUE_APP_gpt3
  let rst = '생각중...'
  const url = 'https://api.openai.com/v1/chat/completions'
  const headers = {
    Authorization: 'Bearer ' + REST_API_KEY,
    'Content-Type': 'application/json'
  }
  const options = {
    url,
    method: 'POST',
    data: {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.'
        },
        {
          role: 'user',
          content: prompt // 사용자 입력 추가
        }
      ]
    },
    headers,
    responseType: 'json'
  }
  await axios(options)
    .then((res) => {
      rst = res.data.choices[0].message.content
      console.log(rst)
    })
    .catch((error) => {
      console.error(error) // 요청 실패 시 오류 로깅
    })
  return rst
}
