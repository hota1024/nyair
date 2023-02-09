import { Nyair } from './ast/Nayir'
import { NyairCompiler } from './compiler/NyairCompiler'

const source: Nyair = {
  version: '0',
  stage: {
    costumes: [
      {
        assetId: 'cd21514d0531fdffb22204e0ec5ed84a',
        name: 'backdrop1',
        bitmapResolution: 1,
        md5ext: 'cd21514d0531fdffb22204e0ec5ed84a.svg',
        dataFormat: 'svg',
        rotationCenterX: 0,
        rotationCenterY: 0,
      },
    ],
    currentCostume: 0,
    variables: [
      {
        name: 'i',
        initialValue: 0,
      },
    ],
    lists: [
      {
        name: 'list',
        initialValue: [],
      },
    ],
    blocks: [
      {
        kind: '$proc_def',
        name: 'hello',
        schema: [
          'hello',
          {
            name: 'message',
            type: 'string_number',
          },
        ],
        warp: true,
        body: [],
      },
      {
        kind: '$proc_call',
        name: 'hello',
        arguments: [],
      },
      {
        kind: 'procedures_definition',
        customBlock: {
          kind: 'procedures_prototype',
          arguments: [
            {
              kind: 'argument_reporter_string_number',
              name: 'number',
            },
            {
              kind: 'argument_reporter_boolean',
              name: 'bool',
            },
          ],
          procCode: ['hello', '%s', 'world', '%b'],
          argumentDefaults: ['world', true],
          warp: false,
        },
        body: [
          {
            kind: 'procedures_call',
            procCode: ['hello', '%s', 'world', '%b'],
            arguments: ['hello', false],
          },
        ],
      },
    ],
    volume: 100,
    layerOrder: 0,
    tempo: 60,
    videoTransparency: 50,
    videoState: 'on-flipped',
    textToSpeechLanguage: null,
  },
  sprites: [],
  extensions: [],
}

import fs from 'fs/promises'

const compiler = new NyairCompiler()
const result = compiler.compile(source)
fs.writeFile(
  process.cwd() + '/test/project.json',
  JSON.stringify(result, null, 2)
)
console.log('compiled')
