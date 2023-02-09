import { UnionString } from '@/UnionString'
import { ScratchKey } from '../ScratchValue'
import { BlockBase } from './BlockBase'
import { Input } from './Input'

export type BlockSensingTouchingObject = BlockBase & {
  opcode: 'sensing_touchingobject'
  inputs: {
    /**
     * `[1, {UID: ShadowBlockSensingTouchingObjectMenu}]`
     */
    TOUCHINGOBJECTMENU: Input
  }
}

export type ShadowBlockSensingTouchingObjectMenu = BlockBase & {
  opcode: 'sensing_touchingobjectmenu'
  fields: {
    TOUCHINGOBJECTMENU: [UnionString<'_mouse_' | '_edge_'>, null]
  }
}

export type BlockSensingTouchingColor = BlockBase & {
  opcode: 'sensing_touchingcolor'
  inputs: {
    /**
     * @example
     * ```js
     * [1, [9, '#ff0000']
     * ```
     */
    COLOR: Input
  }
}

export type BlockSensingColorIsTouchingColor = BlockBase & {
  opcode: 'sensing_coloristouchingcolor'
  inputs: {
    /**
     * @example
     * ```js
     * [1, [9, '#ff0000']
     * ```
     */
    COLOR: Input

    /**
     * @example
     * ```js
     * [1, [9, '#0000ff']
     * ```
     */
    COLOR2: Input
  }
}

export type BlockSensingDistanceTo = BlockBase & {
  opcode: 'sensing_distanceto'
  inputs: {
    /**
     * `[1, {UID: ShadowBlockSensingDistanceToMenu}]`
     */
    DISTANCETOMENU: Input
  }
}

export type ShadowBlockSensingDistanceToMenu = BlockBase & {
  opcode: 'sensing_distancetomenu'
  fields: {
    DISTANCETOMENU: [UnionString<'_mouse_'>, null]
  }
}

export type BlockSensingAskAndWait = BlockBase & {
  opcode: 'sensing_askandwait'
  inputs: {
    QUESTION: Input
  }
}

export type BlockSensingAnswer = BlockBase & {
  opcode: 'sensing_answer'
}

export type BlockSensingKeyPressed = BlockBase & {
  opcode: 'sensing_keypressed'
  inputs: {
    /**
     * `[1, {UID: ShadowBlockSensingKeyPressedMenu}]`
     */
    KEY_OPTION: Input
  }
}

export type ShadowBlockSensingKeyPressedMenu = BlockBase & {
  opcode: 'sensing_keyoptions'
  fields: {
    /**
     * `[{KEY}, null]`
     */
    KEY_OPTION: [ScratchKey, null]
  }
}

export type BlockSensingMouseDown = BlockBase & {
  opcode: 'sensing_mousedown'
}

export type BlockSensingMouseX = BlockBase & {
  opcode: 'sensing_mousex'
}

export type BlockSensingMouseY = BlockBase & {
  opcode: 'sensing_mousey'
}

export type BlockSensingSetDragMode = BlockBase & {
  opcode: 'sensing_setdragmode'
  fields: {
    DRAG_MODE: [UnionString<'draggable' | 'not draggable'>, null]
  }
}

export type BlockSensingLoudness = BlockBase & {
  opcode: 'sensing_loudness'
}

export type BlockSensingTimer = BlockBase & {
  opcode: 'sensing_timer'
}

export type BlockSensingResetTimer = BlockBase & {
  opcode: 'sensing_resettimer'
}

export type BlockSensingOf = BlockBase & {
  opcode: 'sensing_of'
  inputs: {
    OBJECT: Input
  }
  fields: {
    PROPERTY: [
      UnionString<
        | 'x position'
        | 'y position'
        | 'direction'
        | 'costume #'
        | 'costume name'
        | 'backdrop #'
        | 'backdrop name'
        | 'size'
        | 'volume'
      >,
      null
    ]
  }
}

export type ShadowBlockSensingOfObjectMenu = BlockBase & {
  opcode: 'sensing_of_object_menu'
  fields: {
    OBJECT: [UnionString<'_stage_'>, null]
  }
}

export type BlockSensingDaysSince2000 = BlockBase & {
  opcode: 'sensing_dayssince2000'
}

export type BlockSensingUsername = BlockBase & {
  opcode: 'sensing_username'
}

export type BlockSensingCurrent = BlockBase & {
  opcode: 'sensing_current'
  fields: {
    CURRENTMENU: [
      UnionString<
        'YEAR' | 'MONTH' | 'DATE' | 'DAYOFWEEK' | 'HOUR' | 'MINUTE' | 'SECOND'
      >,
      null
    ]
  }
}

export type BlockSensing =
  | BlockSensingTouchingObject
  | ShadowBlockSensingTouchingObjectMenu
  | BlockSensingTouchingColor
  | BlockSensingColorIsTouchingColor
  | BlockSensingDistanceTo
  | ShadowBlockSensingDistanceToMenu
  | BlockSensingAskAndWait
  | BlockSensingAnswer
  | BlockSensingKeyPressed
  | ShadowBlockSensingKeyPressedMenu
  | BlockSensingMouseDown
  | BlockSensingMouseX
  | BlockSensingMouseY
  | BlockSensingSetDragMode
  | BlockSensingLoudness
  | BlockSensingTimer
  | BlockSensingResetTimer
  | BlockSensingOf
  | ShadowBlockSensingOfObjectMenu
  | BlockSensingDaysSince2000
  | BlockSensingUsername
  | BlockSensingCurrent
