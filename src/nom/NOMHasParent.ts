import { NOM } from './NOM'

export class NOMHasParent {
  private parent?: NOM

  setParent(parent: NOM): void {
    this.parent = parent
  }

  expectParent(): NOM {
    if (!this.parent) {
      throw new Error('Parent not set')
    }

    return this.parent
  }
}
