import type {Literal} from 'mdast'

export interface Math extends Literal {
  type: 'math'
  lang?: string | null
  meta?: string | null
}

export interface InlineMath extends Literal {
  type: 'inlineMath'
}

declare module 'mdast' {
  interface StaticPhrasingContentMap {
    inlineMath: InlineMath
  }

  interface BlockContentMap {
    math: Math
  }
}
