import { UnionString } from '@/UnionString'
import { BlockBase } from './BlockBase'
import { Input } from './Input'

export type BlockMotionMoveSteps = BlockBase & {
  opcode: 'motion_movesteps'
  inputs: {
    STEPS: Input
  }
}

export type BlockMotionTurnRight = BlockBase & {
  opcode: 'motion_turnright'
  inputs: {
    DEGREES: Input
  }
}

export type BlockMotionTurnLeft = BlockBase & {
  opcode: 'motion_turnleft'
  inputs: {
    DEGREES: Input
  }
}

export type BlockMotionGoto = BlockBase & {
  opcode: 'motion_goto'
  inputs: {
    /**
     * `[1, {UID: ShadowBlockMotionGotoMenu}]`
     */
    TO: Input
  }
}

export type ShadowBlockMotionGotoMenu = BlockBase & {
  opcode: 'motion_goto_menu'
  fields: {
    /**
     * `["_random_", null]`
     *
     * `["_mouse_", null]`
     *
     * `["{SPRITE NAME}", null]`
     */
    TO: [UnionString<'_random_' | '_mouse_'>, null]
  }
}

export type BlockMotionGotoXY = BlockBase & {
  opcode: 'motion_gotoxy'
  inputs: {
    X: Input
    Y: Input
  }
}

export type BlockMotionGlideTo = BlockBase & {
  opcode: 'motion_glideto'
  inputs: {
    SECS: Input

    /**
     * `[1, {UID: ShadowBlockMotionGlideToMenu}]`
     */
    TO: Input
  }
}

export type ShadowBlockMotionGlideToMenu = BlockBase & {
  opcode: 'motion_glideto_menu'
  fields: {
    /**
     * `["_random_", null]`
     *
     * `["_mouse_", null]`
     *
     * `["{SPRITE NAME}", null]`
     */
    TO: [UnionString<'_mouse_' | '_random_'>, null]
  }
}

export type BlockMotionGlideToSecsXY = BlockBase & {
  opcode: 'motion_glidesecstoxy'
  inputs: {
    SECS: Input
    X: Input
    Y: Input
  }
}

export type BlockMotionPointInDirection = BlockBase & {
  opcode: 'motion_pointindirection'
  inputs: {
    /**
     * @example
     * ```js
     * [1, [8, "90"]]
     * ```
     */
    DIRECTION: Input
  }
}

export type BlockMotionPointToWards = BlockBase & {
  opcode: 'motion_pointtowards'
  inputs: {
    /**
     * `[1, {UID: ShadowBlockMotionPointToWardsMenu}]`
     */
    TOWARDS: Input
  }
}

export type ShadowBlockMotionPointToWardsMenu = BlockBase & {
  opcode: 'motion_pointtowards_menu'
  fields: {
    /**
     * `["_mouse_", null]`
     *
     * `["{SPRITE NAME}", null]`
     */
    TOWARDS: [UnionString<'_mouse_'>, null]
  }
}

export type BlockMotionChangeXBy = BlockBase & {
  opcode: 'motion_changexby'
  inputs: {
    DX: Input
  }
}

export type BlockMotionSetX = BlockBase & {
  opcode: 'motion_setx'
  inputs: {
    X: Input
  }
}

export type BlockMotionChangeYBy = BlockBase & {
  opcode: 'motion_changeyby'
  inputs: {
    DY: Input
  }
}

export type BlockMotionSetY = BlockBase & {
  opcode: 'motion_sety'
  inputs: {
    Y: Input
  }
}

export type BlockMotionIfOnEdgeBounce = BlockBase & {
  opcode: 'motion_ifonedgebounce'
}

export type BlockMotionSetRotationStyle = BlockBase & {
  opcode: 'motion_setrotationstyle'
  fields: {
    STYLE: [UnionString<'left-right' | `don't rotate` | 'all around'>, null]
  }
}

export type BlockMotionXPosition = BlockBase & {
  opcode: 'motion_xposition'
  parent: null
  next: null
}

export type BlockMotionYPosition = BlockBase & {
  opcode: 'motion_yposition'
  parent: null
  next: null
}

export type BlockMotionDirection = BlockBase & {
  opcode: 'motion_direction'
  parent: null
  next: null
}

export type BlockMotion =
  | BlockMotionMoveSteps
  | BlockMotionTurnRight
  | BlockMotionTurnLeft
  | BlockMotionGoto
  | ShadowBlockMotionGotoMenu
  | BlockMotionGotoXY
  | BlockMotionGlideTo
  | BlockMotionGlideToSecsXY
  | BlockMotionPointInDirection
  | BlockMotionPointToWards
  | BlockMotionChangeXBy
  | BlockMotionSetX
  | BlockMotionChangeYBy
  | BlockMotionSetY
  | BlockMotionIfOnEdgeBounce
  | BlockMotionSetRotationStyle
  | BlockMotionXPosition
  | BlockMotionYPosition
  | BlockMotionDirection
  | ShadowBlockMotionGlideToMenu
  | ShadowBlockMotionPointToWardsMenu
