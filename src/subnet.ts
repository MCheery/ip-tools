

interface Subnet {
  address: string
  maskLength: number
  toString(): string
}

export class Subnetv4 implements Subnet {
  constructor(
    readonly address: string,
    readonly maskLength: number
  ) {
    if (maskLength < 0 || maskLength > 32) {
      throw new Error("Invalid mask length")
    }
  }

  toString(): string {
    return `${this.address}/${this.maskLength}`
  }
}