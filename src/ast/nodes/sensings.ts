import {
  BlockSensingCurrent,
  BlockSensingOf,
  BlockSensingSetDragMode,
  ShadowBlockSensingDistanceToMenu,
  ShadowBlockSensingKeyPressedMenu,
  ShadowBlockSensingOfObjectMenu,
  ShadowBlockSensingTouchingObjectMenu,
} from '@/sb3/blocks/sensings'
import { InputNode } from '../Node'
import { NodeBase } from '../NodeBase'

export type SensingTouchingObject = NodeBase<boolean> & {
  kind: 'sensing_touchingobject'
  touchingObjectMenu: InputNode
}

export type SensingTouchingObjectMenu = NodeBase & {
  kind: 'sensing_touchingobjectmenu'
  touchingObjectMenu: ShadowBlockSensingTouchingObjectMenu['fields']['TOUCHINGOBJECTMENU'][0]
}

export type SensingTouchingColor = NodeBase<boolean> & {
  kind: 'sensing_touchingcolor'
  color: InputNode
}

export type SensingColorIsTouchingColor = NodeBase<boolean> & {
  kind: 'sensing_coloristouchingcolor'
  color: InputNode
  color2: InputNode
}

export type SensingDistanceTo = NodeBase & {
  kind: 'sensing_distanceto'
  distanceToMenu: InputNode
}

export type SensingDistanceToMenu = NodeBase & {
  kind: 'sensing_distancetomenu'
  distanceToMenu: ShadowBlockSensingDistanceToMenu['fields']['DISTANCETOMENU'][0]
}

export type SensingAskAndWait = NodeBase & {
  kind: 'sensing_askandwait'
  question: InputNode
}

export type SensingAnswer = NodeBase & {
  kind: 'sensing_answer'
}

export type SensingKeyPressed = NodeBase<boolean> & {
  kind: 'sensing_keypressed'
  keyOption: InputNode
}

export type SensingKeyOptions = NodeBase & {
  kind: 'sensing_keyoptions'
  keyOption: ShadowBlockSensingKeyPressedMenu['fields']['KEY_OPTION'][0]
}

export type SensingMouseDown = NodeBase<boolean> & {
  kind: 'sensing_mousedown'
}

export type SensingMouseX = NodeBase & {
  kind: 'sensing_mousex'
}

export type SensingMouseY = NodeBase & {
  kind: 'sensing_mousey'
}

export type SensingSetDragMode = NodeBase & {
  kind: 'sensing_setdragmode'
  dragMode: BlockSensingSetDragMode['fields']['DRAG_MODE'][0]
}

export type SensingLoudness = NodeBase & {
  kind: 'sensing_loudness'
}

export type SensingTimer = NodeBase & {
  kind: 'sensing_timer'
}

export type SensingResetTimer = NodeBase & {
  kind: 'sensing_resettimer'
}

export type SensingOf = NodeBase & {
  kind: 'sensing_of'
  object: InputNode
  property: BlockSensingOf['fields']['PROPERTY'][0]
}

export type SensingOfObjectMenu = NodeBase & {
  kind: 'sensing_of_object_menu'
  object: ShadowBlockSensingOfObjectMenu['fields']['OBJECT'][0]
}

export type SensingDaysSince2000 = NodeBase & {
  kind: 'sensing_dayssince2000'
}

export type BlockSensingUsername = NodeBase & {
  kind: 'sensing_username'
}

export type SensingCurrent = NodeBase & {
  kind: 'sensing_current'
  currentMenu: BlockSensingCurrent['fields']['CURRENTMENU'][0]
}

export type NodeSensing =
  | SensingTouchingObject
  | SensingTouchingObjectMenu
  | SensingTouchingColor
  | SensingColorIsTouchingColor
  | SensingDistanceTo
  | SensingDistanceToMenu
  | SensingAskAndWait
  | SensingAnswer
  | SensingKeyPressed
  | SensingKeyOptions
  | SensingMouseDown
  | SensingMouseX
  | SensingMouseY
  | SensingSetDragMode
  | SensingLoudness
  | SensingTimer
  | SensingResetTimer
  | SensingOf
  | SensingOfObjectMenu
  | SensingDaysSince2000
  | BlockSensingUsername
  | SensingCurrent
