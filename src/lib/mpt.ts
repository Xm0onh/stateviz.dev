// Simple MPT implementation for demonstration
export class MPTNode {
  type: string

  constructor(type: string) {
    this.type = type
  }
}

export class EmptyNode extends MPTNode {
  constructor() {
    super('empty')
  }
}

export class LeafNode extends MPTNode {
  key: number[]
  value: string

  constructor(key: number[], value: string) {
    super('leaf')
    this.key = key
    this.value = value
  }
}

export class BranchNode extends MPTNode {
  branches: (MPTNode | null)[]
  value: string | null

  constructor() {
    super('branch')
    this.branches = new Array(16).fill(null)
    this.value = null
  }
}

export class ExtensionNode extends MPTNode {
  path: number[]
  next: MPTNode

  constructor(path: number[], next: MPTNode) {
    super('extension')
    this.path = path
    this.next = next
  }
}

export class HashNode extends MPTNode {
  hash: string
  originalNode: MPTNode

  constructor(hash: string, originalNode: MPTNode) {
    super('hash')
    this.hash = hash
    this.originalNode = originalNode
  }
}

export class SimpleMPT {
  root: MPTNode
  data: Map<string, string>

  constructor() {
    this.root = new EmptyNode()
    this.data = new Map()
  }

  hexToNibbles(hex: string): number[] {
    if (hex.startsWith('0x')) hex = hex.slice(2)
    const nibbles: number[] = []
    for (let i = 0; i < hex.length; i++) {
      nibbles.push(parseInt(hex[i], 16))
    }
    return nibbles
  }

  nibblesToHex(nibbles: number[]): string {
    return nibbles.map(n => n.toString(16)).join('')
  }

  insert(key: string, value: string): void {
    const nibbles = this.hexToNibbles(key)
    this.data.set(key, value)
    
    if (this.root.type === 'empty') {
      this.root = new LeafNode(nibbles, value)
    } else {
      this.root = this._insert(this.root, nibbles, value)
    }
  }

  _insert(node: MPTNode, nibbles: number[], value: string): MPTNode {
    if (node.type === 'leaf') {
      const leafNode = node as LeafNode
      // Check if same key
      if (this.arraysEqual(leafNode.key, nibbles)) {
        leafNode.value = value
        return leafNode
      }
      
      // Find common prefix
      const commonPrefix = this.getCommonPrefix(leafNode.key, nibbles)
      
      if (commonPrefix.length > 0) {
        // Create extension node
        const branch = new BranchNode()
        
        const remainingOld = leafNode.key.slice(commonPrefix.length)
        const remainingNew = nibbles.slice(commonPrefix.length)
        
        if (remainingOld.length === 0) {
          branch.value = leafNode.value
        } else {
          branch.branches[remainingOld[0]] = new LeafNode(remainingOld.slice(1), leafNode.value)
        }
        
        if (remainingNew.length === 0) {
          branch.value = value
        } else {
          branch.branches[remainingNew[0]] = new LeafNode(remainingNew.slice(1), value)
        }
        
        if (commonPrefix.length > 0) {
          return new ExtensionNode(commonPrefix, branch)
        }
        return branch
      } else {
        // No common prefix, create branch
        const branch = new BranchNode()
        branch.branches[leafNode.key[0]] = new LeafNode(leafNode.key.slice(1), leafNode.value)
        branch.branches[nibbles[0]] = new LeafNode(nibbles.slice(1), value)
        return branch
      }
    }
    
    if (node.type === 'branch') {
      const branchNode = node as BranchNode
      if (nibbles.length === 0) {
        branchNode.value = value
        return branchNode
      }
      
      const idx = nibbles[0]
      if (branchNode.branches[idx] === null) {
        branchNode.branches[idx] = new LeafNode(nibbles.slice(1), value)
      } else {
        branchNode.branches[idx] = this._insert(branchNode.branches[idx]!, nibbles.slice(1), value)
      }
      return branchNode
    }
    
    if (node.type === 'extension') {
      const extNode = node as ExtensionNode
      const commonPrefix = this.getCommonPrefix(extNode.path, nibbles)
      
      if (commonPrefix.length === extNode.path.length) {
        // Continue down
        extNode.next = this._insert(extNode.next, nibbles.slice(commonPrefix.length), value)
        return extNode
      } else {
        // Split extension
        const branch = new BranchNode()
        const remainingPath = extNode.path.slice(commonPrefix.length)
        const remainingNibbles = nibbles.slice(commonPrefix.length)
        
        if (remainingPath.length === 0) {
          branch.value = value
        } else {
          branch.branches[remainingPath[0]] = 
            remainingPath.length === 1 ? extNode.next : 
            new ExtensionNode(remainingPath.slice(1), extNode.next)
        }
        
        if (remainingNibbles.length === 0) {
          branch.value = value
        } else {
          branch.branches[remainingNibbles[0]] = new LeafNode(remainingNibbles.slice(1), value)
        }
        
        if (commonPrefix.length > 0) {
          return new ExtensionNode(commonPrefix, branch)
        }
        return branch
      }
    }
    
    return node
  }

  remove(key: string): void {
    this.data.delete(key)
    const nibbles = this.hexToNibbles(key)
    const result = this._remove(this.root, nibbles)
    this.root = result || new EmptyNode()
  }

  _remove(node: MPTNode | null, nibbles: number[]): MPTNode | null {
    if (!node || node.type === 'empty') return null
    
    if (node.type === 'leaf') {
      const leafNode = node as LeafNode
      if (this.arraysEqual(leafNode.key, nibbles)) {
        return null
      }
      return node
    }
    
    if (node.type === 'branch') {
      const branchNode = node as BranchNode
      if (nibbles.length === 0) {
        branchNode.value = null
      } else {
        const idx = nibbles[0]
        branchNode.branches[idx] = this._remove(branchNode.branches[idx], nibbles.slice(1))
      }
      
      // Collapse branch if only one child
      const nonNullBranches: { idx: number; node: MPTNode }[] = []
      for (let i = 0; i < 16; i++) {
        if (branchNode.branches[i] !== null) {
          nonNullBranches.push({ idx: i, node: branchNode.branches[i]! })
        }
      }
      
      if (nonNullBranches.length === 0 && branchNode.value === null) {
        return null
      } else if (nonNullBranches.length === 1 && branchNode.value === null) {
        const child = nonNullBranches[0]
        if (child.node.type === 'leaf') {
          const leafNode = child.node as LeafNode
          return new LeafNode([child.idx, ...leafNode.key], leafNode.value)
        } else if (child.node.type === 'extension') {
          const extNode = child.node as ExtensionNode
          return new ExtensionNode([child.idx, ...extNode.path], extNode.next)
        }
      }
      
      return branchNode
    }
    
    if (node.type === 'extension') {
      const extNode = node as ExtensionNode
      if (this.startsWith(nibbles, extNode.path)) {
        const result = this._remove(extNode.next, nibbles.slice(extNode.path.length))
        if (!result) return null
        
        extNode.next = result
        
        // Merge extensions
        if (extNode.next.type === 'extension') {
          const nextExt = extNode.next as ExtensionNode
          return new ExtensionNode([...extNode.path, ...nextExt.path], nextExt.next)
        }
        
        return extNode
      }
      return node
    }
    
    return node
  }

  arraysEqual(a: number[], b: number[]): boolean {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false
    }
    return true
  }

  startsWith(arr: number[], prefix: number[]): boolean {
    if (prefix.length > arr.length) return false
    for (let i = 0; i < prefix.length; i++) {
      if (arr[i] !== prefix[i]) return false
    }
    return true
  }

  getCommonPrefix(a: number[], b: number[]): number[] {
    const prefix: number[] = []
    const minLen = Math.min(a.length, b.length)
    for (let i = 0; i < minLen; i++) {
      if (a[i] === b[i]) {
        prefix.push(a[i])
      } else {
        break
      }
    }
    return prefix
  }

  clear(): void {
    this.root = new EmptyNode()
    this.data.clear()
  }
} 