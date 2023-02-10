import { Node, NodeKind, NodeOf } from '@/ast/Node'
import { NOM } from './NOM'
import { NOMHasParent } from './NOMHasParent'
import { NOMQuery } from './NOMQuery'

export class NOMList extends NOMHasParent implements NOMQuery {
  constructor(private readonly models: NOM<Node>[]) {
    super()
  }

  get(index: number): NOM<Node> {
    return this.models[index]
  }

  toNodeArray(): Node[] {
    return this.models.map((model) => model.toNode())
  }

  listByKind<K extends NodeKind>(kind: K): NOM<NodeOf<K>>[] {
    const list: NOM<NodeOf<K>>[] = []

    for (const model of this.models) {
      if (model.kind === kind) {
        list.push((model as unknown) as NOM<NodeOf<K>>)
      }

      list.push(...model.listByKind(kind))
    }

    return list
  }
}
