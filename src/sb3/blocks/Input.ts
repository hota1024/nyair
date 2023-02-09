import { UID } from '../UID'

export type InputBlock = UID
export type InputMathNum = [4, string]
export type InputPositiveNum = [5, string]
export type InputWholeNum = [6, string]
export type InputIntegerNum = [7, string]
export type InputAngleNum = [8, string]
export type InputColorPicker = [9, string]
export type InputText = [10, string]
export type InputBroadcast = [11, string, UID]
export type InputVar = [12, string, UID] | [12, string, UID, number, number]
export type InputList = [13, string, UID] | [13, string, UID, number, number]

export type InputBody =
  | InputBlock
  | InputMathNum
  | InputPositiveNum
  | InputWholeNum
  | InputIntegerNum
  | InputAngleNum
  | InputColorPicker
  | InputText
  | InputBroadcast
  | InputVar
  | InputList

export type Input =
  | [1, InputBody | null]
  | [2, InputBody] // [2, {BLOCK UID}]
  | [3, InputBody | null, InputBody | null]
