import { UnionString } from '@/UnionString'
import { BlockBase } from './BlockBase'
import { Input } from './Input'

export type BlockOperatorAdd = BlockBase & {
  opcode: 'operator_add'
  inputs: {
    NUM1: Input
    NUM2: Input
  }
}

export type BlockOperatorSubtract = BlockBase & {
  opcode: 'operator_subtract'
  inputs: {
    NUM1: Input
    NUM2: Input
  }
}

export type BlockOperatorMultiply = BlockBase & {
  opcode: 'operator_multiply'
  inputs: {
    NUM1: Input
    NUM2: Input
  }
}

export type BlockOperatorDivide = BlockBase & {
  opcode: 'operator_divide'
  inputs: {
    NUM1: Input
    NUM2: Input
  }
}

export type BlockOperatorRandom = BlockBase & {
  opcode: 'operator_random'
  inputs: {
    FROM: Input
    TO: Input
  }
}

export type BlockOperatorGt = BlockBase & {
  opcode: 'operator_gt'
  inputs: {
    OPERAND1: Input
    OPERAND2: Input
  }
}

export type BlockOperatorLt = BlockBase & {
  opcode: 'operator_lt'
  inputs: {
    OPERAND1: Input
    OPERAND2: Input
  }
}

export type BlockOperatorEquals = BlockBase & {
  opcode: 'operator_equals'
  inputs: {
    OPERAND1: Input
    OPERAND2: Input
  }
}

export type BlockOperatorAnd = BlockBase & {
  opcode: 'operator_and'
  inputs: {
    OPERAND1?: Input
    OPERAND2?: Input
  }
}

export type BlockOperatorOr = BlockBase & {
  opcode: 'operator_or'
  inputs: {
    OPERAND1?: Input
    OPERAND2?: Input
  }
}

export type BlockOperatorNot = BlockBase & {
  opcode: 'operator_not'
  inputs: {
    OPERAND?: Input
  }
}

export type BlockOperatorJoin = BlockBase & {
  opcode: 'operator_join'
  inputs: {
    STRING1: Input
    STRING2: Input
  }
}

export type BlockOperatorLetterOf = BlockBase & {
  opcode: 'operator_letter_of'
  inputs: {
    LETTER: Input
    STRING: Input
  }
}

export type BlockOperatorLength = BlockBase & {
  opcode: 'operator_length'
  inputs: {
    STRING: Input
  }
}

export type BlockOperatorContains = BlockBase & {
  opcode: 'operator_contains'
  inputs: {
    STRING1: Input
    STRING2: Input
  }
}

export type BlockOperatorMod = BlockBase & {
  opcode: 'operator_mod'
  inputs: {
    NUM1: Input
    NUM2: Input
  }
}

export type BlockOperatorRound = BlockBase & {
  opcode: 'operator_round'
  inputs: {
    NUM: Input
  }
}

export type BlockOperatorMathOp = BlockBase & {
  opcode: 'operator_mathop'
  inputs: {
    NUM: Input
  }
  fields: {
    OPERATOR: [
      UnionString<
        | 'abs'
        | 'floor'
        | 'ceiling'
        | 'sqrt'
        | 'sin'
        | 'cos'
        | 'tan'
        | 'asin'
        | 'acos'
        | 'atan'
        | 'ln'
        | 'log'
        | 'e ^'
        | '10 ^'
      >,
      null
    ]
  }
}

export type BlockOperator =
  | BlockOperatorAdd
  | BlockOperatorSubtract
  | BlockOperatorMultiply
  | BlockOperatorDivide
  | BlockOperatorRandom
  | BlockOperatorGt
  | BlockOperatorLt
  | BlockOperatorEquals
  | BlockOperatorAnd
  | BlockOperatorOr
  | BlockOperatorNot
  | BlockOperatorJoin
  | BlockOperatorLetterOf
  | BlockOperatorLength
  | BlockOperatorContains
  | BlockOperatorMod
  | BlockOperatorRound
  | BlockOperatorMathOp
