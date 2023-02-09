import {
  BlockControlStop,
  ShadowBlockControlCreateCloneOfMenu,
} from '@/sb3/blocks/controls'
import { InputNode, InputNodeOf, Node } from '../Node'
import { NodeBase } from '../NodeBase'

export type ControlWait = NodeBase & {
  kind: 'control_wait'
  duration: InputNode
}

export type ControlRepeat = NodeBase & {
  kind: 'control_repeat'
  times: InputNode
  substack: Node[]
}

export type ControlForever = NodeBase & {
  kind: 'control_forever'
  substack: Node[]
}

export type ControlIf = NodeBase & {
  kind: 'control_if'
  condition: InputNodeOf<boolean>
  substack: Node[]
}

export type ControlIfElse = NodeBase & {
  kind: 'control_if_else'
  condition: InputNodeOf<boolean>
  substack1: Node[]
  substack2: Node[]
}

export type ControlWaitUntil = NodeBase & {
  kind: 'control_wait_until'
  condition: InputNodeOf<boolean>
}

export type ControlRepeatUntil = NodeBase & {
  kind: 'control_repeat_until'
  condition: InputNodeOf<boolean>
  substack: Node[]
}

export type ControlStop = NodeBase & {
  kind: 'control_stop'
  stopOption: BlockControlStop['fields']['STOP_OPTION'][0]
}

export type ControlStartAsClone = NodeBase & {
  kind: 'control_start_as_clone'
  body: Node[]
}

export type ControlCreateCloneOf = NodeBase & {
  kind: 'control_create_clone_of'
  cloneOption: InputNode
}

export type ControlCreateCloneOfMenu = NodeBase & {
  kind: 'control_create_clone_of_menu'
  cloneOption: ShadowBlockControlCreateCloneOfMenu['fields']['CLONE_OPTION'][0]
}

export type ControlDeleteThisClone = NodeBase & {
  kind: 'control_delete_this_clone'
}

export type NodeControl =
  | ControlWait
  | ControlRepeat
  | ControlForever
  | ControlIf
  | ControlIfElse
  | ControlWaitUntil
  | ControlRepeatUntil
  | ControlStop
  | ControlStartAsClone
  | ControlCreateCloneOf
  | ControlCreateCloneOfMenu
  | ControlDeleteThisClone
