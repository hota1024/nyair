import {
  BlockControlStop,
  ShadowBlockControlCreateCloneOfMenu,
} from '@/sb3/blocks/controls'
import { InputNode, InputNodeOf, Node } from '../Node'
import { NodeBase } from '../NodeBase'

export type NodeControlWait = NodeBase & {
  kind: 'control_wait'
  duration: InputNode
}

export type NodeControlRepeat = NodeBase & {
  kind: 'control_repeat'
  times: InputNode
  substack: Node[]
}

export type NodeControlForever = NodeBase & {
  kind: 'control_forever'
  substack: Node[]
}

export type NodeControlIf = NodeBase & {
  kind: 'control_if'
  condition: InputNodeOf<boolean>
  substack: Node[]
}

export type NodeControlIfElse = NodeBase & {
  kind: 'control_if_else'
  condition: InputNodeOf<boolean>
  substack1: Node[]
  substack2: Node[]
}

export type NodeControlWaitUntil = NodeBase & {
  kind: 'control_wait_until'
  condition: InputNodeOf<boolean>
}

export type NodeControlRepeatUntil = NodeBase & {
  kind: 'control_repeat_until'
  condition: InputNodeOf<boolean>
  substack: Node[]
}

export type NodeControlStop = NodeBase & {
  kind: 'control_stop'
  stopOption: BlockControlStop['fields']['STOP_OPTION'][0]
}

export type NodeControlStartAsClone = NodeBase & {
  kind: 'control_start_as_clone'
  body: Node[]
}

export type NodeControlCreateCloneOf = NodeBase & {
  kind: 'control_create_clone_of'
  cloneOption: InputNode
}

export type NodeControlCreateCloneOfMenu = NodeBase & {
  kind: 'control_create_clone_of_menu'
  cloneOption: ShadowBlockControlCreateCloneOfMenu['fields']['CLONE_OPTION'][0]
}

export type NodeControlDeleteThisClone = NodeBase & {
  kind: 'control_delete_this_clone'
}

export type NodeControl =
  | NodeControlWait
  | NodeControlRepeat
  | NodeControlForever
  | NodeControlIf
  | NodeControlIfElse
  | NodeControlWaitUntil
  | NodeControlRepeatUntil
  | NodeControlStop
  | NodeControlStartAsClone
  | NodeControlCreateCloneOf
  | NodeControlCreateCloneOfMenu
  | NodeControlDeleteThisClone
