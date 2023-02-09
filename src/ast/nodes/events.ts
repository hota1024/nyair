import { NodeBase } from '../NodeBase'
import { InputNode, Node } from '../Node'

export type EventWhenFlagClicked = NodeBase & {
  kind: 'event_whenflagclicked'
  body: Node[]
}

export type EventWhenKeyPressed = NodeBase & {
  kind: 'event_whenkeypressed'
  key: string
  body: Node[]
}

export type EventWhenStageClicked = NodeBase & {
  kind: 'event_whenstageclicked'
  body: Node[]
}

export type EventWhenBackdropSwitchesTo = NodeBase & {
  kind: 'event_whenbackdropswitchesto'
  backdrop: string
  body: Node[]
}

export type EventWhenGreaterThan = NodeBase & {
  kind: 'event_whengreaterthan'
  target: 'LOUDNESS' | 'TIMER'
  value: InputNode
  body: Node[]
}

export type EventWhenBroadcastReceived = NodeBase & {
  kind: 'event_whenbroadcastreceived'
  broadcast: string
  body: Node[]
}

export type EventBroadcast = NodeBase & {
  kind: 'event_broadcast'
  broadcast: InputNode
}

export type EventBroadcastAndWait = NodeBase & {
  kind: 'event_broadcastandwait'
  broadcast: InputNode
}

export type NodeEvent =
  | EventWhenFlagClicked
  | EventWhenKeyPressed
  | EventWhenStageClicked
  | EventWhenBackdropSwitchesTo
  | EventWhenGreaterThan
  | EventWhenBroadcastReceived
  | EventBroadcast
  | EventBroadcastAndWait
