import { ShadowBlockPenMenuColorParam } from '@/sb3/blocks/pen'
import { InputNode } from '../Node'
import { NodeBase } from '../NodeBase'

export type PenClear = NodeBase & {
  kind: 'pen_clear'
}

export type PenStamp = NodeBase & {
  kind: 'pen_stamp'
}

export type PenPenDown = NodeBase & {
  kind: 'pen_penDown'
}

export type PenPenUp = NodeBase & {
  kind: 'pen_penUp'
}

export type PenSetPenColorToColor = NodeBase & {
  kind: 'pen_setPenColorToColor'
  color: InputNode
}

export type PenChangePenColorParamBy = NodeBase & {
  kind: 'pen_changePenColorParamBy'
  colorParam: InputNode
  value: InputNode
}

export type PenMenuColorParam = NodeBase & {
  kind: 'pen_menu_colorParam'
  colorParam: ShadowBlockPenMenuColorParam['fields']['colorParam'][0]
}

export type PenSetPenColorParamTo = NodeBase & {
  kind: 'pen_setPenColorParamTo'
  colorParam: InputNode
  value: InputNode
}

export type PenChangePenSizeBy = NodeBase & {
  kind: 'pen_changePenSizeBy'
  size: InputNode
}

export type PenSetPenSizeTo = NodeBase & {
  kind: 'pen_setPenSizeTo'
  size: InputNode
}

export type NodePen =
  | PenClear
  | PenStamp
  | PenPenDown
  | PenPenUp
  | PenSetPenColorToColor
  | PenChangePenColorParamBy
  | PenMenuColorParam
  | PenSetPenColorParamTo
  | PenChangePenSizeBy
  | PenSetPenSizeTo
