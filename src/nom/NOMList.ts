import { Node, NodeKind, NodeOf } from '@/ast/Node'
import { ModelList } from './interfaces'
import { NOM } from './NOM'

export class NOMList implements ModelList {
  constructor(private models: NOM[] = []) {}

  get(index: number): NOM<Node> {
    return this.models[index]
  }

  remove(index: number): void {
    this.models.splice(index, 1)
  }

  clear(): void {
    this.models = []
  }

  push(model: NOM): void {
    this.models.push(model)
  }

  insertAt(index: number, model: NOM): void {
    this.models.splice(index, 0, model)
  }

  insertBefore(legend: NOM, model: NOM): void {
    const index = this.models.indexOf(legend)
    this.models.splice(index, 0, model)
  }

  insertAfter(legend: NOM, model: NOM): void {
    const index = this.models.indexOf(legend)
    this.models.splice(index + 1, 0, model)
  }

  setChildrenParent(model: NOM<Node>): void {
    this.models.forEach((m) => {
      m.setParent(model)
    })
  }

  replaceModel(oldModel: NOM, newModel: NOM): void {
    this.models = this.models.map((model) => {
      if (model === oldModel) {
        return newModel
      }

      return model
    })
  }

  toNodeArray(): Node[] {
    const result: Node[] = []

    this.models.forEach((model) => {
      result.push(model.toNode())
    })

    return result
  }

  listByKind<K extends NodeKind>(kind: K): NOM<NodeOf<K>>[] {
    const result: NOM<NodeOf<K>>[] = []

    this.models.forEach((model) => {
      if (model.is(kind)) {
        result.push(model as NOM<NodeOf<K>>)
      }

      result.push(...(model.listByKind(kind) as NOM<NodeOf<K>>[]))
    })

    return result
  }
}
