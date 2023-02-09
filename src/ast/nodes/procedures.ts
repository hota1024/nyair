import { ScratchValue } from '@/sb3/ScratchValue'
import { UnionString } from '@/UnionString'
import { InputNode, Node } from '../Node'
import { NodeBase } from '../NodeBase'

export type ProceduresDefinition = NodeBase & {
  kind: 'procedures_definition'
  customBlock: InputNode
  body: Node[]
}

export type ProceduresPrototype = NodeBase & {
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

export type ProceduresCall = NodeBase & {
  kind: 'procedures_call'
  procCode: UnionString<'%s' | '%b'>[]
  arguments: InputNode[]
}

export type $ProcDef = NodeBase & {
  kind: '$proc_def'
  name: string
  schema: (string | { name: string; type: 'string_number' | 'boolean' })[]
  warp: boolean
  body: Node[]
}

export type $ProcCall = NodeBase & {
  kind: '$proc_call'
  name: string
  arguments: InputNode[]
}

export type NodeProcedures =
  | ProceduresDefinition
  | ProceduresPrototype
  | ArgumentReporterStringNumber
  | ArgumentReporterBoolean
  | ProceduresCall
  | $ProcDef
  | $ProcCall
