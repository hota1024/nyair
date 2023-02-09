import { UID } from './UID'

/**
 * Comment type.
 */
export type Comment = {
  blockId: UID
  x: number
  y: number
  width: number
  height: number
  minimized: boolean
  text: string
}

/**
 * Comments type.
 */
export type Comments = {
  [key: string]: Comment
}
