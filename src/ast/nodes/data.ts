import { InputNode } from '../Node'
import { NodeBase } from '../NodeBase'

export type NodeDataVariable = NodeBase & {
  kind: '$data_variable'
  variable: string
}

export type NodeDataSetVariable = NodeBase & {
  kind: 'data_setvariableto'
  value: InputNode
  variable: string
}

export type NodeDataChangeVariableBy = NodeBase & {
  kind: 'data_changevariableby'
  value: InputNode
  variable: string
}

export type NodeDataShowVariable = NodeBase & {
  kind: 'data_showvariable'
  variable: string
}

export type NodeDataHideVariable = NodeBase & {
  kind: 'data_hidevariable'
  variable: string
}

export type NodeDataList = NodeBase & {
  kind: '$data_list'
  list: string
}

export type NodeDataAddToList = NodeBase & {
  kind: 'data_addtolist'
  item: InputNode
  list: string
}

export type NodeDataDeleteOfList = NodeBase & {
  kind: 'data_deleteoflist'
  index: InputNode
  list: string
}

export type NodeDataInsertAtList = NodeBase & {
  kind: 'data_insertatlist'
  index: InputNode
  item: InputNode
  list: string
}

export type NodeDataReplaceItemOfList = NodeBase & {
  kind: 'data_replaceitemoflist'
  index: InputNode
  item: InputNode
  list: string
}

export type NodeDataItemOfList = NodeBase & {
  kind: 'data_itemoflist'
  index: InputNode
  list: string
}

export type NodeDataItemNumOfList = NodeBase & {
  kind: 'data_itemnumoflist'
  item: InputNode
  list: string
}

export type NodeDataLengthOfList = NodeBase & {
  kind: 'data_lengthoflist'
  list: string
}

export type NodeDataListContainsItem = NodeBase & {
  kind: 'data_listcontainsitem'
  item: InputNode
  list: string
}

export type NodeDataShowList = NodeBase & {
  kind: 'data_showlist'
  list: string
}

export type NodeDataHideList = NodeBase & {
  kind: 'data_hidelist'
  list: string
}

export type NodeData =
  | NodeDataVariable
  | NodeDataSetVariable
  | NodeDataChangeVariableBy
  | NodeDataShowVariable
  | NodeDataHideVariable
  | NodeDataList
  | NodeDataAddToList
  | NodeDataDeleteOfList
  | NodeDataInsertAtList
  | NodeDataReplaceItemOfList
  | NodeDataItemOfList
  | NodeDataItemNumOfList
  | NodeDataLengthOfList
  | NodeDataListContainsItem
  | NodeDataShowList
  | NodeDataHideList
