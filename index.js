const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
require('dotenv').config()


const bot = new Telegraf(process.env.BOT_TOKEN)

let messageContent ='';

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.command("list", (ctx) => {
    console.log("Я запустил"); // не запускается
    });
bot.on('channel_post', (ctx, next) => {
    ctx.update.message = ctx.update.channel_post;
    console.log(ctx.update.channel_post);
    if(ctx.update.message.text == "перекличка"){
    now = new Date();
    today = now.getDate();
    today = today + "." + now.getMonth();
    today = today + "."  + now.getFullYear();

    messageContent = today;


        //
        ctx.reply("У вас 15 секунд", {
            reply_markup: {
                inline_keyboard: [
                    [ { text: "Тут", callback_data: ctx.update.channel_post.message_id }],
                ]}});
                

                setTimeout(() => {
                    ctx.deleteMessage(ctx.update.channel_post.message_id + 1);
                    bot.telegram.editMessageText(ctx.update.channel_post.chat.id,ctx.update.message.message_id,undefined,messageContent)
                }, 15000);
}


  bot.on("callback_query", async (ctx)=>{
    let username = ctx.callbackQuery.from.username;
    let messageList = ctx.callbackQuery.data;
    let messageChatId = ctx.callbackQuery.message.chat.id;
    console.log(ctx.callbackQuery.from.username);
    console.log(ctx.callbackQuery.data);
    
     messageContent = messageContent + "\n" + username;
})

    console.log('ОПА');
    return next();
  })
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => {
    console.log('Закрываю бота');
    bot.stop('SIGINT')
})
process.once('SIGTERM', () => bot.stop('SIGTERM'))