import { UID } from './UID'
import { ScratchValue } from './ScratchValue'

/**
 * Variable type.
 */
export type Variable = [string, ScratchValue]

/**
 * Variables type.
 */
export type Variables = {
  [key: string]: Variable
}
