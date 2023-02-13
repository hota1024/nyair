import { Nyair } from '@/ast/Nayir'

/**
 * Transformer interface.
 */
export interface Transformer {
  transform(project: Nyair): Promise<void>

  getName(): string

  getDescription(): string
}

export abstract class BaseTransformer implements Transformer {
  abstract transform(project: Nyair): Promise<void>
  abstract getName(): string
  abstract getDescription(): string
}
