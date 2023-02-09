import { BlockOperatorMathOp } from '@/sb3/blocks/operators'
import { NodeBase } from '../NodeBase'
import { InputNode, InputNodeOf } from '../Node'

export type OperatorAdd = NodeBase<number> & {
  kind: 'operator_add'
  num1: InputNode
  num2: InputNode
}

export type OperatorSubtract = NodeBase<number> & {
  kind: 'operator_subtract'
  num1: InputNode
  num2: InputNode
}

export type OperatorMultiply = NodeBase<number> & {
  kind: 'operator_multiply'
  num1: InputNode
  num2: InputNode
}

export type OperatorDivide = NodeBase<number> & {
  kind: 'operator_divide'
  num1: InputNode
  num2: InputNode
}

export type OperatorRandom = NodeBase<number> & {
  kind: 'operator_random'
  from: InputNode
  to: InputNode
}

export type OperatorGt = NodeBase<boolean> & {
  kind: 'operator_gt'
  operand1: InputNode
  operand2: InputNode
}

export type Operator$Gte = NodeBase<boolean> & {
  kind: 'operator_$gte'
  operand1: InputNode
  operand2: InputNode
}

export type OperatorLt = NodeBase<boolean> & {
  kind: 'operator_lt'
  operand1: InputNode
  operand2: InputNode
}

export type Operator$Lte = NodeBase<boolean> & {
  kind: 'operator_$lte'
  operand1: InputNode
  operand2: InputNode
}

export type OperatorEquals = NodeBase<boolean> & {
  kind: 'operator_equals'
  operand1: InputNode
  operand2: InputNode
}

export type OperatorAnd = NodeBase<boolean> & {
  kind: 'operator_and'
  operand1: InputNodeOf<boolean>
  operand2: InputNodeOf<boolean>
}

export type OperatorOr = NodeBase<boolean> & {
  kind: 'operator_or'
  operand1: InputNodeOf<boolean>
  operand2: InputNodeOf<boolean>
}

export type OperatorNot = NodeBase<boolean> & {
  kind: 'operator_not'
  operand: InputNodeOf<boolean>
}

export type OperatorJoin = NodeBase<string> & {
  kind: 'operator_join'
  string1: InputNode
  string2: InputNode
}

export type OperatorLetterOf = NodeBase<string> & {
  kind: 'operator_letter_of'
  letter: InputNode
  string: InputNode
}

export type OperatorLength = NodeBase<number> & {
  kind: 'operator_length'
  string: InputNode
}

export type OperatorContains = NodeBase<boolean> & {
  kind: 'operator_contains'
  string1: InputNode
  string2: InputNode
}

export type OperatorMod = NodeBase<number> & {
  kind: 'operator_mod'
  num1: InputNode
  num2: InputNode
}

export type OperatorRound = NodeBase<number> & {
  kind: 'operator_round'
  num: InputNode
}

export type OperatorMathOp = NodeBase<number> & {
  kind: 'operator_mathop'
  num: InputNode
  operator: BlockOperatorMathOp['fields']['OPERATOR'][0]
}

export type NodeOperator =
  | OperatorAdd
  | OperatorSubtract
  | OperatorMultiply
  | OperatorDivide
  | OperatorRandom
  | OperatorGt
  | Operator$Gte
  | OperatorLt
  | Operator$Lte
  | OperatorEquals
  | OperatorAnd
  | OperatorOr
  | OperatorNot
  | OperatorJoin
  | OperatorLetterOf
  | OperatorLength
  | OperatorContains
  | OperatorMod
  | OperatorRound
  | OperatorMathOp
