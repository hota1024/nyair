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

export type NodeLooksSayForSecs = NodeBase & {
  kind: 'looks_sayforsecs'
  message: InputNode
  secs: InputNode
}

export type NodeLooksSay = NodeBase & {
  kind: 'looks_say'
  message: InputNode
}

export type NodeLooksThinkForSecs = NodeBase & {
  kind: 'looks_thinkforsecs'
  message: InputNode
  secs: InputNode
}

export type NodeLooksThink = NodeBase & {
  kind: 'looks_think'
  message: InputNode
}

export type NodeLooksSwitchCostumeTo = NodeBase & {
  kind: 'looks_switchcostumeto'
  costume: InputNode
}

export type NodeLooksCostume = NodeBase & {
  kind: 'looks_costume'
  costume: string
}

export type NodeLooksSwitchBackdropTo = NodeBase & {
  kind: 'looks_switchbackdropto'
  backdrop: InputNode
}

export type NodeLooksBackdrops = NodeBase & {
  kind: 'looks_backdrops'
  backdrop: ShadowBlockLooksBackdrops['fields']['BACKDROP'][0]
}

export type NodeLooksNextCostume = NodeBase & {
  kind: 'looks_nextcostume'
}

export type NodeLooksNextBackdrop = NodeBase & {
  kind: 'looks_nextbackdrop'
}

export type NodeLooksChangeSizeBy = NodeBase & {
  kind: 'looks_changesizeby'
  change: InputNode
}

export type NodeLooksSetSizeTo = NodeBase & {
  kind: 'looks_setsizeto'
  size: InputNode
}

export type NodeLooksChangeEffectBy = NodeBase & {
  kind: 'looks_changeeffectby'
  effect: BlockLooksChangeEffectBy['fields']['EFFECT'][0]
  change: InputNode
}

export type NodeLooksSetEffectTo = NodeBase & {
  kind: 'looks_seteffectto'
  effect: BlockLooksChangeEffectBy['fields']['EFFECT'][0]
  value: InputNode
}

export type NodeLooksClearGraphicEffects = NodeBase & {
  kind: 'looks_cleargraphiceffects'
}

export type NodeLooksShow = NodeBase & {
  kind: 'looks_show'
}

export type NodeLooksHide = NodeBase & {
  kind: 'looks_hide'
}

export type NodeLooksGotoFrontBack = NodeBase & {
  kind: 'looks_gotofrontback'
  frontBack: BlockLooksGotoFrontBack['fields']['FRONT_BACK'][0]
}

export type NodeLooksGoForwardBackwardLayers = NodeBase & {
  kind: 'looks_goforwardbackwardlayers'
  forwardBackward: BlockLooksGoForwardBackwardLayers['fields']['FORWARD_BACKWARD'][0]
  num: InputNode
}

export type NodeLooksCostumeNumberName = NodeBase & {
  kind: 'looks_costumenumbername'
  numberName: BlockLooksCostumeNumberName['fields']['NUMBER_NAME'][0]
}

export type NodeLooksBackdropNumberName = NodeBase & {
  kind: 'looks_backdropnumbername'
  numberName: BlockLooksBackdropNumberName['fields']['NUMBER_NAME'][0]
}

export type NodeLooksSize = NodeBase<number> & {
  kind: 'looks_size'
}

export type NodeLooks =
  | NodeLooksSayForSecs
  | NodeLooksSay
  | NodeLooksThinkForSecs
  | NodeLooksThink
  | NodeLooksSwitchCostumeTo
  | NodeLooksCostume
  | NodeLooksSwitchBackdropTo
  | NodeLooksBackdrops
  | NodeLooksNextCostume
  | NodeLooksNextBackdrop
  | NodeLooksChangeSizeBy
  | NodeLooksSetSizeTo
  | NodeLooksChangeEffectBy
  | NodeLooksSetEffectTo
  | NodeLooksClearGraphicEffects
  | NodeLooksShow
  | NodeLooksHide
  | NodeLooksGotoFrontBack
  | NodeLooksGoForwardBackwardLayers
  | NodeLooksCostumeNumberName
  | NodeLooksBackdropNumberName
  | NodeLooksSize
