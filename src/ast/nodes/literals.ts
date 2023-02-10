import { NodeBase } from '../NodeBase'

export type Node$LiteralNumber = NodeBase<number> & {
  kind: '$literal_number'
  value: number | string
}

export type Node$LiteralBoolean = NodeBase<boolean> & {
  kind: '$literal_boolean'
  value: boolean
}

export type Node$LiteralString = NodeBase<string> & {
  kind: '$literal_string'
  value: string | number
}

export type Node$LiteralBroadcast = NodeBase<string> & {
  kind: '$literal_broadcast'
  value: string
}

export type Node$LiteralColor = NodeBase<string> & {
  kind: '$literal_color'
  value: `#${string}` | number
}

export type NodeLiteral =
  | Node$LiteralNumber
  | Node$LiteralBoolean
  | Node$LiteralString
  | Node$LiteralBroadcast
  | Node$LiteralColor
