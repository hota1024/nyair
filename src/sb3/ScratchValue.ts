import { UnionString } from '@/UnionString'

/**
 * ScratchValue type.
 */
export type ScratchValue = string | number | boolean

export const isScratchValue = (value: unknown): value is ScratchValue => {
  return (
    typeof value == 'string' ||
    typeof value == 'number' ||
    typeof value == 'boolean'
  )
}

export type ScratchKey = UnionString<
  | 'space'
  | 'up arrow'
  | 'down arrow'
  | 'left arrow'
  | 'right arrow'
  | 'any'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
>
