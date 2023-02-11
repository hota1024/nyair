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

export type NodeProcedures =
  | NodeProceduresDefinition
  | NodeProceduresPrototype
  | ArgumentReporterStringNumber
  | ArgumentReporterBoolean
  | NodeProceduresCall
