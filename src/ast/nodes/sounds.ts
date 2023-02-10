import {
  BlockSoundChangeEffectBy,
  BlockSoundSetEffectTo,
} from '@/sb3/blocks/sounds'
import { InputNode } from '../Node'
import { NodeBase } from '../NodeBase'

export type NodeSoundPlayUntilDone = NodeBase & {
  kind: 'sound_playuntildone'
  soundMenu: InputNode
}

export type NodeSoundPlay = NodeBase & {
  kind: 'sound_play'
  soundMenu: InputNode
}

export type NodeSoundSoundsMenu = NodeBase & {
  kind: 'sound_sounds_menu'
  soundMenu: string
}

export type NodeSoundStopAllSounds = NodeBase & {
  kind: 'sound_stopallsounds'
}

export type NodeSoundChangeEffectBy = NodeBase & {
  kind: 'sound_changeeffectby'
  value: InputNode
  effect: BlockSoundChangeEffectBy['fields']['EFFECT'][0]
}

export type NodeSoundSetEffectTo = NodeBase & {
  kind: 'sound_seteffectto'
  value: InputNode
  effect: BlockSoundSetEffectTo['fields']['EFFECT'][0]
}

export type NodeSoundClearEffects = NodeBase & {
  kind: 'sound_cleareffects'
}

export type NodeSoundChangeVolumeBy = NodeBase & {
  kind: 'sound_changevolumeby'
  volume: InputNode
}

export type NodeSoundSetVolumeTo = NodeBase & {
  kind: 'sound_setvolumeto'
  volume: InputNode
}

export type NodeSoundVolume = NodeBase<number> & {
  kind: 'sound_volume'
}

export type NodeSound =
  | NodeSoundPlayUntilDone
  | NodeSoundPlay
  | NodeSoundSoundsMenu
  | NodeSoundStopAllSounds
  | NodeSoundChangeEffectBy
  | NodeSoundSetEffectTo
  | NodeSoundClearEffects
  | NodeSoundChangeVolumeBy
  | NodeSoundSetVolumeTo
  | NodeSoundVolume
