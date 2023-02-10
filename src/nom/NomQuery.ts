import { NOM } from './NOM'

export type NomQueryFn = (node: NOM) => boolean

export abstract class HasNomChildren {
  queryFn(fn: NomQueryFn): NOM | undefined {
    for (const child of this.children()) {
      if (fn(child)) {
        return child
      }

      const result = child.queryFn(fn)
      if (result) {
        return result
      }
    }
  }

  queryFnAll(fn: NomQueryFn): NOM[] {
    const result: NOM[] = []

    for (const child of this.children()) {
      if (fn(child)) {
        result.push(child)
      } else {
        result.push(...child.queryFnAll(fn))
      }
    }

    return result
  }

  /**
   * returns the children of this node.
   */
  abstract children(): NOM[]
}
