import { NodeBase } from '../NodeBase'
import { InputNode, Node } from '../Node'

export type NodeEventWhenFlagClicked = NodeBase & {
  kind: 'event_whenflagclicked'
  body: Node[]
}

export type NodeEventWhenKeyPressed = NodeBase & {
  kind: 'event_whenkeypressed'
  key: string
  body: Node[]
}

export type NodeEventWhenStageClicked = NodeBase & {
  kind: 'event_whenstageclicked'
  body: Node[]
}

export type NodeEventWhenThisSpriteClicked = NodeBase & {
  kind: 'event_whenthisspriteclicked'
  body: Node[]
}

export type NodeEventWhenBackdropSwitchesTo = NodeBase & {
  kind: 'event_whenbackdropswitchesto'
  backdrop: string
  body: Node[]
}

export type NodeEventWhenGreaterThan = NodeBase & {
  kind: 'event_whengreaterthan'
  target: 'LOUDNESS' | 'TIMER'
  value: InputNode
  body: Node[]
}

export type NodeEventWhenBroadcastReceived = NodeBase & {
  kind: 'event_whenbroadcastreceived'
  broadcast: string
  body: Node[]
}

export type NodeEventBroadcast = NodeBase & {
  kind: 'event_broadcast'
  broadcast: InputNode
}

export type NodeEventBroadcastAndWait = NodeBase & {
  kind: 'event_broadcastandwait'
  broadcast: InputNode
}

export type NodeEvent =
  | NodeEventWhenFlagClicked
  | NodeEventWhenKeyPressed
  | NodeEventWhenStageClicked
  | NodeEventWhenThisSpriteClicked
  | NodeEventWhenBackdropSwitchesTo
  | NodeEventWhenGreaterThan
  | NodeEventWhenBroadcastReceived
  | NodeEventBroadcast
  | NodeEventBroadcastAndWait
