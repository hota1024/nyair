import {
  BlockLooksBackdropNumberName,
  BlockLooksChangeEffectBy,
  BlockLooksCostumeNumberName,
  BlockLooksGoForwardBackwardLayers,
  BlockLooksGotoFrontBack,
  ShadowBlockLooksBackdrops,
} from '@/sb3/blocks/looks'
import { InputNode } from '../Node'
import { NodeBase } from '../NodeBase'

export type LooksSayForSecs = NodeBase & {
  kind: 'looks_sayforsecs'
  message: InputNode
  secs: InputNode
}

export type LooksSay = NodeBase & {
  kind: 'looks_say'
  message: InputNode
}

export type LooksThinkForSecs = NodeBase & {
  kind: 'looks_thinkforsecs'
  message: InputNode
  secs: InputNode
}

export type LooksThink = NodeBase & {
  kind: 'looks_think'
  message: InputNode
}

export type LooksSwitchCostumeTo = NodeBase & {
  kind: 'looks_switchcostumeto'
  costume: InputNode
}

export type LooksCostume = NodeBase & {
  kind: 'looks_costume'
  costume: string
}

export type LooksSwitchBackdropTo = NodeBase & {
  kind: 'looks_switchbackdropto'
  backdrop: InputNode
}

export type LooksBackdrops = NodeBase & {
  kind: 'looks_backdrops'
  backdrop: ShadowBlockLooksBackdrops['fields']['BACKDROP'][0]
}

export type LooksNextCostume = NodeBase & {
  kind: 'looks_nextcostume'
}

export type LooksNextBackdrop = NodeBase & {
  kind: 'looks_nextbackdrop'
}

export type LooksChangeSizeBy = NodeBase & {
  kind: 'looks_changesizeby'
  change: InputNode
}

export type LooksSetSizeTo = NodeBase & {
  kind: 'looks_setsizeto'
  size: InputNode
}

export type LooksChangeEffectBy = NodeBase & {
  kind: 'looks_changeeffectby'
  effect: BlockLooksChangeEffectBy['fields']['EFFECT'][0]
  change: InputNode
}

export type LooksSetEffectTo = NodeBase & {
  kind: 'looks_seteffectto'
  effect: BlockLooksChangeEffectBy['fields']['EFFECT'][0]
  value: InputNode
}

export type LooksClearGraphicEffects = NodeBase & {
  kind: 'looks_cleargraphiceffects'
}

export type LooksShow = NodeBase & {
  kind: 'looks_show'
}

export type LooksHide = NodeBase & {
  kind: 'looks_hide'
}

export type LooksGotoFrontBack = NodeBase & {
  kind: 'looks_gotofrontback'
  frontBack: BlockLooksGotoFrontBack['fields']['FRONT_BACK'][0]
}

export type LooksGoForwardBackwardLayers = NodeBase & {
  kind: 'looks_goforwardbackwardlayers'
  forwardBackward: BlockLooksGoForwardBackwardLayers['fields']['FORWARD_BACKWARD'][0]
  num: InputNode
}

export type LooksCostumeNumberName = NodeBase & {
  kind: 'looks_costumenumbername'
  numberName: BlockLooksCostumeNumberName['fields']['NUMBER_NAME'][0]
}

export type LooksBackdropNumberName = NodeBase & {
  kind: 'looks_backdropnumbername'
  numberName: BlockLooksBackdropNumberName['fields']['NUMBER_NAME'][0]
}

export type LooksSize = NodeBase<number> & {
  kind: 'looks_size'
}

export type NodeLooks =
  | LooksSayForSecs
  | LooksSay
  | LooksThinkForSecs
  | LooksThink
  | LooksSwitchCostumeTo
  | LooksCostume
  | LooksSwitchBackdropTo
  | LooksBackdrops
  | LooksNextCostume
  | LooksNextBackdrop
  | LooksChangeSizeBy
  | LooksSetSizeTo
  | LooksChangeEffectBy
  | LooksSetEffectTo
  | LooksClearGraphicEffects
  | LooksShow
  | LooksHide
  | LooksGotoFrontBack
  | LooksGoForwardBackwardLayers
  | LooksCostumeNumberName
  | LooksBackdropNumberName
  | LooksSize
