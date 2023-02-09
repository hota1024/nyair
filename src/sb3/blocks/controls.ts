import { UnionString } from '@/UnionString'
import { BlockBase } from './BlockBase'
import { BlockMutation } from './BlockMutation'
import { Input } from './Input'

export type BlockControlWait = BlockBase & {
  opcode: 'control_wait'
  inputs: {
    DURATION: Input
  }
}

export type BlockControlRepeat = BlockBase & {
  opcode: 'control_repeat'
  inputs: {
    TIMES: Input
    /**
     * `[2, {SUBSTACK UID}]`
     */
    SUBSTACK: Input
  }
}

export type BlockControlForever = BlockBase & {
  opcode: 'control_forever'
  next: null
  inputs: {
    /**
     * `[2, {SUBSTACK UID}]`
     */
    SUBSTACK: Input
  }
}

export type BlockControlIf = BlockBase & {
  opcode: 'control_if'
  inputs: {
    /**
     * `[2, {CONDITION UID}]`
     */
    CONDITION: Input

    /**
     * `[2, {SUBSTACK UID}]`
     */
    SUBSTACK: Input
  }
}

export type BlockControlIfElse = BlockBase & {
  opcode: 'control_if_else'
  inputs: {
    /**
     * `[2, {CONDITION UID}]`
     */
    CONDITION: Input

    /**
     * `[2, {SUBSTACK UID}]`
     */
    SUBSTACK: Input

    /**
     * `[2, {ELSE-BRANCH SUBSTACK UID}]`
     */
    SUBSTACK2: Input
  }
}

export type BlockControlWaitUntil = BlockBase & {
  opcode: 'control_wait_until'
  inputs: {
    /**
     * `[2, {CONDITION UID}]`
     */
    CONDITION: Input
  }
}

export type BlockControlRepeatUntil = BlockBase & {
  opcode: 'control_repeat_until'
  inputs: {
    /**
     * `[2, {CONDITION UID}]`
     */
    CONDITION: Input

    /**
     * `[2, {SUBSTACK UID}]`
     */
    SUBSTACK: Input
  }
}

export type BlockControlStop = BlockBase & {
  opcode: 'control_stop'
  fields: {
    STOP_OPTION: [
      UnionString<'all' | 'this script' | 'other scripts in sprite'>,
      null
    ]
  }
  mutation: BlockMutation
}

export type BlockControlStartAsClone = BlockBase & {
  opcode: 'control_start_as_clone'
  parent: null
}

export type BlockControlCreateCloneOf = BlockBase & {
  opcode: 'control_create_clone_of'
  inputs: {
    CLONE_OPTION: Input
  }
}

export type ShadowBlockControlCreateCloneOfMenu = BlockBase & {
  opcode: 'control_create_clone_of_menu'
  fields: {
    CLONE_OPTION: [UnionString<'_myself_'>, null]
  }
}

export type BlockControlDeleteThisClone = BlockBase & {
  opcode: 'control_delete_this_clone'
  next: null
}

export type BlockControl =
  | BlockControlWait
  | BlockControlRepeat
  | BlockControlForever
  | BlockControlIf
  | BlockControlIfElse
  | BlockControlWaitUntil
  | BlockControlRepeatUntil
  | BlockControlStop
  | BlockControlStartAsClone
  | BlockControlCreateCloneOf
  | ShadowBlockControlCreateCloneOfMenu
  | BlockControlDeleteThisClone
