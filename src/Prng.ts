export class Prng {
  #seed: number

  constructor(str: string | number) {
    if (typeof str === 'number') {
      this.#seed = str
      return
    }

    let h = 1779033703 ^ str.length
    for (var i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
      h = (h << 13) | (h >>> 19)
    }

    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    this.#seed = (h ^= h >>> 16) >>> 0
  }

  clone(): Prng {
    const tmp = new Prng(this.#seed)
    return tmp
  }

  nextInt() {
    var t = (this.#seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return (t ^ (t >>> 14)) >>> 0
  }

  nextOf<T>(arr: T[]): T {
    return arr[this.nextInt() % arr.length]
  }

  randomised<T>(arr: T[]): T[] {
    const copy = [...arr]
    for (let i = 0; i < arr.length; i++) {
      const r = this.nextInt() % arr.length
      const t = copy[i]
      copy[i] = copy[r]
      copy[r] = t
    }
    return copy
  }
}
