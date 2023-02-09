import { UnionString } from '@/UnionString'
import { InputNode } from '../Node'
import { NodeBase } from '../NodeBase'

export type MotionMoveSteps = NodeBase & {
  kind: 'motion_movesteps'
  steps: InputNode
}

export type MotionTurnRight = NodeBase & {
  kind: 'motion_turnright'
  degrees: InputNode
}

export type MotionTurnLeft = NodeBase & {
  kind: 'motion_turnleft'
  degrees: InputNode
}

export type MotionGoto = NodeBase & {
  kind: 'motion_goto'
  to: InputNode
}

export type MotionGotoMenu = NodeBase & {
  kind: 'motion_goto_menu'
  to: UnionString<'_random_' | '_mouse_'>
}

export type MotionGotoXY = NodeBase & {
  kind: 'motion_gotoxy'
  x: InputNode
  y: InputNode
}

export type MotionGlideTo = NodeBase & {
  kind: 'motion_glideto'
  secs: InputNode
  to: InputNode
}

export type MotionGlideToMenu = NodeBase & {
  kind: 'motion_glideto_menu'
  to: UnionString<'_random_' | '_mouse_'>
}

export type MotionGlideSecsToXY = NodeBase & {
  kind: 'motion_glidesecstoxy'
  secs: InputNode
  x: InputNode
  y: InputNode
}

export type MotionPointInDirection = NodeBase & {
  kind: 'motion_pointindirection'
  direction: InputNode
}

export type MotionPointToWards = NodeBase & {
  kind: 'motion_pointtowards'
  towards: InputNode
}

export type MotionPointToWardsMenu = NodeBase & {
  kind: 'motion_pointtowards_menu'
  towards: UnionString<'_mouse_'>
}

export type MotionChangeX = NodeBase & {
  kind: 'motion_changexby'
  dx: InputNode
}

export type MotionSetX = NodeBase & {
  kind: 'motion_setx'
  x: InputNode
}

export type MotionChangeY = NodeBase & {
  kind: 'motion_changeyby'
  dy: InputNode
}

export type MotionSetY = NodeBase & {
  kind: 'motion_sety'
  y: InputNode
}

export type MotionIfOnEdgeBounce = NodeBase & {
  kind: 'motion_ifonedgebounce'
}

export type MotionSetRotationStyle = NodeBase & {
  kind: 'motion_setrotationstyle'
  style: UnionString<'left-right' | `don't rotate` | 'all around'>
}

export type MotionXPosition = NodeBase<number> & {
  kind: 'motion_xposition'
}

export type MotionYPosition = NodeBase<number> & {
  kind: 'motion_yposition'
}

export type MotionDirection = NodeBase<number> & {
  kind: 'motion_direction'
}

export type NodeMotion =
  | MotionMoveSteps
  | MotionTurnRight
  | MotionTurnLeft
  | MotionGoto
  | MotionGotoMenu
  | MotionGotoXY
  | MotionGlideTo
  | MotionGlideToMenu
  | MotionGlideSecsToXY
  | MotionPointInDirection
  | MotionPointToWards
  | MotionPointToWardsMenu
  | MotionChangeX
  | MotionSetX
  | MotionChangeY
  | MotionSetY
  | MotionIfOnEdgeBounce
  | MotionSetRotationStyle
  | MotionXPosition
  | MotionYPosition
  | MotionDirection
