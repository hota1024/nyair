import { NodeBase } from '../NodeBase'

export type $LiteralNumber = NodeBase<number> & {
  kind: '$literal_number'
  value: number | string
}

export type $LiteralBoolean = NodeBase<boolean> & {
  kind: '$literal_boolean'
  value: boolean
}

export type $LiteralString = NodeBase<string> & {
  kind: '$literal_string'
  value: string | number
}

export type $LiteralBroadcast = NodeBase<string> & {
  kind: '$literal_broadcast'
  value: string
}

export type $LiteralColor = NodeBase<string> & {
  kind: '$literal_color'
  value: `#${string}` | number
}

export type NodeLiteral =
  | $LiteralNumber
  | $LiteralBoolean
  | $LiteralString
  | $LiteralBroadcast
  | $LiteralColor
