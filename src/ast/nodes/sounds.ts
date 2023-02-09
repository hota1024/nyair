import {
  BlockSoundChangeEffectBy,
  BlockSoundSetEffectTo,
} from '@/sb3/blocks/sounds'
import { InputNode } from '../Node'
import { NodeBase } from '../NodeBase'

export type SoundPlayUntilDone = NodeBase & {
  kind: 'sound_playuntildone'
  soundMenu: InputNode
}

export type SoundPlay = NodeBase & {
  kind: 'sound_play'
  soundMenu: InputNode
}

export type SoundSoundsMenu = NodeBase & {
  kind: 'sound_sounds_menu'
  soundMenu: string
}

export type SoundStopAllSounds = NodeBase & {
  kind: 'sound_stopallsounds'
}

export type SoundChangeEffectBy = NodeBase & {
  kind: 'sound_changeeffectby'
  value: InputNode
  effect: BlockSoundChangeEffectBy['fields']['EFFECT'][0]
}

export type SoundSetEffectTo = NodeBase & {
  kind: 'sound_seteffectto'
  value: InputNode
  effect: BlockSoundSetEffectTo['fields']['EFFECT'][0]
}

export type SoundClearEffects = NodeBase & {
  kind: 'sound_cleareffects'
}

export type SoundChangeVolumeBy = NodeBase & {
  kind: 'sound_changevolumeby'
  volume: InputNode
}

export type SoundSetVolumeTo = NodeBase & {
  kind: 'sound_setvolumeto'
  volume: InputNode
}

export type SoundVolume = NodeBase<number> & {
  kind: 'sound_volume'
}

export type NodeSound =
  | SoundPlayUntilDone
  | SoundPlay
  | SoundSoundsMenu
  | SoundStopAllSounds
  | SoundChangeEffectBy
  | SoundSetEffectTo
  | SoundClearEffects
  | SoundChangeVolumeBy
  | SoundSetVolumeTo
  | SoundVolume
