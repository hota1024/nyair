import {
  List,
  Nyair,
  Stage,
  Variable,
  Target as NyairTarget,
} from '@/ast/Nayir'
import { InputNode, Node } from '@/ast/Node'
import { Block, Blocks } from '@/sb3/Blocks'
import { Input } from '@/sb3/blocks/Input'
import { Lists } from '@/sb3/Lists'
import { ProjectJson } from '@/sb3/ProjectJson'
import { isScratchValue } from '@/sb3/ScratchValue'
import { Target } from '@/sb3/Target'
import { UID } from '@/sb3/UID'
import { Variables } from '@/sb3/Variables'
import { createUID } from '@/uid'
import { Compiler } from './Compiler'

class SymbolTable {
  private table = new Map<string, UID>()

  add(name: string, uid: UID) {
    this.table.set(name, uid)
  }

  get(name: string): UID {
    const uid = this.table.get(name)

    if (!uid) {
      throw new Error(`Symbol ${name} not found.`)
    }

    return uid
  }
}

/**
 * NyairCompiler class.
 */
export class NyairCompiler implements Compiler {
  private readonly broadcastTable = new SymbolTable()

  compile(source: Nyair): ProjectJson {
    this.importBroadcastsFromTargets([source.stage, ...source.sprites])
    const stage = this.compileStage(source.stage)

    const json: Partial<ProjectJson> = {
      targets: [stage],
      monitors: [],
      extensions: source.extensions,
      meta: {
        semver: '3.0.0',
        vm: '0.2.0-prerelease.20211103090905',
        agent:
          'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Scratch/3.27.0 Chrome/80.0.3987.165 Electron/8.2.5 Safari/537.36',
      },
    }

    return json as ProjectJson
  }

  private importBroadcastsFromTargets(targets: NyairTarget[]): void {
    targets.forEach((target) => {
      this.importBroadcastsFromNodes(target.blocks)
    })
  }

  private importBroadcastsFromNodes(nodes: Node[]) {
    nodes.forEach((node) => {
      if (node.kind === 'event_whenbroadcastreceived') {
        this.broadcastTable.add(node.broadcast, createUID())
      } else if (
        node.kind === 'event_broadcast' ||
        node.kind === 'event_broadcastandwait'
      ) {
        if (
          !isScratchValue(node.broadcast) &&
          node.broadcast.kind === '$literal_broadcast'
        ) {
          this.broadcastTable.add(node.broadcast.value, createUID())
        }
      }
    })
  }

  private compileStage(stage: Stage): Target {
    const { variables, variableTable } = this.compileVariables(stage.variables)
    const { lists, listTable } = this.compileLists(stage.lists)
    const blockCompiler = new BlockCompiler(
      variableTable,
      listTable,
      this.broadcastTable
    )

    const target: Target = {
      isStage: true,
      name: 'Stage',
      variables,
      lists,
      costumes: stage.costumes,
      sounds: [],
      blocks: blockCompiler.compile(stage.blocks),
      broadcasts: {},
      comments: {},
      volume: stage.volume,
      layerOrder: stage.layerOrder,
      currentCostume: stage.currentCostume,
      tempo: stage.tempo,
      videoState: stage.videoState,
      videoTransparency: stage.videoTransparency,
      textToSpeechLanguage: stage.textToSpeechLanguage,
    }

    return target
  }

  private compileVariables(
    variables: Variable[]
  ): { variables: Variables; variableTable: SymbolTable } {
    const table = new SymbolTable()
    variables.forEach((v) => table.add(v.name, createUID()))

    return {
      variables: variables.reduce(
        (p, v) => ({ ...p, [table.get(v.name)]: [v.name, v.initialValue] }),
        {} as Variables
      ),
      variableTable: table,
    }
  }

  private compileLists(
    lists: List[]
  ): { lists: Lists; listTable: SymbolTable } {
    const table = new SymbolTable()
    lists.forEach((v) => table.add(v.name, createUID()))

    return {
      lists: lists.reduce(
        (p, v) => ({ ...p, [createUID()]: [v.name, v.initialValue] }),
        {} as Lists
      ),
      listTable: table,
    }
  }
}

type BlockEntry = [UID, Block]

type Procedure = {
  arguments: UID[]
  warp: boolean
}

class ProcedureTable {
  private table = new Map<string, Procedure>()

  add(procCode: string, procedure: Procedure) {
    this.table.set(procCode, procedure)
  }

  get(procCode: string): Procedure {
    const procedure = this.table.get(procCode)

    if (!procedure) {
      throw new Error(`Procedure ${procCode} not found.`)
    }

    return procedure
  }
}

export class BlockCompiler {
  private blocks: Blocks = {}
  private procedureTable = new ProcedureTable()

  constructor(
    private readonly variableTable = new SymbolTable(),
    private readonly listTable = new SymbolTable(),
    private readonly broadcastTable = new SymbolTable()
  ) {}

  compile(nodes: Node[]): Blocks {
    this.blocks = {}

    for (const node of nodes) {
      this.compileNode(node)
    }

    return this.blocks
  }

  private hatBase() {
    return {
      shadow: false,
      topLevel: true,
      x: 0,
      y: 0,
    }
  }

  private setBlock(uid: UID, block: Partial<Block>): BlockEntry {
    const blockToSet = {
      parent: null,
      next: null,
      inputs: {},
      fields: {},
      ...block,
    } as Block
    Object.assign(this.blocks, {
      [uid]: blockToSet,
    })

    return [uid, blockToSet]
  }

  private addBlock(block: Partial<Block>): BlockEntry {
    return this.setBlock(createUID(), block)
  }

  private addBlockLazy(
    block: ({
      input,
      substack,
    }: {
      input(node: InputNode): Input
      substack(nodes: Node[]): Input
    }) => Partial<Block>
  ): BlockEntry {
    const id = createUID()
    return this.setBlock(
      id,
      block({
        input: (node) => this.compileInput(node, id),
        substack: (nodes) => {
          if (nodes.length === 0) {
            return [1, null]
          }

          const firstEntry = this.compileNode(nodes[0])
          this.addBlockChildren(firstEntry, nodes.slice(1))

          return [2, firstEntry[0]]
        },
      })
    )
  }

  private addBlockChildren([uid, block]: BlockEntry, children: Node[]): Block {
    let previousBlock: Block = block

    for (const child of children) {
      const [childId, childBlock] = this.compileNode(child)
      previousBlock.next = childId

      childBlock.parent = uid
      previousBlock = childBlock
    }

    return block
  }

  private compileNode(node: Node): BlockEntry {
    let entry: BlockEntry

    if (node.kind === 'event_whenflagclicked') {
      entry = this.addBlock({
        ...this.hatBase(),
        opcode: node.kind,
      })
      this.addBlockChildren(entry, node.body)
    } else if (node.kind === 'event_whenkeypressed') {
      entry = this.addBlock({
        ...this.hatBase(),
        opcode: node.kind,
        fields: {
          KEY_OPTION: [node.key, null],
        },
      })
      this.addBlockChildren(entry, node.body)
    } else if (node.kind === 'event_whenstageclicked') {
      entry = this.addBlock({
        ...this.hatBase(),
        opcode: node.kind,
      })
      this.addBlockChildren(entry, node.body)
    } else if (node.kind === 'event_whenthisspritecilcked') {
      entry = this.addBlock({
        ...this.hatBase(),
        opcode: node.kind,
      })
      this.addBlockChildren(entry, node.body)
    } else if (node.kind === 'event_whenbackdropswitchesto') {
      entry = this.addBlock({
        ...this.hatBase(),
        opcode: node.kind,
        fields: {
          BACKDROP: [node.backdrop, null],
        },
      })
      this.addBlockChildren(entry, node.body)
    } else if (node.kind === 'event_whengreaterthan') {
      entry = this.addBlockLazy(({ input }) => ({
        ...this.hatBase(),
        opcode: node.kind,
        inputs: {
          VALUE: input(node.value),
        },
        fields: {
          WHENGREATERTHANMENU: [node.target, null],
        },
      }))
      this.addBlockChildren(entry, node.body)
    } else if (node.kind === 'event_whenbroadcastreceived') {
      entry = this.addBlock({
        ...this.hatBase(),
        opcode: node.kind,
        fields: {
          BROADCAST_OPTION: [
            node.broadcast,
            this.broadcastTable.get(node.broadcast),
          ],
        },
      })
      this.addBlockChildren(entry, node.body)
    } else if (node.kind === 'event_broadcast') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          BROADCAST_INPUT: input(node.broadcast),
        },
      }))
    } else if (node.kind === 'event_broadcastandwait') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          BROADCAST_INPUT: input(node.broadcast),
        },
      }))
    } else if (node.kind === 'motion_movesteps') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          STEPS: input(node.steps),
        },
      }))
    } else if (
      node.kind === 'motion_turnright' ||
      node.kind === 'motion_turnleft'
    ) {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          DEGREES: input(node.degrees),
        },
      }))
    } else if (node.kind === 'motion_goto') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          TO: input(node.to),
        },
      }))
    } else if (node.kind === 'motion_gotoxy') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          X: input(node.x),
          Y: input(node.y),
        },
      }))
    } else if (node.kind === 'motion_glideto') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          SECS: input(node.secs),
          TO: input(node.to),
        },
      }))
    } else if (node.kind === 'motion_glidesecstoxy') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          SECS: input(node.secs),
          X: input(node.x),
          Y: input(node.y),
        },
      }))
    } else if (node.kind === 'motion_pointindirection') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          DIRECTION: input(node.direction),
        },
      }))
    } else if (node.kind === 'motion_pointtowards') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          TOWARDS: input(node.towards),
        },
      }))
    } else if (node.kind === 'motion_changexby') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          DX: input(node.dx),
        },
      }))
    } else if (node.kind === 'motion_setx') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          X: input(node.x),
        },
      }))
    } else if (node.kind === 'motion_changeyby') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          DY: input(node.dy),
        },
      }))
    } else if (node.kind === 'motion_sety') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          Y: input(node.y),
        },
      }))
    } else if (node.kind === 'motion_ifonedgebounce') {
      entry = this.addBlock({
        opcode: node.kind,
      })
    } else if (node.kind === 'motion_setrotationstyle') {
      entry = this.addBlock({
        opcode: node.kind,
        fields: {
          STYLE: [node.style, null],
        },
      })
    } else if (node.kind === 'control_wait') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          DURATION: input(node.duration),
        },
      }))
    } else if (node.kind === 'control_repeat') {
      entry = this.addBlockLazy(({ input, substack }) => ({
        opcode: node.kind,
        inputs: {
          TIMES: input(node.times),
          SUBSTACK: substack(node.substack),
        },
      }))
    } else if (node.kind === 'control_forever') {
      entry = this.addBlockLazy(({ substack }) => ({
        opcode: node.kind,
        inputs: {
          SUBSTACK: substack(node.substack),
        },
      }))
    } else if (node.kind === 'control_if') {
      entry = this.addBlockLazy(({ input, substack }) => ({
        opcode: node.kind,
        inputs: {
          CONDITION: input(node.condition),
          SUBSTACK: substack(node.substack),
        },
      }))
    } else if (node.kind === 'control_if_else') {
      entry = this.addBlockLazy(({ input, substack }) => ({
        opcode: node.kind,
        inputs: {
          CONDITION: input(node.condition),
          SUBSTACK: substack(node.substack1),
          SUBSTACK2: substack(node.substack2),
        },
      }))
    } else if (node.kind === 'control_wait_until') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          CONDITION: input(node.condition),
        },
      }))
    } else if (node.kind === 'control_repeat_until') {
      entry = this.addBlockLazy(({ input, substack }) => ({
        opcode: node.kind,
        inputs: {
          CONDITION: input(node.condition),
          SUBSTACK: substack(node.substack),
        },
      }))
    } else if (node.kind === 'control_stop') {
      entry = this.addBlock({
        opcode: node.kind,
        fields: {
          STOP_OPTION: [node.stopOption, null],
        },
        mutation: {
          tagName: 'mutation',
          children: [],
          hasnext:
            node.stopOption === 'other scripts in sprite' ? 'true' : 'false',
        },
      })
    } else if (node.kind === 'control_start_as_clone') {
      entry = this.addBlock({
        ...this.hatBase(),
        opcode: node.kind,
      })
      this.addBlockChildren(entry, node.body)
    } else if (node.kind === 'control_create_clone_of') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          CLONE_OPTION: input(node.cloneOption),
        },
      }))
    } else if (node.kind === 'control_delete_this_clone') {
      entry = this.addBlock({
        opcode: node.kind,
      })
    } else if (
      node.kind === 'data_setvariableto' ||
      node.kind === 'data_changevariableby'
    ) {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          VALUE: input(node.value),
        },
        fields: {
          VARIABLE: [node.variable, this.variableTable.get(node.variable)],
        },
      }))
    } else if (
      node.kind === 'data_showvariable' ||
      node.kind === 'data_hidevariable'
    ) {
      entry = this.addBlock({
        opcode: node.kind,
        fields: {
          VARIABLE: [node.variable, this.variableTable.get(node.variable)],
        },
      })
    } else if (node.kind === 'data_addtolist') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          ITEM: input(node.item),
        },
        fields: {
          LIST: [node.list, this.listTable.get(node.list)],
        },
      }))
    } else if (node.kind === 'data_deleteoflist') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          INDEX: input(node.index),
        },
        fields: {
          LIST: [node.list, this.listTable.get(node.list)],
        },
      }))
    } else if (node.kind === 'data_deletealloflist') {
      entry = this.addBlock({
        opcode: node.kind,
        fields: {
          LIST: [node.list, this.listTable.get(node.list)],
        },
      })
    } else if (node.kind === 'data_insertatlist') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          INDEX: input(node.index),
          ITEM: input(node.item),
        },
        fields: {
          LIST: [node.list, this.listTable.get(node.list)],
        },
      }))
    } else if (node.kind === 'data_replaceitemoflist') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          INDEX: input(node.index),
          ITEM: input(node.item),
        },
        fields: {
          LIST: [node.list, this.listTable.get(node.list)],
        },
      }))
    } else if (node.kind === 'data_showlist' || node.kind === 'data_hidelist') {
      entry = this.addBlock({
        opcode: node.kind,
        fields: {
          LIST: [node.list, this.listTable.get(node.list)],
        },
      })
    } else if (
      node.kind === 'looks_sayforsecs' ||
      node.kind === 'looks_thinkforsecs'
    ) {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          MESSAGE: input(node.message),
          SECS: input(node.secs),
        },
      }))
    } else if (node.kind === 'looks_say' || node.kind === 'looks_think') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          MESSAGE: input(node.message),
        },
      }))
    } else if (node.kind === 'looks_switchcostumeto') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          COSTUME: input(node.costume),
        },
      }))
    } else if (node.kind === 'looks_switchbackdropto') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          BACKDROP: input(node.backdrop),
        },
      }))
    } else if (
      node.kind === 'looks_nextcostume' ||
      node.kind === 'looks_nextbackdrop'
    ) {
      entry = this.addBlock({
        opcode: node.kind,
      })
    } else if (node.kind === 'looks_changesizeby') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          CHANGE: input(node.change),
        },
      }))
    } else if (node.kind === 'looks_setsizeto') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          SIZE: input(node.size),
        },
      }))
    } else if (node.kind === 'looks_changeeffectby') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          CHANGE: input(node.change),
        },
        fields: {
          EFFECT: [node.effect, null],
        },
      }))
    } else if (node.kind === 'looks_seteffectto') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          VALUE: input(node.value),
        },
        fields: {
          EFFECT: [node.effect, null],
        },
      }))
    } else if (
      node.kind === 'looks_cleargraphiceffects' ||
      node.kind === 'looks_hide' ||
      node.kind === 'looks_show'
    ) {
      entry = this.addBlock({ opcode: node.kind })
    } else if (node.kind === 'looks_gotofrontback') {
      entry = this.addBlock({
        opcode: node.kind,
        fields: {
          FRONT_BACK: [node.frontBack, null],
        },
      })
    } else if (node.kind === 'looks_goforwardbackwardlayers') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          NUM: input(node.num),
        },
        fields: {
          FORWARD_BACKWARD: [node.forwardBackward, null],
        },
      }))
    } else if (
      node.kind === 'pen_clear' ||
      node.kind === 'pen_stamp' ||
      node.kind === 'pen_penDown' ||
      node.kind === 'pen_penUp'
    ) {
      entry = this.addBlock({ opcode: node.kind })
    } else if (node.kind === 'pen_setPenColorToColor') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          COLOR: input(node.color),
        },
      }))
    } else if (
      node.kind === 'pen_changePenColorParamBy' ||
      node.kind === 'pen_setPenColorParamTo'
    ) {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          VALUE: input(node.value),
          COLOR_PARAM: input(node.colorParam),
        },
      }))
    } else if (
      node.kind === 'pen_changePenSizeBy' ||
      node.kind === 'pen_setPenSizeTo'
    ) {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          SIZE: input(node.size),
        },
      }))
    } else if (node.kind === 'sensing_askandwait') {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          QUESTION: input(node.question),
        },
      }))
    } else if (node.kind === 'sensing_setdragmode') {
      entry = this.addBlock({
        opcode: node.kind,
        fields: {
          DRAG_MODE: [node.dragMode, null],
        },
      })
    } else if (
      node.kind === 'sound_playuntildone' ||
      node.kind === 'sound_play'
    ) {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          SOUND_MENU: input(node.soundMenu),
        },
      }))
    } else if (
      node.kind === 'sound_stopallsounds' ||
      node.kind === 'sound_cleareffects'
    ) {
      entry = this.addBlock({ opcode: node.kind })
    } else if (
      node.kind === 'sound_changeeffectby' ||
      node.kind === 'sound_seteffectto'
    ) {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          VALUE: input(node.value),
        },
        fields: {
          EFFECT: [node.effect, null],
        },
      }))
    } else if (
      node.kind === 'sound_changevolumeby' ||
      node.kind === 'sound_setvolumeto'
    ) {
      entry = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          VOLUME: input(node.volume),
        },
      }))
    } else if (node.kind === 'procedures_definition') {
      entry = this.addBlockLazy(({ input }) => ({
        ...this.hatBase(),
        opcode: node.kind,
        inputs: {
          custom_block: input(node.customBlock),
        },
      }))

      this.addBlockChildren(entry, node.body)
    } else if (node.kind === 'procedures_call') {
      const proccode = node.procCode.join(' ')
      const procedure = this.procedureTable.get(proccode)

      entry = this.addBlockLazy(({ input }) => {
        const inputs = new Map<string, Input>()

        for (const [i, arg] of node.arguments.entries()) {
          inputs.set(procedure.arguments[i], input(arg))
        }
        return {
          opcode: node.kind,
          inputs: Object.fromEntries(inputs),
          mutation: {
            tagName: 'mutation',
            children: [],
            proccode,
            argumentids: `[${procedure.arguments
              .map((v) => `"${v}"`)
              .join(',')}]`,
            warp: `${procedure.warp}`,
          },
        }
      })
    } else {
      throw new Error(`not implemented yet: ${node.kind}`)
    }

    return entry
  }

  private compileInput(node: InputNode, parentId: string | null = null): Input {
    if (isScratchValue(node)) {
      if (typeof node === 'number') {
        return [1, [4, node.toString()]]
      }

      if (typeof node === 'boolean') {
        if (node) {
          const [id] = this.addBlock({
            opcode: 'operator_not',
          })

          return [1, id]
        } else {
          const [id] = this.addBlock({
            opcode: 'operator_and',
          })

          return [1, id]
        }
      }

      if (typeof node === 'string') {
        return [1, [10, node]]
      }

      throw new Error(`not implemented yet: ${typeof node}`)
    }

    if (node.kind === '$literal_number') {
      return [1, [4, node.value.toString()]]
    }

    if (node.kind === '$literal_string') {
      return [1, [10, node.value.toString()]]
    }

    if (node.kind === '$literal_boolean') {
      if (node.value) {
        const [id] = this.addBlock({
          opcode: 'operator_not',
        })

        return [1, id]
      } else {
        const [id] = this.addBlock({
          opcode: 'operator_and',
        })

        return [1, id]
      }
    }

    if (node.kind === '$literal_broadcast') {
      return [1, [11, node.value, this.broadcastTable.get(node.value)]]
    }

    if (node.kind === '$literal_color') {
      if (typeof node.value === 'number') {
        return [1, [9, `#${node.value.toString(16).padStart(6, '0')}`]]
      } else {
        return [1, [9, node.value]]
      }
    }

    if (node.kind === 'motion_goto_menu') {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
        shadow: node.$shadow ?? true,
        fields: {
          TO: [node.to, null],
        },
      })

      return [1, id]
    }

    if (node.kind === 'motion_glideto_menu') {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
        shadow: node.$shadow ?? true,
        fields: {
          TO: [node.to, null],
        },
      })

      return [1, id]
    }

    if (node.kind === 'motion_pointtowards_menu') {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
        shadow: node.$shadow ?? true,
        fields: {
          TOWARDS: [node.towards, null],
        },
      })

      return [1, id]
    }

    if (
      node.kind === 'motion_xposition' ||
      node.kind === 'motion_yposition' ||
      node.kind === 'motion_direction'
    ) {
      const [id] = this.addBlock({
        opcode: node.kind,
      })

      return [1, id]
    }

    if (
      node.kind === 'operator_add' ||
      node.kind === 'operator_subtract' ||
      node.kind === 'operator_multiply' ||
      node.kind === 'operator_divide' ||
      node.kind === 'operator_mod'
    ) {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          NUM1: input(node.num1),
          NUM2: input(node.num2),
        },
      }))

      return [1, id]
    }

    if (node.kind === 'operator_random') {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          FROM: input(node.from),
          TO: input(node.to),
        },
      }))

      return [1, id]
    }

    if (
      node.kind === 'operator_gt' ||
      node.kind === 'operator_lt' ||
      node.kind === 'operator_equals' ||
      node.kind === 'operator_and' ||
      node.kind === 'operator_or'
    ) {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          OPERAND1: input(node.operand1),
          OPERAND2: input(node.operand2),
        },
      }))

      return [1, id]
    }

    if (node.kind === 'operator_not') {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          OPERAND: input(node.operand),
        },
      }))
      return [1, id]
    }

    if (node.kind === 'operator_join') {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          STRING1: input(node.string1),
          STRING2: input(node.string2),
        },
      }))

      return [1, id]
    }

    if (node.kind === 'operator_letter_of') {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          LETTER: input(node.letter),
          STRING: input(node.string),
        },
      }))

      return [1, id]
    }

    if (node.kind === 'operator_length') {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          STRING: input(node.string),
        },
      }))

      return [1, id]
    }

    if (node.kind === 'operator_contains') {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          STRING1: input(node.string1),
          STRING2: input(node.string2),
        },
      }))

      return [1, id]
    }

    if (node.kind === 'operator_round') {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          NUM: input(node.num),
        },
      }))

      return [1, id]
    }

    if (node.kind === 'operator_mathop') {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        fields: {
          OPERATOR: [node.operator, null],
        },
        inputs: {
          NUM: input(node.num),
        },
      }))

      return [1, id]
    }

    if (node.kind === 'control_create_clone_of_menu') {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
        shadow: node.$shadow ?? true,
        fields: {
          CLONE_OPTION: [node.cloneOption, null],
        },
      })

      return [1, id]
    }

    if (node.kind === '$data_variable') {
      return [
        3,
        [12, node.variable, this.variableTable.get(node.variable)],
        [10, ''],
      ]
    }

    if (node.kind === '$data_list') {
      return [3, [13, node.list, this.listTable.get(node.list)], [10, '']]
    }

    if (node.kind === 'data_itemoflist') {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          INDEX: input(node.index),
        },
        fields: {
          LIST: [node.list, this.listTable.get(node.list)],
        },
      }))
      return [3, id, [10, '']]
    }

    if (node.kind === 'data_itemnumoflist') {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          ITEM: input(node.item),
        },
        fields: {
          LIST: [node.list, this.listTable.get(node.list)],
        },
      }))
      return [3, id, [10, '']]
    }

    if (node.kind === 'data_lengthoflist') {
      const [id] = this.addBlock({
        opcode: node.kind,
        fields: {
          LIST: [node.list, this.listTable.get(node.list)],
        },
      })
      return [3, id, [10, '']]
    }

    if (node.kind === 'data_listcontainsitem') {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          ITEM: input(node.item),
        },
        fields: {
          LIST: [node.list, this.listTable.get(node.list)],
        },
      }))
      return [3, id, [10, '']]
    }

    if (node.kind === 'looks_costume') {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
        fields: {
          COSTUME: [node.costume, null],
        },
      })

      return [3, id, [10, '']]
    }

    if (node.kind === 'looks_backdrops') {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
        fields: {
          BACKDROP: [node.backdrop, null],
        },
      })

      return [3, id, [10, '']]
    }

    if (
      node.kind === 'looks_costumenumbername' ||
      node.kind === 'looks_backdropnumbername'
    ) {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
        fields: {
          NUMBER_NAME: [node.numberName, null],
        },
      })

      return [3, id, [10, '']]
    }

    if (node.kind === 'looks_size') {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
      })

      return [3, id, [10, '']]
    }

    if (node.kind === 'pen_menu_colorParam') {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
        shadow: node.$shadow ?? true,
        fields: {
          colorParam: [node.colorParam, null],
        },
      })

      return [1, id]
    }

    if (node.kind === 'sensing_touchingobject') {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          TOUCHINGOBJECTMENU: input(node.touchingObjectMenu),
        },
      }))

      return [1, id]
    }

    if (node.kind === 'sensing_touchingobjectmenu') {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
        shadow: node.$shadow ?? true,
        fields: {
          TOUCHINGOBJECTMENU: [node.touchingObjectMenu, null],
        },
      })

      return [1, id]
    }

    if (node.kind === 'sensing_touchingcolor') {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          COLOR: input(node.color),
        },
      }))

      return [1, id]
    }

    if (node.kind === 'sensing_coloristouchingcolor') {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          COLOR: input(node.color),
          COLOR2: input(node.color2),
        },
      }))
      return [1, id]
    }

    if (node.kind === 'sensing_distanceto') {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          DISTANCETOMENU: input(node.distanceToMenu),
        },
      }))

      return [1, id]
    }

    if (node.kind === 'sensing_distancetomenu') {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
        shadow: node.$shadow ?? true,
        fields: {
          DISTANCETOMENU: [node.distanceToMenu, null],
        },
      })

      return [1, id]
    }

    if (node.kind === 'sensing_answer') {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
      })

      return [1, id]
    }

    if (node.kind === 'sensing_keypressed') {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          KEY_OPTION: input(node.keyOption),
        },
      }))

      return [1, id]
    }

    if (node.kind === 'sensing_keyoptions') {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
        shadow: node.$shadow ?? true,
        fields: {
          KEY_OPTION: [node.keyOption, null],
        },
      })

      return [1, id]
    }

    if (node.kind === 'sensing_mousedown') {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
      })

      return [1, id]
    }

    if (
      node.kind === 'sensing_mousex' ||
      node.kind === 'sensing_mousey' ||
      node.kind === 'sensing_loudness' ||
      node.kind === 'sensing_timer' ||
      node.kind === 'sensing_dayssince2000' ||
      node.kind === 'sensing_username'
    ) {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
      })

      return [3, id, [10, '']]
    }

    if (node.kind === 'sensing_of') {
      const [id] = this.addBlockLazy(({ input }) => ({
        opcode: node.kind,
        inputs: {
          OBJECT: input(node.object),
        },
        fields: {
          PROPERTY: [node.property, null],
        },
      }))

      return [3, id, [10, '']]
    }

    if (node.kind === 'sensing_of_object_menu') {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
        shadow: node.$shadow ?? true,
        fields: {
          OBJECT: [node.object, null],
        },
      })

      return [1, id]
    }

    if (node.kind === 'sensing_current') {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
        fields: {
          CURRENTMENU: [node.currentMenu, null],
        },
      })

      return [3, id, [10, '']]
    }

    if (node.kind === 'sound_sounds_menu') {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
        shadow: node.$shadow ?? true,
        fields: {
          SOUND_MENU: [node.soundMenu, null],
        },
      })

      return [1, id]
    }

    if (node.kind === 'sound_volume') {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
      })

      return [3, id, [10, '']]
    }

    if (
      node.kind === 'argument_reporter_string_number' ||
      node.kind === 'argument_reporter_boolean'
    ) {
      const [id] = this.addBlock({
        opcode: node.kind,
        parent: parentId,
        fields: {
          VALUE: [node.name, null],
        },
      })

      return [1, id]
    }

    if (node.kind === 'procedures_prototype') {
      const [id] = this.addBlockLazy(({ input }) => {
        const args = new Map<string, Input>()
        const argumentIds: string[] = []
        const argumentNames: string[] = []

        for (const arg of node.arguments) {
          if (
            typeof arg !== 'object' ||
            (arg.kind !== 'argument_reporter_string_number' &&
              arg.kind !== 'argument_reporter_boolean')
          ) {
            throw new Error('invalid prototype argument')
          }

          const id = createUID()
          argumentIds.push(id)
          argumentNames.push(arg.name)
          args.set(id, input(arg))
        }

        const proccode = node.procCode.join(' ')
        this.procedureTable.add(proccode, {
          arguments: argumentIds,
          warp: node.warp,
        })

        return {
          opcode: node.kind,
          parent: parentId,
          inputs: Object.fromEntries(args),
          shadow: node.$shadow ?? true,
          mutation: {
            tagName: 'mutation',
            children: [],
            proccode,
            argumentids: `[${argumentIds.map((v) => `"${v}"`).join(',')}]`,
            argumentnames: `[${argumentNames.map((v) => `"${v}"`).join(',')}]`,
            argumentdefaults: `[${node.argumentDefaults
              .map((v) => `"${v}"`)
              .join(',')}]`,
            warp: node.warp ? 'true' : 'false',
          },
        }
      })

      return [1, id]
    }

    throw new Error(`not implemented yet: ${node.kind}`)
  }
}
