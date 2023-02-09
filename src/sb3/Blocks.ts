import { BlockControl } from './blocks/controls'
import { BlockData } from './blocks/data'
import { BlockEvent } from './blocks/events'
import { BlockLooks } from './blocks/looks'
import { BlockMotion } from './blocks/motions'
import { BlockOperator } from './blocks/operators'
import { BlockPen } from './blocks/pen'
import { BlockProcedures } from './blocks/procedures'
import { BlockSensing } from './blocks/sensings'
import { BlockSound } from './blocks/sounds'

export type Block =
  | BlockEvent
  | BlockMotion
  | BlockLooks
  | BlockSound
  | BlockControl
  | BlockSensing
  | BlockOperator
  | BlockData
  | BlockProcedures
  | BlockPen

/**
 * Blocks type.
 */
export type Blocks = {
  [key: string]: Block
}
