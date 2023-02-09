export type BlockMutation =
  | {
      tagName: 'mutation'
      children: []
      hasnext: 'true' | 'false'
    }
  | {
      tagName: 'mutation'
      children: []
      /**
       * - `label` - plain text
       * - `%s`    - string argument
       * - `%b`    - boolean argument
       */
      proccode: string

      /**
       * `"["{ARG UID}", "{ARG UID}"...]"`
       */
      argumentids: string

      /**
       * `"["{ARG NAME}", "{ARG NAME}"...]"`
       */
      argumentnames?: string

      /**
       * `"["{ARG DEFAULT}", "{ARG DEFAULT}"...]"`
       */
      argumentdefaults?: string
      warp: 'true' | 'false'
    }
