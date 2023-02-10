import { InputNodeOf, Node, NodeFields, NodeKind, NodeOf } from '@/ast/Node'
import { NOM } from './NOM'

export type ModelizeFields<
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

export interface HasModelQuery {
  listByKind<K extends NodeKind>(kind: K): NOM<NodeOf<K>>[]
}

export interface ModelList extends HasModelQuery {
  /**
   * returns a model at the specified index.
   *
   * @param index index.
   */
  get(index: number): Model

  /**
   * remove a model at the specified index.
   *
   * @param index index.
   */
  remove(index: number): void

  /**
   * remove all models.
   */
  clear(): void

  /**
   * push a model.
   *
   * @param model model.
   */
  push(model: NOM): void

  /**
   * insert a model at the specified index.
   *
   * @param index index.
   * @param model model.
   */
  insertAt(index: number, model: NOM): void

  /**
   * insert a model at before the specified legend model.
   *
   * @param legend legend model.
   * @param model model to insert.
   */
  insertBefore(legend: NOM, model: NOM): void

  /**
   * insert a model at after the specified legend model.
   *
   * @param legend legend model.
   * @param model model to insert.
   */
  insertAfter(legend: NOM, model: NOM): void

  /**
   * set parent model of children.
   *
   * @param model parent model.
   */
  setChildrenParent(model: NOM): void

  /**
   * replace a model.
   *
   * @param oldModel old model.
   * @param newModel new model.
   */
  replaceModel(oldModel: NOM, newModel: NOM): void

  /**
   * returns a node array.
   */
  toNodeArray(): Node[]
}

export interface Model<N extends Node = Node> extends HasModelQuery {
  /**
   * kind of node.
   */
  readonly kind: N['kind']

  /**
   * set fields.
   *
   * @param fields fields.
   */
  set(fields: ModelizeFields<N>): void

  /**
   * replace a field.
   *
   * @param oldField old field model.
   * @param newField new field model.
   */
  replaceFieldModel(oldField: NOM, newField: NOM): void

  /**
   * replace this model with the specified model.
   *
   * **this method is only avaiable if it has a parent**
   *
   * @param model new model.
   */
  replaceWith(model: NOM): void

  /**
   * returns a node.
   */
  toNode(): N

  /**
   * set parent model.
   *
   * @param model parent model.
   */
  setParent(model: NOM): void

  /**
   * returns a parent model.
   */
  parent(): NOM | null

  /**
   * returns whether the model is the specified kind.
   *
   * @param kind kind.
   */
  is<K extends NodeKind>(kind: K): this is NOM<NodeOf<K>>
}
