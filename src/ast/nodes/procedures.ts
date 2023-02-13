import { ScratchValue } from '@/sb3/ScratchValue'
import { UnionString } from '@/UnionString'
import { InputNode, Node } from '../Node'
import { NodeBase } from '../NodeBase'

export type NodeProceduresDefinition = NodeBase & {
  kind: 'procedures_definition'
  customBlock: InputNode
  body: Node[]
}

export type NodeProceduresPrototype = NodeBase & {
  kind: 'procedures_prototype'
  procCode: UnionString<'%s' | '%b'>[]
  arguments: InputNode[]
  argumentDefaults: ScratchValue[]
  warp: boolean
}

export type ArgumentReporterStringNumber = NodeBase & {
  kind: 'argument_reporter_string_number'
  name: string
}

export type ArgumentReporterBoolean = NodeBase & {
  kind: 'argument_reporter_boolean'
  name: string
}

export type NodeProceduresCall = NodeBase & {
  kind: 'procedures_call'
  procCode: UnionString<'%s' | '%b'>[]
  arguments: InputNode[]
}

export type ProcSchema =
  | {
      type: 'label'
      text: string
    }
  | {
      type: 'string_number'
      name: string
    }
  | {
      type: 'boolean'
      name: string
    }

export type Node$ProcDef = NodeBase & {
  kind: '$proc_def'
  name: string
  schema: ProcSchema[]
  warp: boolean
  body: Node[]
}

export type Node$ProcCall = NodeBase & {
  kind: '$proc_call'
  name: string
  args: InputNode[]
}

export type Node$ProcInput = NodeBase & {
  kind: '$proc_arg'
  name: string
}

export type NodeProcedures =
  | NodeProceduresDefinition
  | NodeProceduresPrototype
  | ArgumentReporterStringNumber
  | ArgumentReporterBoolean
  | NodeProceduresCall
  | Node$ProcDef
  | Node$ProcCall
  | Node$ProcInput
