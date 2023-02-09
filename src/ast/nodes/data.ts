import { InputNode } from '../Node'
import { NodeBase } from '../NodeBase'

export type DataVariable = NodeBase & {
  kind: '$data_variable'
  variable: string
}

export type DataSetVariable = NodeBase & {
  kind: 'data_setvariableto'
  value: InputNode
  variable: string
}

export type DataChangeVariableBy = NodeBase & {
  kind: 'data_changevariableby'
  value: InputNode
  variable: string
}

export type DataShowVariable = NodeBase & {
  kind: 'data_showvariable'
  variable: string
}

export type DataHideVariable = NodeBase & {
  kind: 'data_hidevariable'
  variable: string
}

export type DataList = NodeBase & {
  kind: '$data_list'
  list: string
}

export type DataAddToList = NodeBase & {
  kind: 'data_addtolist'
  item: InputNode
  list: string
}

export type DataDeleteOfList = NodeBase & {
  kind: 'data_deleteoflist'
  index: InputNode
  list: string
}

export type DataInsertAtList = NodeBase & {
  kind: 'data_insertatlist'
  index: InputNode
  item: InputNode
  list: string
}

export type DataReplaceItemOfList = NodeBase & {
  kind: 'data_replaceitemoflist'
  index: InputNode
  item: InputNode
  list: string
}

export type DataItemOfList = NodeBase & {
  kind: 'data_itemoflist'
  index: InputNode
  list: string
}

export type DataItemNumOfList = NodeBase & {
  kind: 'data_itemnumoflist'
  item: InputNode
  list: string
}

export type DataLengthOfList = NodeBase & {
  kind: 'data_lengthoflist'
  list: string
}

export type DataListContainsItem = NodeBase & {
  kind: 'data_listcontainsitem'
  item: InputNode
  list: string
}

export type DataShowList = NodeBase & {
  kind: 'data_showlist'
  list: string
}

export type DataHideList = NodeBase & {
  kind: 'data_hidelist'
  list: string
}

export type NodeData =
  | DataVariable
  | DataSetVariable
  | DataChangeVariableBy
  | DataShowVariable
  | DataHideVariable
  | DataList
  | DataAddToList
  | DataDeleteOfList
  | DataInsertAtList
  | DataReplaceItemOfList
  | DataItemOfList
  | DataItemNumOfList
  | DataLengthOfList
  | DataListContainsItem
  | DataShowList
  | DataHideList
