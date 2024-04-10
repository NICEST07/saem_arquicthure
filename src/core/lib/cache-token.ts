// import { isBefore } from '@formkit/tempo'

export class CacheToken {
  private token: null | string
  private expire: null | string

  constructor () {
    this.token = null
    this.expire = null
  }

  setToken (token: string) {
    this.token = token
    const date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    this.expire = date.toISOString().slice(0, 16)
  }

  getToken () {
    // const current = new Date()
    // if (isBefore(current, this?.expire ?? '')) return this.token

    // this.reset()
    return this.token
  }

  private reset () {
    this.token = null
    this.expire = null
  }
}
