import { BlockOperatorMathOp } from '@/sb3/blocks/operators'
import { NodeBase } from '../NodeBase'
import { InputNode, InputNodeOf } from '../Node'

export type NodeOperatorAdd = NodeBase<number> & {
  kind: 'operator_add'
  num1: InputNode
  num2: InputNode
}

export type NodeOperatorSubtract = NodeBase<number> & {
  kind: 'operator_subtract'
  num1: InputNode
  num2: InputNode
}

export type NodeOperatorMultiply = NodeBase<number> & {
  kind: 'operator_multiply'
  num1: InputNode
  num2: InputNode
}

export type NodeOperatorDivide = NodeBase<number> & {
  kind: 'operator_divide'
  num1: InputNode
  num2: InputNode
}

export type NodeOperatorRandom = NodeBase<number> & {
  kind: 'operator_random'
  from: InputNode
  to: InputNode
}

export type NodeOperatorGt = NodeBase<boolean> & {
  kind: 'operator_gt'
  operand1: InputNode
  operand2: InputNode
}

export type NodeOperator$Gte = NodeBase<boolean> & {
  kind: 'operator_$gte'
  operand1: InputNode
  operand2: InputNode
}

export type NodeOperatorLt = NodeBase<boolean> & {
  kind: 'operator_lt'
  operand1: InputNode
  operand2: InputNode
}

export type NodeOperator$Lte = NodeBase<boolean> & {
  kind: 'operator_$lte'
  operand1: InputNode
  operand2: InputNode
}

export type NodeOperatorEquals = NodeBase<boolean> & {
  kind: 'operator_equals'
  operand1: InputNode
  operand2: InputNode
}

export type NodeOperatorAnd = NodeBase<boolean> & {
  kind: 'operator_and'
  operand1: InputNodeOf<boolean>
  operand2: InputNodeOf<boolean>
}

export type NodeOperatorOr = NodeBase<boolean> & {
  kind: 'operator_or'
  operand1: InputNodeOf<boolean>
  operand2: InputNodeOf<boolean>
}

export type NodeOperatorNot = NodeBase<boolean> & {
  kind: 'operator_not'
  operand: InputNodeOf<boolean>
}

export type NodeOperatorJoin = NodeBase<string> & {
  kind: 'operator_join'
  string1: InputNode
  string2: InputNode
}

export type NodeOperatorLetterOf = NodeBase<string> & {
  kind: 'operator_letter_of'
  letter: InputNode
  string: InputNode
}

export type NodeOperatorLength = NodeBase<number> & {
  kind: 'operator_length'
  string: InputNode
}

export type NodeOperatorContains = NodeBase<boolean> & {
  kind: 'operator_contains'
  string1: InputNode
  string2: InputNode
}

export type NodeOperatorMod = NodeBase<number> & {
  kind: 'operator_mod'
  num1: InputNode
  num2: InputNode
}

export type NodeOperatorRound = NodeBase<number> & {
  kind: 'operator_round'
  num: InputNode
}

export type NodeOperatorMathOp = NodeBase<number> & {
  kind: 'operator_mathop'
  num: InputNode
  operator: BlockOperatorMathOp['fields']['OPERATOR'][0]
}

export type NodeOperator =
  | NodeOperatorAdd
  | NodeOperatorSubtract
  | NodeOperatorMultiply
  | NodeOperatorDivide
  | NodeOperatorRandom
  | NodeOperatorGt
  | NodeOperator$Gte
  | NodeOperatorLt
  | NodeOperator$Lte
  | NodeOperatorEquals
  | NodeOperatorAnd
  | NodeOperatorOr
  | NodeOperatorNot
  | NodeOperatorJoin
  | NodeOperatorLetterOf
  | NodeOperatorLength
  | NodeOperatorContains
  | NodeOperatorMod
  | NodeOperatorRound
  | NodeOperatorMathOp
