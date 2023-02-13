import { Node, NodeKind, NodeOf } from '@/ast/Node'
import { Model, ModelList } from './interfaces'
import { NOM } from './NOM'
import { HasNomChildren } from './NomQuery'

export class NOMList extends HasNomChildren implements ModelList {
  constructor(private nodes: Model[] = []) {
    super()
  }

  children(): NOM[] {
    return this.nodes as NOM[]
  }

  get(index: number): NOM<Node> {
    return this.nodes[index] as NOM<Node>
  }

  removeIndex(index: number): void {
    this.nodes.splice(index, 1)
  }

  remove(model: Model): void {
    this.nodes = this.nodes.filter((m) => m !== model)
  }

  clear(): void {
    this.nodes = []
  }

  push(model: Model): void {
    this.nodes.push(model)
  }

  insertAt(index: number, model: Model): void {
    this.nodes.splice(index, 0, model)
  }

  insertBefore(legend: Model, model: Model): void {
    const index = this.nodes.indexOf(legend)
    this.nodes.splice(index, 0, model)
  }

  insertAfter(legend: Model, model: Model): void {
    const index = this.nodes.indexOf(legend)
    this.nodes.splice(index + 1, 0, model)
  }

  setChildrenParent(model: NOM<Node>): void {
    this.nodes.forEach((m) => {
      m.setParent(model)
    })
  }

  replaceNode(oldNOM: NOM, newNOM: NOM): void {
    this.nodes = this.nodes.map((model) => {
      if (model === oldNOM) {
        return newNOM
      }

      return model
    })
  }

  toNodeArray(): Node[] {
    const result: Node[] = []

    this.nodes.forEach((model) => {
      result.push(model.toNode())
    })

    return result
  }

  listByKind<K extends NodeKind>(kind: K): NOM<NodeOf<K>>[] {
    const result: NOM<NodeOf<K>>[] = []

    this.nodes.forEach((model) => {
      if (model.is(kind)) {
        result.push(model as NOM<NodeOf<K>>)
      }

      result.push(...(model.listByKind(kind) as NOM<NodeOf<K>>[]))
    })

    return result
  }
}
