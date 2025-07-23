// Simple Bloom Filter implementation for demonstration
export class SimpleBloomFilter {
  bitArray: boolean[]
  size: number
  hashCount: number

  constructor(size: number, hashCount: number) {
    this.size = size
    this.hashCount = hashCount
    this.bitArray = new Array(size).fill(false)
  }

  // Simple hash functions using string char codes
  hash(item: string, seed: number): number {
    let hash = seed
    for (let i = 0; i < item.length; i++) {
      hash = ((hash << 5) + hash + item.charCodeAt(i)) % this.size
    }
    return Math.abs(hash)
  }

  add(item: string): void {
    for (let i = 0; i < this.hashCount; i++) {
      const index = this.hash(item, i)
      this.bitArray[index] = true
    }
  }

  mightContain(item: string): boolean {
    for (let i = 0; i < this.hashCount; i++) {
      const index = this.hash(item, i)
      if (!this.bitArray[index]) {
        return false // Definitely not present
      }
    }
    return true // Might be present (could be false positive)
  }

  clear(): void {
    this.bitArray.fill(false)
  }

  getHashPositions(item: string): number[] {
    const positions = []
    for (let i = 0; i < this.hashCount; i++) {
      positions.push(this.hash(item, i))
    }
    return positions
  }
} 