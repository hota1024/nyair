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

export type NodeSensingTouchingObject = NodeBase<boolean> & {
  kind: 'sensing_touchingobject'
  touchingObjectMenu: InputNode
}

export type NodeSensingTouchingObjectMenu = NodeBase & {
  kind: 'sensing_touchingobjectmenu'
  touchingObjectMenu: ShadowBlockSensingTouchingObjectMenu['fields']['TOUCHINGOBJECTMENU'][0]
}

export type NodeSensingTouchingColor = NodeBase<boolean> & {
  kind: 'sensing_touchingcolor'
  color: InputNode
}

export type NodeSensingColorIsTouchingColor = NodeBase<boolean> & {
  kind: 'sensing_coloristouchingcolor'
  color: InputNode
  color2: InputNode
}

export type NodeSensingDistanceTo = NodeBase & {
  kind: 'sensing_distanceto'
  distanceToMenu: InputNode
}

export type NodeSensingDistanceToMenu = NodeBase & {
  kind: 'sensing_distancetomenu'
  distanceToMenu: ShadowBlockSensingDistanceToMenu['fields']['DISTANCETOMENU'][0]
}

export type NodeSensingAskAndWait = NodeBase & {
  kind: 'sensing_askandwait'
  question: InputNode
}

export type NodeSensingAnswer = NodeBase & {
  kind: 'sensing_answer'
}

export type NodeSensingKeyPressed = NodeBase<boolean> & {
  kind: 'sensing_keypressed'
  keyOption: InputNode
}

export type NodeSensingKeyOptions = NodeBase & {
  kind: 'sensing_keyoptions'
  keyOption: ShadowBlockSensingKeyPressedMenu['fields']['KEY_OPTION'][0]
}

export type NodeSensingMouseDown = NodeBase<boolean> & {
  kind: 'sensing_mousedown'
}

export type NodeSensingMouseX = NodeBase & {
  kind: 'sensing_mousex'
}

export type NodeSensingMouseY = NodeBase & {
  kind: 'sensing_mousey'
}

export type NodeSensingSetDragMode = NodeBase & {
  kind: 'sensing_setdragmode'
  dragMode: BlockSensingSetDragMode['fields']['DRAG_MODE'][0]
}

export type NodeSensingLoudness = NodeBase & {
  kind: 'sensing_loudness'
}

export type NodeSensingTimer = NodeBase & {
  kind: 'sensing_timer'
}

export type NodeSensingResetTimer = NodeBase & {
  kind: 'sensing_resettimer'
}

export type NodeSensingOf = NodeBase & {
  kind: 'sensing_of'
  object: InputNode
  property: BlockSensingOf['fields']['PROPERTY'][0]
}

export type NodeSensingOfObjectMenu = NodeBase & {
  kind: 'sensing_of_object_menu'
  object: ShadowBlockSensingOfObjectMenu['fields']['OBJECT'][0]
}

export type NodeSensingDaysSince2000 = NodeBase & {
  kind: 'sensing_dayssince2000'
}

export type BlockSensingUsername = NodeBase & {
  kind: 'sensing_username'
}

export type NodeSensingCurrent = NodeBase & {
  kind: 'sensing_current'
  currentMenu: BlockSensingCurrent['fields']['CURRENTMENU'][0]
}

export type NodeSensing =
  | NodeSensingTouchingObject
  | NodeSensingTouchingObjectMenu
  | NodeSensingTouchingColor
  | NodeSensingColorIsTouchingColor
  | NodeSensingDistanceTo
  | NodeSensingDistanceToMenu
  | NodeSensingAskAndWait
  | NodeSensingAnswer
  | NodeSensingKeyPressed
  | NodeSensingKeyOptions
  | NodeSensingMouseDown
  | NodeSensingMouseX
  | NodeSensingMouseY
  | NodeSensingSetDragMode
  | NodeSensingLoudness
  | NodeSensingTimer
  | NodeSensingResetTimer
  | NodeSensingOf
  | NodeSensingOfObjectMenu
  | NodeSensingDaysSince2000
  | BlockSensingUsername
  | NodeSensingCurrent
