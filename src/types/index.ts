export interface Algorithm {
  id: string
  name: string
  description: string
  icon: any
  path: string
}

export interface MPTNode {
  id: string
  type: 'leaf' | 'extension' | 'branch'
  key: string
  value?: string
  children?: MPTNode[]
  position?: { x: number; y: number }
}

export interface VisualizationState {
  nodes: MPTNode[]
  selectedNode?: string
  animating: boolean
  step: number
} 