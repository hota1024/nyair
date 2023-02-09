import { Costume } from '@/sb3/Costume'
import { RotationStyle } from '@/sb3/RotationStyle'
import { ScratchValue } from '@/sb3/ScratchValue'
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
  visible: true
  x: number
  y: number
  size: number
  direction: number
  draggable: boolean
  rotationStyle: RotationStyle
}

export type Nyair = {
  version: '0'
  stage: Stage
  sprites: Sprite[]
  extensions: string[]
}
