import { IPType, getIPType } from "./isValidIP";

export class IP {
  readonly type: IPType
  constructor(
    readonly address: string
  ) {
    this.type = getIPType(address)
  }

  get isValid(): boolean {
    return this.type !== IPType.unknown
  }
}

export function ip(address: string) {
  return new IP(address)
}