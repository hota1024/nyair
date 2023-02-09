import { ProjectMeta } from './ProjectMeta'
import { Target } from './Target'

/**
 * ProjectJson type.
 */
export type ProjectJson = {
  targets: Target[]
  monitors: unknown[]
  extensions: string[]
  meta: ProjectMeta
}
