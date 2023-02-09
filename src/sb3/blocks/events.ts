import { ScratchKey } from '../ScratchValue'
import { UID } from '../UID'
import { BlockBase } from './BlockBase'
import { Input } from './Input'

export type BlockEventWhenFlagClicked = BlockBase & {
  opcode: 'event_whenflagclicked'
  parent: null
}

export type BlockEventWhenKeyPressed = BlockBase & {
  opcode: 'event_whenkeypressed'
  parent: null
  fields: {
    /**
     * `["{KEY}", null]`
     *
     * @example
     * ```js
     * ["up arrow", null]
     * ["space", null]
     * ```
     */
    KEY_OPTION: [ScratchKey, null]
  }
}

export type BlockEventWhenStageClicked = BlockBase & {
  opcode: 'event_whenstageclicked'
  parent: null
}

export type BlockEventWhenBackdropSwitchesTo = BlockBase & {
  opcode: 'event_whenbackdropswitchesto'
  parent: null
  fields: {
    /**
     * `["{BACKDROP NAME}", null]`
     */
    BACKDROP: [string, null]
  }
}

export type BlockEventWhenGreaterThan = BlockBase & {
  opcode: 'event_whengreaterthan'
  parent: null
  inputs: {
    VALUE: Input
  }
  fields: {
    WHENGREATERTHANMENU: ['LOUDNESS' | 'TIMER', null]
  }
}

export type BlockEventWhenBroadcastReceived = BlockBase & {
  opcode: 'event_whenbroadcastreceived'
  parent: null
  fields: {
    /**
     * `["{BROADCAST NAME}", {BROADCAST_ID}]`
     *
     * @example
     * ```js
     * ["message1", "XeCR)]+#D.:TV)5p_|B!"]
     * ```
     */
    BROADCAST_OPTION: [string, UID]
  }
}

export type BlockEventBroadcast = BlockBase & {
  opcode: 'event_broadcast'
  inputs: {
    BROADCAST_INPUT: Input
  }
}

export type BlockEventBroadcastAndWait = BlockBase & {
  opcode: 'event_broadcastandwait'
  inputs: {
    BROADCAST_INPUT: Input
  }
}

export type BlockEvent =
  | BlockEventWhenFlagClicked
  | BlockEventWhenKeyPressed
  | BlockEventWhenStageClicked
  | BlockEventWhenBackdropSwitchesTo
  | BlockEventWhenGreaterThan
  | BlockEventWhenBroadcastReceived
  | BlockEventBroadcast
  | BlockEventBroadcastAndWait
