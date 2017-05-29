const CronJob = require('cron').CronJob
const fetchCount = require('./fetcher')
const getMessage = require('./messages')

const TOKEN = process.env.BOT_API_TOKEN
const BOT_NAME = 'Funny Slackbot'
const CHANNEL = 'general'
const PARAMS = {
  icon_emoji: ':heart:',
}
const CRON_PATTERN = '00 00 12 * * 1-5'
const TIME_ZONE = 'Europe/Berlin'

let previousCount = 0

if (!TOKEN) {
  throw new Error('BOT_API_TOKEN not specified')
}

const bot = new SlackBot({
  token: TOKEN,
  name: BOT_NAME,
})

const task = () => {
  console.log('--- TASK STARTED ---')
  fetchCount()
    .then(count => {
      bot.postMessageToChannel(
        CHANNEL,
        getMessage(previousCount, count),
        PARAMS
      )
      previousCount = count
    })
    .catch(error => {
      bot.postMessageToChannel(
        CHANNEL,
        'Houston, we have a problem with customers tracker!',
        PARAMS
      )
    })
}

const onCronError = error => {
  console.error('Cron job stopped', error)
}

const onDirectMessage = channel => {
  fetchCount()
    .then(count => {
      bot.postMessage(
        channel,
        `Oh,geez! You're so impatient! We have *${count} customers*. :angry:`,
        PARAMS
      )
    })
    .catch(error => {
      bot.postMessage(
        channel,
        `Something is not working properly. I couldn't get a customers number.`,
        PARAMS
      )
    })
}

bot.on('start', () => {
  console.log('--- BOT STARTED ---')
  new CronJob(CRON_PATTERN, task, onCronError, true, TIME_ZONE)
})

bot.on('message', function(data) {
  if (data.type === 'message' && data.bot_id === undefined) {
    bot.openIm(data.user).then(im => {
      if (im.channel.id === data.channel) {
        onDirectMessage(data.channel)
      }
    })
  }
})
