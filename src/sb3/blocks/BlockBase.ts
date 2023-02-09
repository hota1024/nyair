import { NullableUID } from '../UID'

export type BlockBase =
  | {
      // eslint-disable-next-line @typescript-eslint/ban-types
      inputs: {}
      // eslint-disable-next-line @typescript-eslint/ban-types
      fields: {}
      parent: NullableUID
      next: NullableUID
      shadow: boolean
      topLevel: true
      x: number
      y: number
    }
  | {
      // eslint-disable-next-line @typescript-eslint/ban-types
      inputs: {}
      // eslint-disable-next-line @typescript-eslint/ban-types
      fields: {}
      parent: NullableUID
      next: NullableUID
      shadow: boolean
      topLevel: false
    }
