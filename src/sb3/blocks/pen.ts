import { UnionString } from '@/UnionString'
import { BlockBase } from './BlockBase'
import { Input } from './Input'

export type BlockPenClear = BlockBase & {
  opcode: 'pen_clear'
}

export type BlockPenStamp = BlockBase & {
  opcode: 'pen_stamp'
}

export type BlockPenPenDown = BlockBase & {
  opcode: 'pen_penDown'
}

export type BlockPenPenUp = BlockBase & {
  opcode: 'pen_penUp'
}

export type BlockPenSetPenColorToColor = BlockBase & {
  opcode: 'pen_setPenColorToColor'
  inputs: {
    COLOR: Input
  }
}

export type BlockPenChangePenColorParamBy = BlockBase & {
  opcode: 'pen_changePenColorParamBy'
  inputs: {
    /**
     * `[1, {UID: ShadowBlockPenMenuColorParam}]`
     */
    COLOR_PARAM: Input
    VALUE: Input
  }
}

export type ShadowBlockPenMenuColorParam = BlockBase & {
  opcode: 'pen_menu_colorParam'
  fields: {
    colorParam: [
      UnionString<'color' | 'saturation' | 'brightness' | 'transparency'>,
      null
    ]
  }
}

export type BlockPenSetPenColorParamTo = BlockBase & {
  opcode: 'pen_setPenColorParamTo'
  inputs: {
    /**
     * `[1, {UID: ShadowBlockPenMenuColorParam}]`
     */
    COLOR_PARAM: Input
    VALUE: Input
  }
}

export type BlockPenChangePenSizeBy = BlockBase & {
  opcode: 'pen_changePenSizeBy'
  inputs: {
    SIZE: Input
  }
}

export type BlockPenSetPenSizeTo = BlockBase & {
  opcode: 'pen_setPenSizeTo'
  inputs: {
    SIZE: Input
  }
}

export type BlockPen =
  | BlockPenClear
  | BlockPenStamp
  | BlockPenPenDown
  | BlockPenPenUp
  | BlockPenSetPenColorToColor
  | BlockPenChangePenColorParamBy
  | ShadowBlockPenMenuColorParam
  | BlockPenSetPenColorParamTo
  | BlockPenChangePenSizeBy
  | BlockPenSetPenSizeTo
