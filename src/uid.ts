import { UID } from './sb3/UID'

const SCRATCH_UID_LENGTH = 20
const SCRATCH_UID_CHARS =
  '!#%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

/**
 * generates a uid.
 */
export const createUID = (): UID => {
  let result = ''

  for (let i = 0; i < SCRATCH_UID_LENGTH; i++) {
    result +=
      SCRATCH_UID_CHARS[Math.floor(Math.random() * SCRATCH_UID_CHARS.length)]
  }

  return result
}
