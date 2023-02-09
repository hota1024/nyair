import { BlockBase } from './BlockBase'
import { BlockMutation } from './BlockMutation'
import { Input } from './Input'

export type BlockProceduresDefinition = BlockBase & {
  opcode: 'procedures_definition'
  inputs: {
    /**
     * `[1, {UID: ShadowBlockProceduresPrototype}]`
     */
    custom_block: Input
  }
}

export type ShadowBlockProceduresPrototype = BlockBase & {
  opcode: 'procedures_prototype'
  inputs: {
    /**
     * `[1, {UID: ShadowBlockArgumentReporterStringNumber}]`
     * or
     * `[1, {UID: ShadowBlockArgumentReporterBoolean}]`
     */
    [key: string]: Input
  }
  mutation: BlockMutation
}

export type ShadowBlockArgumentReporterStringNumber = BlockBase & {
  opcode: 'argument_reporter_string_number'
  fields: {
    /**
     * `[{NAME}, null]`
     */
    VALUE: [string, null]
  }
}

export type ShadowBlockArgumentReporterBoolean = BlockBase & {
  opcode: 'argument_reporter_boolean'
  fields: {
    /**
     * `[{NAME}, null]`
     */
    VALUE: [string, null]
  }
}

export type BlockProceduresCall = BlockBase & {
  opcode: 'procedures_call'
  inputs: {
    [key: string]: Input
  }
  mutation: BlockMutation
}

export type BlockProcedures =
  | BlockProceduresDefinition
  | ShadowBlockProceduresPrototype
  | ShadowBlockArgumentReporterStringNumber
  | ShadowBlockArgumentReporterBoolean
  | BlockProceduresCall
