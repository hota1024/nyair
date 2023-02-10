import { ShadowBlockPenMenuColorParam } from '@/sb3/blocks/pen'
import { InputNode } from '../Node'
import { NodeBase } from '../NodeBase'

export type NodePenClear = NodeBase & {
  kind: 'pen_clear'
}

export type NodePenStamp = NodeBase & {
  kind: 'pen_stamp'
}

export type NodePenPenDown = NodeBase & {
  kind: 'pen_penDown'
}

export type NodePenPenUp = NodeBase & {
  kind: 'pen_penUp'
}

export type NodePenSetPenColorToColor = NodeBase & {
  kind: 'pen_setPenColorToColor'
  color: InputNode
}

export type NodePenChangePenColorParamBy = NodeBase & {
  kind: 'pen_changePenColorParamBy'
  colorParam: InputNode
  value: InputNode
}

export type NodePenMenuColorParam = NodeBase & {
  kind: 'pen_menu_colorParam'
  colorParam: ShadowBlockPenMenuColorParam['fields']['colorParam'][0]
}

export type NodePenSetPenColorParamTo = NodeBase & {
  kind: 'pen_setPenColorParamTo'
  colorParam: InputNode
  value: InputNode
}

export type NodePenChangePenSizeBy = NodeBase & {
  kind: 'pen_changePenSizeBy'
  size: InputNode
}

export type NodePenSetPenSizeTo = NodeBase & {
  kind: 'pen_setPenSizeTo'
  size: InputNode
}

export type NodePen =
  | NodePenClear
  | NodePenStamp
  | NodePenPenDown
  | NodePenPenUp
  | NodePenSetPenColorToColor
  | NodePenChangePenColorParamBy
  | NodePenMenuColorParam
  | NodePenSetPenColorParamTo
  | NodePenChangePenSizeBy
  | NodePenSetPenSizeTo
