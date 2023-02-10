import { BlockCompiler } from '@/compiler/NyairCompiler'
import { createNomBase } from './NOM'
import { NOMList } from './NOMList'

class ControlIf extends createNomBase('control_if') {}
class LiteralBoolean extends createNomBase('$literal_boolean') {}

const nom = new ControlIf({
  condition: new LiteralBoolean({ value: true }),
  substack: new NOMList([
    new ControlIf({
      condition: new LiteralBoolean({ value: false }),
      substack: new NOMList([]),
    }),
  ]),
})

const bools = nom.listByKind('$literal_boolean')
bools[0]
  .expectParent()
  .replaceWith(bools[0], new LiteralBoolean({ value: false }))
console.log(bools)

// const compiler = new BlockCompiler()
// const blocks = compiler.compile([nom.toNode()])
// console.log(blocks)
