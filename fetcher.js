const fetch = require('node-fetch')

const TRACKER_URL =
  'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'

const fetchCount = () => {
  return fetch(TRACKER_URL)
    .then(response => response.text())
    .then(response => parseInt(response))
}

module.exports = fetchCount
