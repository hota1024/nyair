import { NodeKind, NodeOf } from '@/ast/Node'
import { NOM } from './NOM'

/**
 * NOMQuery interface.
 */
export interface NOMQuery {
  listByKind<K extends NodeKind>(kind: K): NOM<NodeOf<K>>[]
}
