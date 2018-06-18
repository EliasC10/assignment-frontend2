import $ from 'jquery'
import router from './router'
import Handlebars from 'hbsfy/runtime'
import homeTemplate from './templates/home.hbs'
import contactTemplate from './templates/contact.hbs'
import playerTemplate from './templates/player.hbs'
import playersTemplate from './templates/players.hbs'
import notFoundTemplate from './templates/not-found.hbs'
import playerList from './players.json'

const $app = $('#app')
const allPlayers = []
allPlayers.push(playerList)

Handlebars.registerHelper("formatBirthday", function(birthdate){
  const year = parseInt(birthdate.substr(0, 4))
  return 2018 - year
})

function index() {
  $app.html(homeTemplate())
}

function contact() {
  $app.html(contactTemplate())
}

function player(ctx){
  const playerslug = ctx.params.player
  const found = allPlayers[0].players.find(function(element) {
    if (element.slug === playerslug) return element
  })
  $app.html(playerTemplate({player: found}))
}

function players(){
  $app.html(playersTemplate({p: allPlayers[0].players}))
}


function notFound() {
  $app.html(notFoundTemplate())
}

router('/', index)
router('/players/:player', player)
router('/players', players)
router('/contact', contact)
router('*', notFound)
router()
