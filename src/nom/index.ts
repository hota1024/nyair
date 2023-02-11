import { Node, NodeKind, NodeOf } from '@/ast/Node'
import {
  Node$LiteralBoolean,
  Node$LiteralNumber,
  Node$LiteralString,
} from '@/ast/nodes/literals'
import { ScratchValue } from '@/sb3/ScratchValue'
import { Model, ModelizeFields } from './interfaces'
import { createNomClass, NOM, NOMConstructor } from './NOM'
import { NOMList } from './NOMList'

const KIND_NOM_MAP = new Map<NodeKind, NOMConstructor>()

export const createNom = <K extends NodeKind, N extends NodeOf<K> = NodeOf<K>>(
  kind: K,
  fields: ModelizeFields<N>
): NOM<N> => {
  let nomClass = KIND_NOM_MAP.get(kind) as NOMConstructor<N> | undefined
  if (!nomClass) {
    nomClass = createNomClass(kind)
    KIND_NOM_MAP.set(kind, nomClass as NOMConstructor)
  }

  return new nomClass(fields)
}

export const createNomList = (nomArray: Model[]): NOMList =>
  new NOMList(nomArray)

type ScratchValueToLiteral<T extends ScratchValue> = T extends number
  ? Node$LiteralNumber
  : T extends string
  ? Node$LiteralString
  : T extends boolean
  ? Node$LiteralBoolean
  : never

export const createNomValue = <
  T extends ScratchValue,
  N extends ScratchValueToLiteral<T> = ScratchValueToLiteral<T>
>(
  value: T
): NOM<N> => {
  if (typeof value === 'number') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return createNom('$literal_number', { value } as any) as NOM<N>
  }

  if (typeof value === 'string') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return createNom('$literal_string', { value } as any) as NOM<N>
  }

  if (typeof value === 'boolean') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return createNom('$literal_boolean', { value } as any) as NOM<N>
  }

  throw new Error(`invaid value: ${value}`)
}

const NODE_KIND_FIELDS_MAP: {
  [K in NodeKind]: (node: NodeOf<K>) => ModelizeFields<NodeOf<K>>
} = {
  control_wait: (node) => ({
    duration: createNomFrom(node.duration),
  }),
  control_repeat: (node) => ({
    times: createNomFrom(node.times),
    substack: createNomArrayFrom(node.substack),
  }),
  control_forever: (node) => ({
    substack: createNomArrayFrom(node.substack),
  }),
  control_if: (node) => ({
    condition: createNomFrom(node.condition),
    substack: createNomArrayFrom(node.substack),
  }),
  control_if_else: (node) => ({
    condition: createNomFrom(node.condition),
    substack1: createNomArrayFrom(node.substack1),
    substack2: createNomArrayFrom(node.substack2),
  }),
  control_wait_until: (node) => ({
    condition: createNomFrom(node.condition),
  }),
  control_repeat_until: (node) => ({
    condition: createNomFrom(node.condition),
    substack: createNomArrayFrom(node.substack),
  }),
  control_stop: (node) => ({
    stopOption: node.stopOption,
  }),
  control_start_as_clone: (node) => ({
    body: createNomArrayFrom(node.body),
  }),
  control_create_clone_of: (node) => ({
    cloneOption: createNomFrom(node.cloneOption),
  }),
  control_create_clone_of_menu: (node) => ({
    cloneOption: node.cloneOption,
  }),
  control_delete_this_clone: () => ({}),
  $data_variable: (node) => ({
    variable: node.variable,
  }),
  data_setvariableto: (node) => ({
    variable: node.variable,
    value: createNomFrom(node.value),
  }),
  data_changevariableby: (node) => ({
    variable: node.variable,
    value: createNomFrom(node.value),
  }),
  data_showvariable: (node) => ({
    variable: node.variable,
  }),
  data_hidevariable: (node) => ({
    variable: node.variable,
  }),
  $data_list: (node) => ({
    list: node.list,
  }),
  data_addtolist: (node) => ({
    list: node.list,
    item: createNomFrom(node.item),
  }),
  data_deleteoflist: (node) => ({
    list: node.list,
    index: createNomFrom(node.index),
  }),
  data_deletealloflist: (node) => ({
    list: node.list,
  }),
  data_insertatlist: (node) => ({
    list: node.list,
    index: createNomFrom(node.index),
    item: createNomFrom(node.item),
  }),
  data_replaceitemoflist: (node) => ({
    list: node.list,
    index: createNomFrom(node.index),
    item: createNomFrom(node.item),
  }),
  data_itemoflist: (node) => ({
    list: node.list,
    index: createNomFrom(node.index),
  }),
  data_itemnumoflist: (node) => ({
    list: node.list,
    item: createNomFrom(node.item),
  }),
  data_lengthoflist: (node) => ({
    list: node.list,
  }),
  data_listcontainsitem: (node) => ({
    list: node.list,
    item: createNomFrom(node.item),
  }),
  data_showlist: (node) => ({
    list: node.list,
  }),
  data_hidelist: (node) => ({
    list: node.list,
  }),
  event_whenflagclicked: (node) => ({
    body: createNomArrayFrom(node.body),
  }),
  event_whenkeypressed: (node) => ({
    key: node.key,
    body: createNomArrayFrom(node.body),
  }),
  event_whenstageclicked: (node) => ({
    body: createNomArrayFrom(node.body),
  }),
  event_whenthisspriteclicked: (node) => ({
    body: createNomArrayFrom(node.body),
  }),
  event_whenbackdropswitchesto: (node) => ({
    backdrop: node.backdrop,
    body: createNomArrayFrom(node.body),
  }),
  event_whenbroadcastreceived: (node) => ({
    broadcast: node.broadcast,
    body: createNomArrayFrom(node.body),
  }),
  event_broadcast: (node) => ({
    broadcast: createNomFrom(node.broadcast),
  }),
  event_broadcastandwait: (node) => ({
    broadcast: createNomFrom(node.broadcast),
  }),
  event_whengreaterthan: (node) => ({
    target: node.target,
    value: createNomFrom(node.value),
    body: createNomArrayFrom(node.body),
  }),
  $literal_number: (node) => ({
    value: node.value,
  }),
  $literal_string: (node) => ({
    value: node.value,
  }),
  $literal_boolean: (node) => ({
    value: node.value,
  }),
  $literal_broadcast: (node) => ({
    value: node.value,
  }),
  $literal_color: (node) => ({
    value: node.value,
  }),
  looks_sayforsecs: (node) => ({
    message: createNomFrom(node.message),
    secs: createNomFrom(node.secs),
  }),
  looks_say: (node) => ({
    message: createNomFrom(node.message),
  }),
  looks_thinkforsecs: (node) => ({
    message: createNomFrom(node.message),
    secs: createNomFrom(node.secs),
  }),
  looks_think: (node) => ({
    message: createNomFrom(node.message),
  }),
  looks_switchcostumeto: (node) => ({
    costume: createNomFrom(node.costume),
  }),
  looks_nextcostume: () => ({}),
  looks_switchbackdropto: (node) => ({
    backdrop: createNomFrom(node.backdrop),
  }),
  looks_nextbackdrop: () => ({}),
  looks_changesizeby: (node) => ({
    change: createNomFrom(node.change),
  }),
  looks_setsizeto: (node) => ({
    size: createNomFrom(node.size),
  }),
  looks_changeeffectby: (node) => ({
    effect: node.effect,
    change: createNomFrom(node.change),
  }),
  looks_seteffectto: (node) => ({
    effect: node.effect,
    value: createNomFrom(node.value),
  }),
  looks_cleargraphiceffects: () => ({}),
  looks_show: () => ({}),
  looks_hide: () => ({}),
  looks_gotofrontback: (node) => ({
    frontBack: node.frontBack,
  }),
  looks_goforwardbackwardlayers: (node) => ({
    forwardBackward: node.forwardBackward,
    num: createNomFrom(node.num),
  }),
  looks_costumenumbername: (node) => ({
    numberName: node.numberName,
  }),
  looks_backdropnumbername: (node) => ({
    numberName: node.numberName,
  }),
  looks_size: () => ({}),
  looks_backdrops: (node) => ({
    backdrop: node.backdrop,
  }),
  looks_costume: (node) => ({
    costume: node.costume,
  }),
  motion_movesteps: (node) => ({
    steps: createNomFrom(node.steps),
  }),
  motion_turnright: (node) => ({
    degrees: createNomFrom(node.degrees),
  }),
  motion_turnleft: (node) => ({
    degrees: createNomFrom(node.degrees),
  }),
  motion_pointindirection: (node) => ({
    direction: createNomFrom(node.direction),
  }),
  motion_pointtowards: (node) => ({
    towards: createNomFrom(node.towards),
  }),
  motion_pointtowards_menu: (node) => ({
    towards: node.towards,
  }),
  motion_goto: (node) => ({
    to: createNomFrom(node.to),
  }),
  motion_goto_menu: (node) => ({
    to: node.to,
  }),
  motion_gotoxy: (node) => ({
    x: createNomFrom(node.x),
    y: createNomFrom(node.y),
  }),
  motion_glideto: (node) => ({
    to: createNomFrom(node.to),
    secs: createNomFrom(node.secs),
  }),
  motion_glideto_menu: (node) => ({
    to: node.to,
  }),
  motion_glidesecstoxy: (node) => ({
    x: createNomFrom(node.x),
    y: createNomFrom(node.y),
    secs: createNomFrom(node.secs),
  }),
  motion_changexby: (node) => ({
    dx: createNomFrom(node.dx),
  }),
  motion_setx: (node) => ({
    x: createNomFrom(node.x),
  }),
  motion_changeyby: (node) => ({
    dy: createNomFrom(node.dy),
  }),
  motion_sety: (node) => ({
    y: createNomFrom(node.y),
  }),
  motion_ifonedgebounce: () => ({}),
  motion_setrotationstyle: (node) => ({
    style: node.style,
  }),
  motion_xposition: () => ({}),
  motion_yposition: () => ({}),
  motion_direction: () => ({}),
  operator_add: (node) => ({
    num1: createNomFrom(node.num1),
    num2: createNomFrom(node.num2),
  }),
  operator_subtract: (node) => ({
    num1: createNomFrom(node.num1),
    num2: createNomFrom(node.num2),
  }),
  operator_multiply: (node) => ({
    num1: createNomFrom(node.num1),
    num2: createNomFrom(node.num2),
  }),
  operator_divide: (node) => ({
    num1: createNomFrom(node.num1),
    num2: createNomFrom(node.num2),
  }),
  operator_random: (node) => ({
    from: createNomFrom(node.from),
    to: createNomFrom(node.to),
  }),
  operator_lt: (node) => ({
    operand1: createNomFrom(node.operand1),
    operand2: createNomFrom(node.operand2),
  }),
  operator_equals: (node) => ({
    operand1: createNomFrom(node.operand1),
    operand2: createNomFrom(node.operand2),
  }),
  operator_gt: (node) => ({
    operand1: createNomFrom(node.operand1),
    operand2: createNomFrom(node.operand2),
  }),
  operator_$gte: (node) => ({
    operand1: createNomFrom(node.operand1),
    operand2: createNomFrom(node.operand2),
  }),
  operator_$lte: (node) => ({
    operand1: createNomFrom(node.operand1),
    operand2: createNomFrom(node.operand2),
  }),
  operator_and: (node) => ({
    operand1: createNomFrom(node.operand1),
    operand2: createNomFrom(node.operand2),
  }),
  operator_or: (node) => ({
    operand1: createNomFrom(node.operand1),
    operand2: createNomFrom(node.operand2),
  }),
  operator_not: (node) => ({
    operand: createNomFrom(node.operand),
  }),
  operator_join: (node) => ({
    string1: createNomFrom(node.string1),
    string2: createNomFrom(node.string2),
  }),
  operator_letter_of: (node) => ({
    string: createNomFrom(node.string),
    letter: createNomFrom(node.letter),
  }),
  operator_length: (node) => ({
    string: createNomFrom(node.string),
  }),
  operator_contains: (node) => ({
    string1: createNomFrom(node.string1),
    string2: createNomFrom(node.string2),
  }),
  operator_mod: (node) => ({
    num1: createNomFrom(node.num1),
    num2: createNomFrom(node.num2),
  }),
  operator_round: (node) => ({
    num: createNomFrom(node.num),
  }),
  operator_mathop: (node) => ({
    num: createNomFrom(node.num),
    operator: node.operator,
  }),
  pen_clear: () => ({}),
  pen_stamp: () => ({}),
  pen_penDown: () => ({}),
  pen_penUp: () => ({}),
  pen_setPenColorToColor: (node) => ({
    color: createNomFrom(node.color),
  }),
  pen_changePenColorParamBy: (node) => ({
    colorParam: createNomFrom(node.colorParam),
    value: createNomFrom(node.value),
  }),
  pen_setPenColorParamTo: (node) => ({
    colorParam: createNomFrom(node.colorParam),
    value: createNomFrom(node.value),
  }),
  pen_menu_colorParam: (node) => ({
    colorParam: node.colorParam,
  }),
  pen_changePenSizeBy: (node) => ({
    size: createNomFrom(node.size),
  }),
  pen_setPenSizeTo: (node) => ({
    size: createNomFrom(node.size),
  }),
  procedures_definition: (node) => ({
    customBlock: createNomFrom(node.customBlock),
    body: createNomArrayFrom(node.body),
  }),
  procedures_prototype: (node) => ({
    procCode: node.procCode,
    arguments: createNomArrayFrom(node.arguments),
    argumentDefaults: node.argumentDefaults,
    warp: node.warp,
  }),
  procedures_call: (node) => ({
    procCode: node.procCode,
    arguments: createNomArrayFrom(node.arguments),
  }),
  argument_reporter_boolean: (node) => ({
    name: node.name,
  }),
  argument_reporter_string_number: (node) => ({
    name: node.name,
  }),
  sensing_touchingobject: (node) => ({
    touchingObjectMenu: createNomFrom(node.touchingObjectMenu),
  }),
  sensing_touchingobjectmenu: (node) => ({
    touchingObjectMenu: node.touchingObjectMenu,
  }),
  sensing_touchingcolor: (node) => ({
    color: createNomFrom(node.color),
  }),
  sensing_coloristouchingcolor: (node) => ({
    color: createNomFrom(node.color),
    color2: createNomFrom(node.color2),
  }),
  sensing_distanceto: (node) => ({
    distanceToMenu: createNomFrom(node.distanceToMenu),
  }),
  sensing_distancetomenu: (node) => ({
    distanceToMenu: node.distanceToMenu,
  }),
  sensing_askandwait: (node) => ({
    question: createNomFrom(node.question),
  }),
  sensing_answer: () => ({}),
  sensing_keypressed: (node) => ({
    keyOption: createNomFrom(node.keyOption),
  }),
  sensing_keyoptions: (node) => ({
    keyOption: node.keyOption,
  }),
  sensing_mousedown: () => ({}),
  sensing_mousex: () => ({}),
  sensing_mousey: () => ({}),
  sensing_setdragmode: (node) => ({
    dragMode: node.dragMode,
  }),
  sensing_loudness: () => ({}),
  sensing_timer: () => ({}),
  sensing_resettimer: () => ({}),
  sensing_of: (node) => ({
    property: node.property,
    object: createNomFrom(node.object),
  }),
  sensing_of_object_menu: (node) => ({
    object: node.object,
  }),
  sensing_dayssince2000: () => ({}),
  sensing_current: (node) => ({
    currentMenu: node.currentMenu,
  }),
  sensing_username: () => ({}),
  sound_playuntildone: (node) => ({
    soundMenu: createNomFrom(node.soundMenu),
  }),
  sound_play: (node) => ({
    soundMenu: createNomFrom(node.soundMenu),
  }),
  sound_sounds_menu: (node) => ({
    soundMenu: node.soundMenu,
  }),
  sound_stopallsounds: () => ({}),
  sound_changeeffectby: (node) => ({
    value: createNomFrom(node.value),
    effect: node.effect,
  }),
  sound_seteffectto: (node) => ({
    value: createNomFrom(node.value),
    effect: node.effect,
  }),
  sound_cleareffects: () => ({}),
  sound_changevolumeby: (node) => ({
    volume: createNomFrom(node.volume),
  }),
  sound_setvolumeto: (node) => ({
    volume: createNomFrom(node.volume),
  }),
  sound_volume: () => ({}),
}

export const createNomFrom = <N extends Node>(node: N): NOM<N> => {
  const { kind, ...rest } = node
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fields = NODE_KIND_FIELDS_MAP[node.kind]?.(node as any)

  if (!fields) throw new Error(`invalid node: ${node} (${node.kind})`)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createNom(kind, { ...rest, ...fields } as any) as NOM<N>
}

export const createNomArrayFrom = (nodes: Node[]): NOMList => {
  return createNomList(nodes.map((node) => createNomFrom(node)))
}
