import { ScratchValue } from '@/sb3/ScratchValue'
import { NodeControl } from './nodes/controls'
import { NodeData } from './nodes/data'
import { NodeEvent } from './nodes/events'
import { NodeLiteral } from './nodes/literals'
import { NodeLooks } from './nodes/looks'
import { NodeMotion } from './nodes/motions'
import { NodeOperator } from './nodes/operators'
import { NodePen } from './nodes/pen'
import { NodeProcedures } from './nodes/procedures'
import { NodeSensing } from './nodes/sensings'
import { NodeSound } from './nodes/sounds'

export type Node =
  | NodeLiteral
  | NodeMotion
  | NodeEvent
  | NodeOperator
  | NodeControl
  | NodeData
  | NodeLooks
  | NodePen
  | NodeSensing
  | NodeSound
  | NodeProcedures

// ↓ this type is old. now we can't use ScratchValue as a Node for NOM.
// export type InputNode = Node | ScratchValue

export type InputNode = Node

export type InputNodeOf<T extends ScratchValue, N = Node> = N extends {
  $__RETURN_TYPE?: T
}
  ? N
  : never

export type NodeKind = Node['kind']
export type NodeOf<K extends NodeKind, N = Node> = N extends { kind: K }
  ? N
  : never
