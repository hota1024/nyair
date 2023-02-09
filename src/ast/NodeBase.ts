import { ScratchValue } from '@/sb3/ScratchValue'

export type NodeResult = ScratchValue

export type NodeBase<T extends NodeResult | void = void> = {
  $__RETURN_TYPE?: T
  $parent?: null | '$parent'
  $shadow?: null | boolean
  $location?: {
    x: number
    y: number
  }
}

export type NodeReturn<T extends NodeBase> = T extends NodeBase<infer R>
  ? R
  : never
