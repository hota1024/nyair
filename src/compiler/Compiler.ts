import { Nyair } from '@/ast/Nayir'
import { ProjectJson } from '@/sb3/ProjectJson'

/**
 * Compiler interface.
 */
export interface Compiler {
  compile(source: Nyair): ProjectJson
}
