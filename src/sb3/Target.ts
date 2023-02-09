import { Blocks } from './Blocks'
import { Broadcasts } from './Broadcasts'
import { Comments } from './Comments'
import { Costume } from './Costume'
import { Lists } from './Lists'
import { RotationStyle } from './RotationStyle'
import { Sound } from './Sound'
import { Variables } from './Variables'

/**
 * Target type.
 */
export type Target =
  | {
      isStage: true
      name: string
      variables: Variables
      lists: Lists
      broadcasts: Broadcasts
      blocks: Blocks
      comments: Comments
      currentCostume: number
      costumes: Costume[]
      sounds: Sound[]
      volume: number
      layerOrder: number
      tempo: number
      videoTransparency: number
      videoState: string
      textToSpeechLanguage: string | null
    }
  | {
      isStage: false
      name: string
      variables: Variables
      lists: Lists
      broadcasts: Broadcasts
      blocks: Blocks
      comments: Comments
      currentCostume: number
      costumes: Costume[]
      sounds: Sound[]
      volume: number
      layerOrder: number
      visible: boolean
      x: number
      y: number
      size: number
      direction: number
      draggable: boolean
      rotationStyle: RotationStyle
    }
