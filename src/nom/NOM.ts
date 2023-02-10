import { InputNodeOf, Node, NodeFields, NodeKind, NodeOf } from '@/ast/Node'
import { Model, ModelizeFields, ModelList } from './interfaces'
import { NOMList } from './NOMList'
import { HasNomChildren } from './NomQuery'

class NomBase<N extends Node, F extends ModelizeFields<N> = ModelizeFields<N>>
  extends HasNomChildren
  implements Model<N> {
  readonly kind: N['kind']

  private fieldKeys: (keyof F)[] = []
  private parentModel: Model | null = null
  private _children: Model[] = []

  constructor(kind: N['kind']) {
    super()
    this.kind = kind
  }

  children() {
    return this._children as NOM[]
  }

  private updateChildren() {
    this._children = []

    this.forEachFields((name, field) => {
      if (field instanceof NomBase) {
        this._children.push(field.typeAsGenericNom())
      } else if (field instanceof NOMList) {
        this._children.push(...field.children())
      }
    })
  }

  set(fields: F): void {
    const { self } = this

    this.fieldKeys = Object.keys(fields) as (keyof F)[]

    this.forEachFields((name) => {
      const field = fields[name]
      self[name] = field

      if (field instanceof NomBase) {
        field.setParent(this.typeAsGenericNom())
      } else if (field instanceof NOMList) {
        field.setChildrenParent(this.typeAsGenericNom())
      }
    })
    this.updateChildren()
  }

  replaceFieldModel(oldField: NOM, newField: NOM): void {
    newField.setParent(this.typeAsGenericNom())

    this.forEachFields((name, field) => {
      if (field instanceof NomBase && field === oldField) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.self[name] = newField as any
      } else if (field instanceof NOMList) {
        field.replaceNode(oldField, newField)
      }
    })
    this.updateChildren()
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

  in<K extends NodeKind>(kind: K[]): this is NOM<NodeOf<K>> {
    return kind.includes(this.kind as K)
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

  private typeAsGenericNom(): NOM {
    return (this as unknown) as NOM
  }
}

export type NomFields<
  N extends Node,
  F extends NodeFields<N> = NodeFields<N>
> = {
  [K in keyof F]: F[K] extends InputNodeOf<infer T>
    ? NOM<InputNodeOf<T>>
    : F[K] extends Node
    ? NOM<F[K]>
    : F[K] extends Node[]
    ? ModelList
    : F[K]
}

export type NOM<N extends Node = Node> = NomBase<N> & NomFields<N>
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
