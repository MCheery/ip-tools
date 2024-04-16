import { contains, net4Contains } from './contains';
import { RESERVED_IPV4_TYPE, RESERVED_IPV6_TYPE } from './enums';
import { IPVersion } from './enums/ipVersion';
import { decompressIPv6 } from './decompressIPv6';
import { ipv4FromLong, ipv6FromLong } from './fromLong';
import { ipInRange } from './inRange';
import { ipv4InReservedRange, ipv6InReservedRange } from './inReservedRange';
import { getIPVersion, isIPv6 } from './isValidIP';
import { IPv4 as IPv4Model, IPv6 as IPv6Model } from './models/ip.model';
import { Subnetv4, Subnetv6 } from './models/subnet.model';
import { ipv4ToLong, ipv6ToLong } from './toLong';
import { netArgsAdapter } from './utils/argsAdapter';

export class IPv4 implements IPv4Model {
  constructor(
    readonly address: string
  ) {
    if (getIPVersion(address) !== IPVersion.IPv4) {
      throw new Error('Invalid IPv4 address')
    }
  }

  private _long: number | undefined
  get long(): number {
    if (this._long === undefined) {
      this._long = ipv4ToLong(this.address)
    }
    return this._long
  }

  containedBy(network: string | Subnetv4): boolean
  containedBy(netAddr: string, maskLen: number | string): boolean
  containedBy(arg1: string | Subnetv4, arg2?: number | string): boolean {
    const [netAddr, maskLen] = netArgsAdapter(
      typeof arg1 === 'string' ? arg1 : arg1.address,
      arg2,
    )
    return net4Contains(this.address, netAddr, maskLen)
  }

  isSame(ip: string | IPv4): boolean {
    const address = ip instanceof IPv4 ? ip.address : ip
    return this.address === address
  }

  inRange(start: string | IPv4, end?: string | IPv4): boolean {
    return ipInRange(
      this.address,
      start instanceof IPv4 ? start.address : start,
      end instanceof IPv4 ? end.address : end,
    )
  }

  inReservedRange(): RESERVED_IPV4_TYPE {
    return ipv4InReservedRange(this.address)
  }

  getOctet(index: number): string {
    if (index < 0 || index > 3) {
      return '0'
    }
    return this.address.split('.')[index]
  }

  getOctets(): string[] {
    return this.address.split('.')
  }

  next(step = 1): IPv4 {
    let long = (this.long + Math.ceil(step)) % 0x100000000
    if (long < 0) {
      long += 0x100000000
    }
    return new IPv4(ipv4FromLong(long))
  }

  prev(step = 1): IPv4 {
    return this.next(-step)
  }
}

export class IPv6 implements IPv6Model {
  readonly fullAddress: string
  constructor(
    readonly address: string
  ) {
    if (getIPVersion(address) !== IPVersion.IPv6) {
      throw new Error('Invalid IPv6 address')
    }
    this.fullAddress = decompressIPv6(address)
  }

  private _long: bigint | undefined
  get long(): bigint {
    if (this._long === undefined) {
      this._long = ipv6ToLong(this.address)
    }
    return ipv6ToLong(this.address)
  }

  containedBy(network: string | Subnetv6): boolean
  containedBy(netAddr: string, maskLen: number | string): boolean
  containedBy(arg1: string | Subnetv6, arg2?: number | string): boolean {
    const [netAddr, maskLen] = netArgsAdapter(
      typeof arg1 === 'string' ? arg1 : arg1.address,
      arg2,
    )
    return contains(this.address, netAddr, maskLen)
  }

  isSame(ip: string | this): boolean {
    let fullAddress: string
    if (ip instanceof IPv6) {
      fullAddress = decompressIPv6(ip.address)
    } else {
      if (!isIPv6(ip)) return false
      fullAddress = decompressIPv6(ip)
    }
    return this.fullAddress === fullAddress
  }

  inRange(start: string | this, end?: string | this): boolean {
    return ipInRange(
      this.address,
      start instanceof IPv6 ? start.address : start,
      end instanceof IPv6 ? end.address : end,
    )
  }

  inReservedRange(): RESERVED_IPV6_TYPE {
    return ipv6InReservedRange(this.address)
  }

  getOctet(index: number): string {
    if (index < 0 || index > 7) {
      return '0000'
    }
    return this.fullAddress.split(':')[index]
  }

  getOctets(): string[] {
    return this.fullAddress.split(':')
  }

  next(step: number | bigint = 1): IPv6 {
    const max = BigInt('0xffffffffffffffffffffffffffffffff')
    let long = (this.long + BigInt(step)) % max
    if (long < BigInt(0)) {
      long += max
    }
    return new IPv6(ipv6FromLong(long))
  }

  prev(step: number | bigint = 1): IPv6 {
    return this.next(-step)
  }
}

export function ipv4(address: string): IPv4 {
  return new IPv4(address)
}

export function ipv6(address: string): IPv6 {
  return new IPv6(address)
}
