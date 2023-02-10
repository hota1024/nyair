import { InputNode, InputNodeOf, Node, NodeKind, NodeOf } from '@/ast/Node'
import { NOMHasParent } from './NOMHasParent'
import { NOMList } from './NOMList'
import { NOMQuery } from './NOMQuery'

export class NOM<N extends Node = Node>
  extends NOMHasParent
  implements NOMQuery {
  private parentList?: NOMList
  protected children: (NOM | NOMList)[] = []

  constructor(public readonly kind: N['kind']) {
    super()
  }

  setParentList(parentList: NOMList): void {
    this.parentList = parentList
  }

  expectParentList(): NOMList {
    if (!this.parentList) {
      throw new Error('Parent list not set')
    }
    return this.parentList
  }

  toNode(): N {
    throw new Error('Not implemented')
  }

  listByKind<K extends NodeKind>(kind: K): NOM<NodeOf<K>>[] {
    const list: NOM<NodeOf<K>>[] = []

    for (const item of this.children) {
      if (item instanceof NOMList) {
        list.push(...item.listByKind(kind))
      } else if (item.kind === kind) {
        list.push(item as NOM<NodeOf<K>>)
      }
    }

    return list
  }
}

export type InputNOM<T extends InputNode = InputNode> = NOM<T>

// Decorators

// eslint-disable-next-line @typescript-eslint/ban-types
type NomClassType = Function & {
  kind: NodeKind
  fieldKeys: string[]
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const NomClass = <K extends NodeKind, N = NodeOf<K>>(
  kind: K,
  fieldKeys: (keyof N)[]
) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Function): void => {
    ;((target as unknown) as NomClassType).kind = kind
    ;((target as unknown) as NomClassType).fieldKeys = fieldKeys as string[]
  }
}

// export const NomField = <T extends NOM>(target: T, key: keyof T): void => {
//   ;(target['constructor'] as NomClass).fieldKeys.push(key as string)
// }

type NomClassBase<N extends Node, F = Omit<N, 'kind'>> = {
  [K in keyof F]: F[K] extends InputNodeOf<infer T>
    ? NOM<InputNodeOf<T>>
    : F[K] extends InputNode
    ? InputNOM
    : F[K] extends Node
    ? NOM<F[K]>
    : F[K] extends Node[]
    ? NOMList
    : F[K]
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createNomBase = <
  K extends NodeKind,
  N extends Node = NodeOf<K>,
  B = NomClassBase<N>
>(
  kind: K
) => {
  return (class extends NOM<N> {
    private fieldKeys: (keyof N)[] = []

    constructor(data: B) {
      super(kind)
      this.set(data)
    }

    set(data: B): void {
      Object.assign(this, data)
      this.fieldKeys = Object.keys(
        data as Record<string, unknown>
      ) as (keyof N)[]

      for (const value of Object.values(data as Record<string, unknown>)) {
        if (value instanceof NOM || value instanceof NOMList) {
          value.setParent(this)
          this.children.push(value)
        }
      }
    }

    replaceWith(model: NOM, newModel: NOM): void {
      for (const key of this.fieldKeys) {
        const value = this[key as keyof typeof this]

        if (value === model) {
          this[
            key as keyof typeof this
          ] = newModel as typeof this[keyof typeof this]
        }
      }

      this.children = this.children.map((m) => (m === model ? newModel : m))
    }

    toNode(): N {
      const node = {
        kind: this.kind,
      } as N
      const self = (this as unknown) as B

      for (const key of this.fieldKeys) {
        const value = self[key as keyof B]

        if (value instanceof NOM) {
          node[key] = value.toNode()
        } else if (value instanceof NOMList) {
          node[key] = (value.toNodeArray() as unknown) as N[keyof N]
        } else {
          node[key] = (value as unknown) as N[keyof N]
        }
      }

      return node
    }
  } as unknown) as { new (data: B): NOM<N> & B }
}
