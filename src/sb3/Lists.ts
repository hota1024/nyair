import { UID } from './UID'
import { ScratchValue } from './ScratchValue'

/**
 * List type.
 */
export type List = [string, ScratchValue[]]

/**
 * Lists type.
 */
export type Lists = {
  [key: string]: List
}
