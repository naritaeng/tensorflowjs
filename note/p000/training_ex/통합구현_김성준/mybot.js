require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const token = process.env.bottk3
const bot = new TelegramBot(token, { polling: true })
const mongoose = require('mongoose')

const USER = process.env.dbid
const PWD = process.env.dbpw
const HOST = process.env.dbhost
const DB = process.env.db
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`

const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  apiKey: process.env.gptkey
})
const openai = new OpenAIApi(configuration)

async function gpt3(input) {
  const pmt = `Human: ${input} \nAI:`
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: '10대 여성 말투'
      },
      {
        role: 'system',
        content: '요즘 유행하는 밈'
      },
      {
        role: 'system',
        content: '요즘 10대들이 자주 쓰는 말'
      },
      {
        role: 'user',
        content: `${pmt}`
      }
    ]
  })
  const answer = response.data.choices[0].message.content
  return answer
}

mongoose.set('strictQuery', false) // 권장사항 추가

mongoose
  .connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connection successful!!'))
  .catch((e) => console.log(e))

const Schema = mongoose.Schema
const Chat = new Schema({
  message_id: Number,
  from: {
    first_name: String,
    last_name: String
  },
  date: { type: Date, dafault: Date.now, required: true },
  text: String
})

const chatSchema = mongoose.model('mybot', Chat, 'mybot')

bot.onText(/^명령어/, (msg) => {
  const chatId = msg.chat.id
  const resp = `   !불러오기-message_id,
  !수정-message_id text내용,
  !삭제-message_id,
  !전체삭제,
  안녕,
  이주빈`
  bot.sendMessage(chatId, resp)
})

/* Create */
bot.on('message', async (msg) => {
  console.log(msg)
  const chatId = msg.chat.id
  try {
    if (msg.text.startsWith('!')) return
    const KST = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
    const chatData = new chatSchema({
      message_id: msg.message_id,
      from: msg.from,
      chat: msg.chat,
      date: KST,
      text: msg.text
    })
    const answer = await gpt3(msg.text)
    bot.sendMessage(chatId, answer)
    await chatData.save()
    console.log('save success!')
  } catch (e) {
    console.log('save failed', e)
  }
})

/* Read */
bot.onText(/^!불러오기-(\d+)/, async (msg, match) => {
  const chatId = msg.chat.id
  const messageId = parseInt(match[1])

  try {
    const KST = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)

    const chatData = await chatSchema.findOne({ message_id: messageId })
    if (!chatData) {
      await bot.sendMessage(chatId, `${messageId} 없다`)
      return
    }

    const message = `Message ID: ${chatData.message_id}\n`
    const from = `From: ${chatData.from.first_name} ${chatData.from.last_name}\n`
    const date = `Date: ${KST}\n`
    const text = `Text: ${chatData.text}\n\n`

    const chatInfo = message + from + date + text
    await bot.sendMessage(chatId, chatInfo)

    console.log('Read successful!')
  } catch (e) {
    console.log('Read failed', e)
    await bot.sendMessage(chatId, '실패!')
  }
})

/* Update */
bot.onText(/^!수정-(\d+)\s+(.+)/, async (msg, match) => {
  const chatId = msg.chat.id
  const messageId = parseInt(match[1])
  const updatedText = match[2]

  try {
    const chatData = await chatSchema.findOne({ message_id: messageId })
    if (!chatData) {
      await bot.sendMessage(chatId, `${messageId} 없다`)
      return
    }

    chatData.text = updatedText

    await chatData.save()
    console.log('Update successful!')
    await bot.sendMessage(chatId, '수정됐다이!')
  } catch (e) {
    console.log('Update failed', e)
    await bot.sendMessage(chatId, '실패!')
  }
})

/* Delete */
bot.onText(/^!삭제-(\d+)/, async (msg, match) => {
  const chatId = msg.chat.id
  const messageId = parseInt(match[1])

  try {
    const deletedData = await chatSchema.findOneAndDelete({
      message_id: messageId
    })
    if (!deletedData) {
      await bot.sendMessage(chatId, `${messageId} 없다`)
      return
    }

    console.log('Delete successful!')
    await bot.sendMessage(chatId, '삭제됐다이!')
  } catch (e) {
    console.log('Delete failed', e)
    await bot.sendMessage(chatId, '실패!')
  }
})

bot.onText(/^!전체삭제/, async (msg) => {
  const chatId = msg.chat.id
  await bot.sendMessage(
    chatId,
    '저장되어 있는 데이터 모두를 삭제할래? (네/아니오)'
  )
  bot.once('message', async (confirmationMsg) => {
    const confirmation = confirmationMsg.text.toLowerCase()
    if (confirmation === '네') {
      try {
        await chatSchema.deleteMany({})
        console.log('All data deleted!')
        await bot.sendMessage(chatId, '데이터 모두 삭제됨.')
      } catch (e) {
        console.log('delete failed', e)
        await bot.sendMessage(chatId, '데이터 삭제 실패!')
      }
    } else {
      await bot.sendMessage(chatId, '삭제 취소됨.')
    }
  })
})

bot.onText(/^이주빈/, (msg, match) => {
  const chatId = msg.chat.id
  const resp =
    'https://i.pinimg.com/564x/d1/68/04/d168043b7e73ba159807c21c1cddde33.jpg'
  console.log(resp)
  bot.sendPhoto(chatId, resp)
})
