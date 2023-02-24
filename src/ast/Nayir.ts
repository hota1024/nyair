import { createNomListFrom } from '@/nom'
import { NOMList } from '@/nom/NOMList'
import { Broadcasts } from '@/sb3/Broadcasts'
import { Costume } from '@/sb3/Costume'
import { RotationStyle } from '@/sb3/RotationStyle'
import { ScratchValue } from '@/sb3/ScratchValue'
import { Sound } from '@/sb3/Sound'
import { videoState } from '@/sb3/VideoState'
import { Node } from './Node'

export type Variable = {
  name: string
  initialValue: ScratchValue
}

export type List = {
  name: string
  initialValue: ScratchValue[]
}

export type Target = {
  costumes: Costume[]
  sounds: Sound[]
  broadcasts: Broadcasts
  variables: Variable[]
  lists: List[]
  blocks: Node[]
  currentCostume: number
  volume: number
  layerOrder: number
}

export type Stage = Target & {
  tempo: number
  videoTransparency: number
  videoState: videoState
  textToSpeechLanguage: null
}

export type Sprite = Target & {
  name: string
  visible: true
  x: number
  y: number
  size: number
  direction: number
  draggable: boolean
  rotationStyle: RotationStyle
}

export type NyairJSON = {
  version: '0'
  stage: Stage
  sprites: Sprite[]
  extensions: string[]
}

export class Nyair {
  constructor(public readonly json: NyairJSON) {}

  getStage(): Stage {
    return this.json.stage
  }

  getSprites(): Sprite[] {
    return this.json.sprites
  }

  getTargets(): Target[] {
    return [this.getStage(), ...this.getSprites()]
  }

  getTargetNom(target: Target): NOMList {
    return createNomListFrom(target.blocks)
  }

  setTargetBlocksByNom(target: Target, nomList: NOMList): void {
    target.blocks = nomList.toNodeArray()
  }

  toJSON(): NyairJSON {
    return this.json
  }
}
