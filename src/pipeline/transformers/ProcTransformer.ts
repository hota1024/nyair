import { Nyair } from '@/ast/Nayir'
import { NodeProceduresPrototype } from '@/ast/nodes/procedures'
import { createNom, ModelList, NOM } from '@/nom'
import { NOMList } from '@/nom/NOMList'
import { ScratchValue } from '@/sb3/ScratchValue'
import { BaseTransformer } from '../Transformer'

type ProcData = {
  name: string
  procCode: NodeProceduresPrototype['procCode']
  args: (
    | {
        type: 'string_number'
        name: string
      }
    | {
        type: 'boolean'
        name: string
      }
  )[]
}

export class ProcTransformer extends BaseTransformer {
  getName(): string {
    return 'proc transformer'
  }

  getDescription(): string {
    return 'generates procedures from ailiases($proc_def, $proc_call, $proc_param, $proc_agg)'
  }

  async transform(project: Nyair): Promise<void> {
    project.getTargets().forEach((target) => {
      const nom = project.getTargetNom(target)
      const procData = this.genDef(nom)
      this.genCall(procData, nom)
      project.setTargetBlocksByNom(target, nom)
    })
  }

  private genCall(nameCodes: ProcData[], nom: NOMList): void {
    const calls = nom.listByKind('$proc_call')

    calls.forEach((call) => {
      const nameCode = nameCodes.find((nameCode) => nameCode.name === call.name)

      if (!nameCode) {
        throw new Error(`no definition for procedure ${call.name}`)
      }

      call.replaceWith(
        createNom('procedures_call', {
          procCode: nameCode.procCode,
          arguments: call.args,
        })
      )
    })
  }

  private genDef(nom: NOMList): ProcData[] {
    const data: ProcData[] = []
    const defs = nom.listByKind('$proc_def')

    defs.forEach((def) => {
      const args = new NOMList([])
      const argDefaults: ScratchValue[] = []
      const procCode: NodeProceduresPrototype['procCode'] = []
      const proc: ProcData = { name: def.name, procCode, args: [] }

      for (const schema of def.schema) {
        if (schema.type === 'label') {
          procCode.push(schema.text)
        }

        if (schema.type === 'string_number') {
          procCode.push('%s')
          args.push(
            createNom('argument_reporter_string_number', { name: schema.name })
          )
          argDefaults.push('')
          proc.args.push({ type: 'string_number', name: schema.name })
        }

        if (schema.type === 'boolean') {
          procCode.push('%b')
          args.push(
            createNom('argument_reporter_boolean', { name: schema.name })
          )
          argDefaults.push(false)
          proc.args.push({ type: 'boolean', name: schema.name })
        }
      }

      const customBlock = createNom('procedures_prototype', {
        procCode,
        arguments: args,
        argumentDefaults: argDefaults,
        warp: def.warp,
      })
      const body = def.body as NOMList

      const definition = createNom('procedures_definition', {
        customBlock,
        body,
      })
      body.setChildrenParent(definition as NOM)

      body
        .queryFnAll((node) => node.kind === '$proc_arg')
        .forEach((arg) => {
          const argData = proc.args.find((argData) => argData.name === arg.name)

          if (!argData) {
            throw new Error(`no argument definition for ${arg.name}`)
          }

          if (argData.type === 'string_number') {
            arg.replaceWith(
              createNom('argument_reporter_string_number', { name: arg.name })
            )
          } else if (argData.type === 'boolean') {
            arg.replaceWith(
              createNom('argument_reporter_boolean', { name: arg.name })
            )
          }
        })

      data.push(proc)
      nom.insertBefore(def, definition)
      nom.remove(def)
    })

    return data
  }
}
