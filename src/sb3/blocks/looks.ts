import { UnionString } from '@/UnionString'
import { BlockBase } from './BlockBase'
import { Input } from './Input'

export type BlockLooksSayForSecs = BlockBase & {
  opcode: 'looks_sayforsecs'
  inputs: {
    MESSAGE: Input
    SECS: Input
  }
}

export type BlockLooksSay = BlockBase & {
  opcode: 'looks_say'
  inputs: {
    MESSAGE: Input
  }
}

export type BlockLooksThinkForSecs = BlockBase & {
  opcode: 'looks_thinkforsecs'
  inputs: {
    MESSAGE: Input
    SECS: Input
  }
}

export type BlockLooksThink = BlockBase & {
  opcode: 'looks_think'
  inputs: {
    MESSAGE: Input
  }
}

export type BlockLooksSwitchCostumeTo = BlockBase & {
  opcode: 'looks_switchcostumeto'
  inputs: {
    /**
     * `[1, {UID: ShadowBlockLooksCostume}]`
     */
    COSTUME: Input
  }
}

export type ShadowBlockLooksCostume = BlockBase & {
  opcode: 'looks_costume'
  fields: {
    /**
     * `["{COSTUME NAME}", null]`
     */
    COSTUME: [string, null]
  }
}

export type BlockLooksSwitchBackdropTo = BlockBase & {
  opcode: 'looks_switchbackdropto'
  inputs: {
    /**
     * `[1, {UID: ShadowBlockLooksBackdrops}]`
     */
    BACKDROP: Input
  }
}

export type ShadowBlockLooksBackdrops = BlockBase & {
  opcode: 'looks_backdrops'
  fields: {
    /**
     * `["{BACKDROP NAME}", null]`
     */
    BACKDROP: [
      UnionString<'next backdrop' | 'random backdrop' | 'previous backdrop'>,
      null
    ]
  }
}

export type BlockLooksNextCostume = BlockBase & {
  opcode: 'looks_nextcostume'
}

export type BlockLooksNextBackdrop = BlockBase & {
  opcode: 'looks_nextbackdrop'
}

export type BlockLooksChangeSizeBy = BlockBase & {
  opcode: 'looks_changesizeby'
  inputs: {
    CHANGE: Input
  }
}

export type BlockLooksSetSizeTo = BlockBase & {
  opcode: 'looks_setsizeto'
  inputs: {
    SIZE: Input
  }
}

export type BlockLooksChangeEffectBy = BlockBase & {
  opcode: 'looks_changeeffectby'
  inputs: {
    CHANGE: Input
  }
  fields: {
    EFFECT: [
      UnionString<
        | 'COLOR'
        | 'FISHEYE'
        | 'WHIRL'
        | 'PIXELLATE'
        | 'MOSAIC'
        | 'BRIGHTNESS'
        | 'GHOST'
      >,
      null
    ]
  }
}

export type BlockLooksSetEffectTo = BlockBase & {
  opcode: 'looks_seteffectto'
  inputs: {
    VALUE: Input
  }
  fields: {
    EFFECT: [
      UnionString<
        | 'COLOR'
        | 'FISHEYE'
        | 'WHIRL'
        | 'PIXELLATE'
        | 'MOSAIC'
        | 'BRIGHTNESS'
        | 'GHOST'
      >,
      null
    ]
  }
}

export type BlockLooksClearGrahpicEffects = BlockBase & {
  opcode: 'looks_cleargraphiceffects'
}

export type BlockLooksShow = BlockBase & {
  opcode: 'looks_show'
}

export type BlockLooksHide = BlockBase & {
  opcode: 'looks_hide'
}

export type BlockLooksGotoFrontBack = BlockBase & {
  opcode: 'looks_gotofrontback'
  fields: {
    FRONT_BACK: [UnionString<'front' | 'back'>, null]
  }
}

export type BlockLooksGoForwardBackwardLayers = BlockBase & {
  opcode: 'looks_goforwardbackwardlayers'
  inputs: {
    NUM: Input
  }
  fields: {
    FORWARD_BACKWARD: [UnionString<'forward' | 'backward'>, null]
  }
}

export type BlockLooksCostumeNumberName = BlockBase & {
  opcode: 'looks_costumenumbername'
  fields: {
    NUMBER_NAME: [UnionString<'number' | 'name'>, null]
  }
}

export type BlockLooksBackdropNumberName = BlockBase & {
  opcode: 'looks_backdropnumbername'
  fields: {
    NUMBER_NAME: [UnionString<'number' | 'name'>, null]
  }
}

export type BlockLooksSize = BlockBase & {
  opcode: 'looks_size'
}

export type BlockLooks =
  | BlockLooksSayForSecs
  | BlockLooksSay
  | BlockLooksThinkForSecs
  | BlockLooksThink
  | BlockLooksSwitchCostumeTo
  | ShadowBlockLooksCostume
  | BlockLooksSwitchBackdropTo
  | ShadowBlockLooksBackdrops
  | BlockLooksNextCostume
  | BlockLooksNextBackdrop
  | BlockLooksChangeSizeBy
  | BlockLooksSetSizeTo
  | BlockLooksChangeEffectBy
  | BlockLooksSetEffectTo
  | BlockLooksClearGrahpicEffects
  | BlockLooksShow
  | BlockLooksHide
  | BlockLooksGotoFrontBack
  | BlockLooksGoForwardBackwardLayers
  | BlockLooksCostumeNumberName
  | BlockLooksBackdropNumberName
  | BlockLooksSize
