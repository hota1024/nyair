import { InputNode, InputNodeOf, Node, NodeKind, NodeOf } from '@/ast/Node'
import { NodeOperator, NodeOperatorAdd } from '@/ast/nodes/operators'
import { ScratchValue } from '@/sb3/ScratchValue'
import { ModelizeFields } from './interfaces'
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

export const createNomList = (nomArray: NOM[]): NOMList => new NOMList(nomArray)

// const nom = createNom('looks_say', {
//   message: createNom('operator_add', {
//     num1: createNomValue(1),
//     num2: createNom('operator_add', {
//       num1: createNomValue(2),
//       num2: createNomValue(3),
//     }),
//   }),
// })

const nom = createNom('control_if', {
  condition: createNom('$literal_boolean', { value: true }),
  substack: createNomList([]),
})

type A = NOM<NodeOperatorAdd> extends NOM<NodeOperator> ? true : false
type B = ModelizeFields<NodeOperatorAdd> extends ModelizeFields<NodeOperator>
  ? true
  : false

const isStaticNode = (node: NOM): boolean => {
  if (node.is('$literal_number')) {
    return true
  }

  if (node.is('operator_add')) {
    node.num1
    return isStaticNode(node.num1) && isStaticNode(node.num2)
  }

  return false
}

console.log(JSON.stringify(nom.toNode(), null, 2))
