import { ipv4FromLong } from "./fromLong";
import { ipv4InRange, ipv6InRange } from "./inRange";
import { RESERVED_IPV4_TYPE, RESERVED_IPV6_TYPE, ipv4InReservedRange, ipv6InReservedRange } from "./inReservedRange";
import { IPType, getIPType } from "./isValidIP";
import { ipv4ToLong } from "./toLong";

interface IP {
  address: string
  toString(): string
}

export class IPv4 implements IP {
  constructor(
    readonly address: string
  ) {
    if (getIPType(address) !== IPType.ipv4) {
      throw new Error("Invalid IPv4 address")
    }
  }

  toString(): string {
    return this.address
  }

  inRange(start: string | IPv4, end?: string | IPv4): boolean {
    const startAddress = typeof start === "string" ? start : start.address
    const endAddress = typeof end === "string" ? end : end?.address
    return ipv4InRange(this.address, startAddress, endAddress)
  }

  inReverseRange(): RESERVED_IPV4_TYPE {
    return ipv4InReservedRange(this.address)
  }

  toLong(): number {
    return ipv4ToLong(this.address)
  }

  static fromLong(long: number): IPv4 {
    return new IPv4(ipv4FromLong(long))
  }
}

export class IPv6 implements IP {
  constructor(
    readonly address: string
  ) {
    if (getIPType(address) !== IPType.ipv6) {
      throw new Error("Invalid IPv6 address")
    }
  }

  inRange(start: string | IPv6, end?: string | IPv6): boolean {
    const startAddress = typeof start === "string" ? start : start.address
    const endAddress = typeof end === "string" ? end : end?.address
    return ipv6InRange(this.address, startAddress, endAddress)
  }

  inReverseRange(): RESERVED_IPV6_TYPE {
    return ipv6InReservedRange(this.address)
  }
}