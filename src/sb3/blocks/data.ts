import { UID } from '../UID'
import { BlockBase } from './BlockBase'
import { Input } from './Input'

/**
 * `[12, '{VARIABLE NAME}', {UID}, 0, 0]`
 */
export type BlockDataVariable = [12, string, UID, number, number]

export type BlockDataSetVariableTo = BlockBase & {
  opcode: 'data_setvariableto'
  inputs: {
    VALUE: Input
  }
  fields: {
    /**
     * `[{VARIABLE NAME}, {VARIABLE UID}]`
     */
    VARIABLE: [string, UID]
  }
}

export type BlockDataChangeVariableBy = BlockBase & {
  opcode: 'data_changevariableby'
  inputs: {
    VALUE: Input
  }
  fields: {
    /**
     * `[{VARIABLE NAME}, {VARIABLE UID}]`
     */
    VARIABLE: [string, UID]
  }
}

export type BlockDataShowVariable = BlockBase & {
  opcode: 'data_showvariable'
  fields: {
    /**
     * `[{VARIABLE NAME}, {VARIABLE UID}]`
     */
    VARIABLE: [string, UID]
  }
}

export type BlockDataHideVariable = BlockBase & {
  opcode: 'data_hidevariable'
  fields: {
    /**
     * `[{VARIABLE NAME}, {VARIABLE UID}]`
     */
    VARIABLE: [string, UID]
  }
}

/**
 * `[13, '{LIST NAME}', {UID}, 0, 0]`
 */
export type BlockDataList = BlockBase & [13, string, UID, number, number]

export type BlockDataAddToList = BlockBase & {
  opcode: 'data_addtolist'
  inputs: {
    ITEM: Input
  }
  fields: {
    /**
     * `[{LIST NAME}, {LIST UID}]`
     */
    LIST: [string, UID]
  }
}

export type BlockDataDeleteOfList = BlockBase & {
  opcode: 'data_deleteoflist'
  fields: {
    /**
     * `[{LIST NAME}, {LIST UID}]`
     */
    LIST: [string, UID]
  }
}

export type BlockDataDeleteAllOfList = BlockBase & {
  opcode: 'data_deletealloflist'
  inputs: {
    INDEX: Input
  }
  fields: {
    /**
     * `[{LIST NAME}, {LIST UID}]`
     */
    LIST: [string, UID]
  }
}

export type BlockDataInsertAtList = BlockBase & {
  opcode: 'data_insertatlist'
  inputs: {
    INDEX: Input
    ITEM: Input
  }
  fields: {
    /**
     * `[{LIST NAME}, {LIST UID}]`
     */
    LIST: [string, UID]
  }
}

export type BlockDataReplaceItemOfList = BlockBase & {
  opcode: 'data_replaceitemoflist'
  inputs: {
    INDEX: Input
    ITEM: Input
  }
  fields: {
    /**
     * `[{LIST NAME}, {LIST UID}]`
     */
    LIST: [string, UID]
  }
}

export type BlockDataItemOfList = BlockBase & {
  opcode: 'data_itemoflist'
  inputs: {
    INDEX: Input
  }
  fields: {
    /**
     * `[{LIST NAME}, {LIST UID}]`
     */
    LIST: [string, UID]
  }
}

export type BlockDataItemNumOfList = BlockBase & {
  opcode: 'data_itemnumoflist'
  inputs: {
    ITEM: Input
  }
  fields: {
    /**
     * `[{LIST NAME}, {LIST UID}]`
     */
    LIST: [string, UID]
  }
}

export type BlockDataLengthOfList = BlockBase & {
  opcode: 'data_lengthoflist'
  fields: {
    /**
     * `[{LIST NAME}, {LIST UID}]`
     */
    LIST: [string, UID]
  }
}

export type BlockDataListContainsItem = BlockBase & {
  opcode: 'data_listcontainsitem'
  inputs: {
    ITEM: Input
  }
  fields: {
    /**
     * `[{LIST NAME}, {LIST UID}]`
     */
    LIST: [string, UID]
  }
}

export type BlockDataShowList = BlockBase & {
  opcode: 'data_showlist'
  fields: {
    /**
     * `[{LIST NAME}, {LIST UID}]`
     */
    LIST: [string, UID]
  }
}

export type BlockDataHideList = BlockBase & {
  opcode: 'data_hidelist'
  fields: {
    /**
     * `[{LIST NAME}, {LIST UID}]`
     */
    LIST: [string, UID]
  }
}

export type BlockData =
  | BlockDataSetVariableTo
  | BlockDataChangeVariableBy
  | BlockDataShowVariable
  | BlockDataHideVariable
  | BlockDataAddToList
  | BlockDataDeleteOfList
  | BlockDataDeleteAllOfList
  | BlockDataInsertAtList
  | BlockDataReplaceItemOfList
  | BlockDataItemOfList
  | BlockDataItemNumOfList
  | BlockDataLengthOfList
  | BlockDataListContainsItem
  | BlockDataShowList
  | BlockDataHideList
