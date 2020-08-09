'use strict'

const qrcode = require('qrcode-terminal')
const Event = use('Event')
const { Client } = require('whatsapp-web.js')

class WhatsappService {
  constructor() {
    this._client = new Client()

    this._addServiceAuthenticatedListener()
    this._addServiceQRCodeListener()
    this._addServiceReadyListener()
    this._addServiceMessageListener()

    this._client.initialize()
  }

  _addServiceAuthenticatedListener() {
    this._client.on('authenticated', (session) => {
      console.log(`CLIENT AUTHENTICATED...`)
    })
  }

  _addServiceQRCodeListener() {
    this._client.on('qr', (qr) => {
      console.log(`QR-CODE RECEIVED: ${qr}`)

      qrcode.generate(qr, { small: true })
    })
  }

  _addServiceReadyListener() {
    this._client.on('ready', () => {
      console.log('CLIENT READY!')
    })
  }

  _addServiceMessageListener() {
    this._client.on('message', async (msg) => {
      console.log('NEW MESSAGE')

      Event.emit('message::incoming')

      if (msg.body === '!ping') {
        msg.reply("Reply with 'pong'")
        this._client.sendMessage(msg.from, "Direct Message with 'pong'")
      }
    })
  }
}

module.exports = WhatsappService
