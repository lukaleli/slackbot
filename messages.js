Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)]
}

String.prototype.format = function() {
  const args = arguments
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined' ? args[number] : match
  })
}

const sameCountMessages = [
  `Hello, fellows! Looks like we don't work too hard because we still have only *{0} customers*! Nothing's changed from the last time! Chop, chop! Work harder! :v:`,
  `Goddammit! We still have only *{0} customers*. I promise you, I'm gonna stick this pace stick through your ears and ride you round this parade square like a shagging motorbike! Get to work!! :angry:`,
  `Guys, did u ever pick up your teeth with broken fingers? You will learn soon. *{0} bloody customers*`,
  `Hi, guys... I feel like I am the only one doing the real work here... We have only *{0} people* onboard!!! Come on! I believe that you can do better! :rick:`,
  `What's wrong with you guys?! Still *{0} customers*? No progress? I’m going to rip your arm off and slap you with the soggy end if there's no improvement soon!`,
  `Hey guys! Who's the master? Huh? Who's the master? Certainly not we! Only *{0} customers*? We certainly can do better! Up up up! Get to work!`,
  `Only *{0} customers*... I'm going to hurt you, guys, *alot*, and *slowly*...`,
  `This is the last time I'm coming here and there's no improvement! We have poor number of *{0} customers*... It's laughable! I'm gonna make you my sex slaves next time if this doesn't change! Bye!`,
]

const decreasedCountMessages = [
  `WTF PEOPLE?! *{0} customers*??!! Even my mother can do better!! NOT SAYING BYE THIS TIME! :point_up:`,
  `Guys, seriously! I am going to skin you and use it as a fckng wet suit this weekend. Customers are leaving us! Only *{0}* left! Aaaaaaah!`,
  `:middle_finger: We're losing them!!! Only *{0}* left!!! Aaaarrggghhhhhh, I need to get a drink... :middle_finger: :middle_finger: :middle_finger:`,
  `Noooooooo! That's it! I'm done! Fuck it fuck it fuck it! Only *{0} customers* left. It means that tomorrow we can all go home! :rage:`,
]

const increasedCountMessages = [
  `Hello! I want to proudly announce that we are badass! *{0} customers* and counting! Love you guys, keep up the good work! :kiss:`,
  `:raised_hands: Getting down on my knees... You're awesome guys! We've reached *{0} customers*! Tequilla shots on me! Keep it up- don't you ever stop! :pray:`,
  `What a beeeeeeeaaaaaauuuuuutiiiiiiifuuuuuuul day! We reached enormous number of *{0} customers* in our garden, which means we're getting there! Love you guys! :heart:`,
  `Uh la la! Who's the master? Huh? Who's the master? We are! Next customers arriving slowly but steady! *{0} people* on board! Yupiii! :muscle:`,
]

const messages = [
  { cond: (prev, current) => prev < current, msg: increasedCountMessages },
  { cond: (prev, current) => prev > current, msg: decreasedCountMessages },
  { cond: (prev, current) => prev === current, msg: sameCountMessages },
]

const getMessage = (prev, current) => {
  for (const i in messages) {
    if (messages[i].cond(prev, current)) {
      return messages[i].msg.random().format(current)
    }
  }
}

module.exports = getMessage
