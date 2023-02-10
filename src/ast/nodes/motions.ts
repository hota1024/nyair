import { UnionString } from '@/UnionString'
import { InputNode } from '../Node'
import { NodeBase } from '../NodeBase'

export type NodeMotionMoveSteps = NodeBase & {
  kind: 'motion_movesteps'
  steps: InputNode
}

export type NodeMotionTurnRight = NodeBase & {
  kind: 'motion_turnright'
  degrees: InputNode
}

export type NodeMotionTurnLeft = NodeBase & {
  kind: 'motion_turnleft'
  degrees: InputNode
}

export type NodeMotionGoto = NodeBase & {
  kind: 'motion_goto'
  to: InputNode
}

export type NodeMotionGotoMenu = NodeBase & {
  kind: 'motion_goto_menu'
  to: UnionString<'_random_' | '_mouse_'>
}

export type NodeMotionGotoXY = NodeBase & {
  kind: 'motion_gotoxy'
  x: InputNode
  y: InputNode
}

export type NodeMotionGlideTo = NodeBase & {
  kind: 'motion_glideto'
  secs: InputNode
  to: InputNode
}

export type NodeMotionGlideToMenu = NodeBase & {
  kind: 'motion_glideto_menu'
  to: UnionString<'_random_' | '_mouse_'>
}

export type NodeMotionGlideSecsToXY = NodeBase & {
  kind: 'motion_glidesecstoxy'
  secs: InputNode
  x: InputNode
  y: InputNode
}

export type NodeMotionPointInDirection = NodeBase & {
  kind: 'motion_pointindirection'
  direction: InputNode
}

export type NodeMotionPointToWards = NodeBase & {
  kind: 'motion_pointtowards'
  towards: InputNode
}

export type NodeMotionPointToWardsMenu = NodeBase & {
  kind: 'motion_pointtowards_menu'
  towards: UnionString<'_mouse_'>
}

export type NodeMotionChangeX = NodeBase & {
  kind: 'motion_changexby'
  dx: InputNode
}

export type NodeMotionSetX = NodeBase & {
  kind: 'motion_setx'
  x: InputNode
}

export type NodeMotionChangeY = NodeBase & {
  kind: 'motion_changeyby'
  dy: InputNode
}

export type NodeMotionSetY = NodeBase & {
  kind: 'motion_sety'
  y: InputNode
}

export type NodeMotionIfOnEdgeBounce = NodeBase & {
  kind: 'motion_ifonedgebounce'
}

export type NodeMotionSetRotationStyle = NodeBase & {
  kind: 'motion_setrotationstyle'
  style: UnionString<'left-right' | `don't rotate` | 'all around'>
}

export type NodeMotionXPosition = NodeBase<number> & {
  kind: 'motion_xposition'
}

export type NodeMotionYPosition = NodeBase<number> & {
  kind: 'motion_yposition'
}

export type NodeMotionDirection = NodeBase<number> & {
  kind: 'motion_direction'
}

export type NodeMotion =
  | NodeMotionMoveSteps
  | NodeMotionTurnRight
  | NodeMotionTurnLeft
  | NodeMotionGoto
  | NodeMotionGotoMenu
  | NodeMotionGotoXY
  | NodeMotionGlideTo
  | NodeMotionGlideToMenu
  | NodeMotionGlideSecsToXY
  | NodeMotionPointInDirection
  | NodeMotionPointToWards
  | NodeMotionPointToWardsMenu
  | NodeMotionChangeX
  | NodeMotionSetX
  | NodeMotionChangeY
  | NodeMotionSetY
  | NodeMotionIfOnEdgeBounce
  | NodeMotionSetRotationStyle
  | NodeMotionXPosition
  | NodeMotionYPosition
  | NodeMotionDirection
