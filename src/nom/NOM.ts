import { Node, NodeKind, NodeOf } from '@/ast/Node'
import { Model, ModelizeFields } from './interfaces'
import { NOMList } from './NOMList'

class NomBase<N extends Node, F extends ModelizeFields<N> = ModelizeFields<N>>
  implements Model<N> {
  readonly kind: N['kind']

  private fieldKeys: (keyof F)[] = []
  private parentModel: Model | null = null

  constructor(kind: N['kind']) {
    this.kind = kind
  }

  set(fields: F): void {
    const { self } = this

    this.fieldKeys = Object.keys(fields) as (keyof F)[]

    this.forEachFields((name) => {
      const field = fields[name]
      self[name] = field

      if (field instanceof NomBase) {
        field.setParent(this)
      } else if (field instanceof NOMList) {
        field.setChildrenParent(this)
      }
    })
  }

  replaceFieldModel(oldField: Model, newField: Model): void {
    newField.setParent(this)

    this.forEachFields((name, field) => {
      if (field instanceof NomBase && field === oldField) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.self[name] = newField as any
      } else if (field instanceof NOMList) {
        field.replaceModel(oldField, newField)
      }
    })
  }

  replaceWith(model: Model): void {
    const parent = this.parent()

    if (!parent) {
      throw new Error('NomBase#replaceWith is avaiable only if it has a parent')
    }

    parent.replaceFieldModel(this, model)
  }

  toNode(): N {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const node: any = {
      kind: this.kind,
    }

    this.forEachFields((name, field) => {
      if (field instanceof NomBase) {
        node[name] = field.toNode()
      } else if (field instanceof NOMList) {
        node[name] = field.toNodeArray()
      } else {
        node[name] = field
      }
    })

    return node as N
  }

  setParent(model: Model): void {
    this.parentModel = model
  }

  parent(): Model | null {
    return this.parentModel
  }

  is<K extends NodeKind>(kind: K): this is NOM<NodeOf<K>> {
    return this.kind === kind
  }

  listByKind<K extends NodeKind>(kind: K): NOM<NodeOf<K>>[] {
    const result: NOM<NodeOf<K>>[] = []

    this.forEachFields((_, field) => {
      if (field instanceof NomBase && field.is(kind)) {
        result.push(field)
      } else if (field instanceof NOMList) {
        result.push(...(field.listByKind(kind) as NOM<NodeOf<K>>[]))
      }
    })

    return result
  }

  private forEachFields(callback: (name: keyof F, field: F[keyof F]) => void) {
    this.fieldKeys.forEach((key) => {
      callback(key, this.self[key])
    })
  }

  private get self(): F {
    return (this as unknown) as F
  }
}

export type NOM<N extends Node = Node> = NomBase<N> & ModelizeFields<N>
export type NOMConstructor<N extends Node = Node> = new (
  fields: ModelizeFields<N>
) => NOM<N>

export const createNomClass = <
  K extends NodeKind,
  N extends Node = NodeOf<K>,
  F extends ModelizeFields<N> = ModelizeFields<N>
>(
  kind: K
): NOMConstructor<N> => {
  const c = (class extends NomBase<N> {
    constructor(fields: F) {
      super(kind)
      this.set(fields)
    }
  } as unknown) as NOMConstructor<N>

  Object.defineProperty(c, 'name', { value: kind })

  return c
}
