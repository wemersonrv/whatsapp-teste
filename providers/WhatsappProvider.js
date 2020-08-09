'use strict'

const path = require('path')
const qrcode = require('qrcode-terminal')
const Helpers = use('Helpers')
const { ServiceProvider, ioc } = require('@adonisjs/fold')

class WhatsappProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    if (this._allowIoC) return

    ioc.singleton('WhatsappSingleton', function (app) {
      const WhatsappService = require(path.join(
        __dirname,
        '../app/Services/WhatsappService',
      ))

      return new WhatsappService()
    })
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    if (this._allowIoC) return

    const initWhats = use('WhatsappSingleton')
  }

  get _allowIoC() {
    // I will add more checks here later
    return Helpers.isAceCommand()
  }
}

module.exports = WhatsappProvider
