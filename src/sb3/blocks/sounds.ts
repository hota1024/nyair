import { UnionString } from '@/UnionString'
import { BlockBase } from './BlockBase'
import { Input } from './Input'

export type BlockSoundPlayUntilDone = BlockBase & {
  opcode: 'sound_playuntildone'
  inputs: {
    /**
     * `[1, {UID: ShadowBlockSoundSoundsMenu}]`
     */
    SOUND_MENU: Input
  }
}

export type ShadowBlockSoundSoundsMenu = BlockBase & {
  opcode: 'sound_sounds_menu'
  fields: {
    /**
     * `["{SOUND NAME}", null]`
     */
    SOUND_MENU: [string, null]
  }
}

export type BlockSoundPlay = BlockBase & {
  opcode: 'sound_play'
  inputs: {
    /**
     * `[1, {UID: ShadowBlockSoundSoundsMenu}]`
     */
    SOUND_MENU: Input
  }
}

export type BlockSoundStopAllSounds = BlockBase & {
  opcode: 'sound_stopallsounds'
}

export type BlockSoundChangeEffectBy = BlockBase & {
  opcode: 'sound_changeeffectby'
  inputs: {
    VALUE: Input
  }
  fields: {
    EFFECT: [UnionString<'PITCH' | 'PAN'>, null]
  }
}

export type BlockSoundSetEffectTo = BlockBase & {
  opcode: 'sound_seteffectto'
  inputs: {
    VALUE: Input
  }
  fields: {
    EFFECT: [UnionString<'PITCH' | 'PAN'>, null]
  }
}

export type BlockSoundClearEffects = BlockBase & {
  opcode: 'sound_cleareffects'
}

export type BlockSoundChangeVolumeBy = BlockBase & {
  opcode: 'sound_changevolumeby'
  inputs: {
    VOLUME: Input
  }
}

export type BlockSoundSetVolumeTo = BlockBase & {
  opcode: 'sound_setvolumeto'
  inputs: {
    VOLUME: Input
  }
}

export type BlockSoundVolume = BlockBase & {
  opcode: 'sound_volume'
}

export type BlockSound =
  | BlockSoundPlayUntilDone
  | ShadowBlockSoundSoundsMenu
  | BlockSoundPlay
  | BlockSoundStopAllSounds
  | BlockSoundChangeEffectBy
  | BlockSoundSetEffectTo
  | BlockSoundClearEffects
  | BlockSoundChangeVolumeBy
  | BlockSoundSetVolumeTo
  | BlockSoundVolume
