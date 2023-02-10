import { NodeKind, NodeOf } from '@/ast/Node'
import {
  Node$LiteralBoolean,
  Node$LiteralNumber,
  Node$LiteralString,
} from '@/ast/nodes/literals'
import { ScratchValue } from '@/sb3/ScratchValue'
import { Model, ModelizeFields } from './interfaces'
import { createNomClass, NOM, NOMConstructor } from './NOM'
import { NOMList } from './NOMList'

const KIND_NOM_MAP = new Map<NodeKind, NOMConstructor>()

export const createNom = <K extends NodeKind, N extends NodeOf<K> = NodeOf<K>>(
  kind: K,
  fields: ModelizeFields<N>
): NOM<N> => {
  let nomClass = KIND_NOM_MAP.get(kind) as NOMConstructor<N> | undefined
  if (!nomClass) {
    nomClass = createNomClass(kind)
    KIND_NOM_MAP.set(kind, nomClass as NOMConstructor)
  }

  return new nomClass(fields)
}

export const createNomList = (nomArray: Model[]): NOMList =>
  new NOMList(nomArray)

type ScratchValueToLiteral<T extends ScratchValue> = T extends number
  ? Node$LiteralNumber
  : T extends string
  ? Node$LiteralString
  : T extends boolean
  ? Node$LiteralBoolean
  : never

export const createNomValue = <
  T extends ScratchValue,
  N extends ScratchValueToLiteral<T> = ScratchValueToLiteral<T>
>(
  value: T
): NOM<N> => {
  if (typeof value === 'number') {
    return createNom('$literal_number', { value }) as NOM<N>
  }

  if (typeof value === 'string') {
    return createNom('$literal_string', { value }) as NOM<N>
  }

  if (typeof value === 'boolean') {
    return createNom('$literal_boolean', { value }) as NOM<N>
  }

  throw new Error(`invaid value: ${value}`)
}
