import { InputNodeOf, Node, NodeFields, NodeKind, NodeOf } from '@/ast/Node'
import { NOM } from './NOM'

export type ModelizeFields<
  N extends Node,
  F extends NodeFields<N> = NodeFields<N>
> = {
  [K in keyof F]: F[K] extends InputNodeOf<infer T>
    ? Model<InputNodeOf<T>>
    : F[K] extends Node
    ? Model<F[K]>
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
  removeIndex(index: number): void

  /**
   * remove a model.
   *
   * @param model model.
   */
  remove(model: Model): void

  /**
   * remove all models.
   */
  clear(): void

  /**
   * push a model.
   *
   * @param model model.
   */
  push(model: Model): void

  /**
   * insert a model at the specified index.
   *
   * @param index index.
   * @param model model.
   */
  insertAt(index: number, model: Model): void

  /**
   * insert a model at before the specified legend model.
   *
   * @param legend legend model.
   * @param model model to insert.
   */
  insertBefore(legend: Model, model: Model): void

  /**
   * insert a model at after the specified legend model.
   *
   * @param legend legend model.
   * @param model model to insert.
   */
  insertAfter(legend: Model, model: Model): void

  /**
   * set parent model of children.
   *
   * @param model parent model.
   */
  setChildrenParent(model: Model): void

  /**
   * replace a model.
   *
   * @param oldModel old model.
   * @param newModel new model.
   */
  replaceNode(oldModel: Model, newModel: Model): void

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
  replaceFieldModel(oldField: Model, newField: Model): void

  /**
   * replace this model with the specified model.
   *
   * **this method is only avaiable if it has a parent**
   *
   * @param model new model.
   */
  replaceWith(model: Model): void

  /**
   * returns a node.
   */
  toNode(): N

  /**
   * set parent model.
   *
   * @param model parent model.
   */
  setParent(model: Model): void

  /**
   * returns a parent model.
   */
  parent(): Model | null

  /**
   * returns whether the model is the specified kind.
   *
   * @param kind kind.
   */
  is<K extends NodeKind>(kind: K): this is NOM<NodeOf<K>>

  /**
   * returns whether the model is the specified kind.
   *
   * @param kind kind.
   */
  in<K extends NodeKind>(kind: K[]): this is NOM<NodeOf<K>>
}
