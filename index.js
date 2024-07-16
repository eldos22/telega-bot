
const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options.js')
const token = '7428456471:AAF504N_P1gFHn7BTY4buIoaAf-q0Psfp4o'

const bot = new TelegramApi(token, {polling:true})

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю число от 0 до 9, угадай его`)
    const randomNumber = Math.floor(Math.random() *10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, `Угадай!`, gameOptions)
}


start = () => {
    
    bot.setMyCommands([
        {command: '/start', description:'Начало'},
        {command: '/info', description:'Инфо о пользователе'},
        {command: '/game', description: 'Игра'}
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://sl.combot.org/tiktok_cats_animals/webp/14xf09f988f.webp')
            return bot.sendMessage(chatId, `Welcome to bot eldos22`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю')
    
    })
    
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `Поздравляю, вы угадали ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `К сожаления не угадал ${chats[chatId]}`, againOptions)
        }
        //bot.sendMessage(chatId, `Ты выбрал цифру ${data}`)
        console.log(msg);
    })
}

start ()