import { contains } from './contains'
import { decompressIPv6 } from './decompressIPv6'
import { getIPv4BroadcastAddress, getIPv6BroadcastAddress } from './getBroadcastAddress'
import { getIPv4NetworkAddress, getIPv6NetworkAddress } from './getNetworkAddress'
import { ipv4, ipv6, IPv4, IPv6 } from './ip'
import { isIPv4, isIPv6 } from './isValidIP'
import { Subnetv4 as Subnetv4Modal, Subnetv6 as Subnetv6Modal } from './models/subnet.model'
import { ipv4ToMask, ipv6ToMask } from './toMask'
import { netArgsAdapter } from './utils/argsAdapter'

export class Subnetv4 implements Subnetv4Modal {
  readonly address: string
  readonly maskLen: number
  readonly ip: IPv4

  constructor(network: string)
  constructor(address: string, maskLen: number | string)
  constructor(arg1: string, arg2?: number | string) {
    const [addr, len] = netArgsAdapter(arg1, arg2)
    if (Number.isNaN(len) || len < 0 || len > 32) {
      throw new Error('Invalid mask length')
    }
    if (!isIPv4(addr)) {
      throw new Error('Invalid address')
    }
    this.address = addr
    this.maskLen = len
    this.ip = ipv4(addr)
  }

  get mask(): string {
    return ipv4ToMask(this.maskLen)
  }

  get networkAddress(): string {
    return getIPv4NetworkAddress(this.address, this.maskLen)
  }

  get broadcastAddress(): string {
    return getIPv4BroadcastAddress(this.address, this.maskLen)
  }

  get addressCount(): number {
    return 1 << (32 - this.maskLen)
  }

  getFirstHost(): IPv4 | null {
    if (this.maskLen >= 31) return null
    return ipv4(this.networkAddress).next()
  }

  getLastHost(): IPv4 | null {
    if (this.maskLen >= 31) return null
    return ipv4(this.broadcastAddress).prev()
  }

  contains(ip: string | IPv4): boolean {
    if (typeof ip === 'string') {
      if (!isIPv4(ip)) return false
    }
    return contains(
      this.address,
      typeof ip === 'string' ? ip : ip.address,
      this.maskLen
    )
  }

  *[Symbol.iterator]() {
    let curIP = this.getFirstHost()
    if (curIP === null) return
    const broadcastLong = ipv4(this.broadcastAddress).long
    while (curIP.long < broadcastLong) {
      yield curIP.address
      curIP = curIP.next()
    }
  }
}

export class Subnetv6 implements Subnetv6Modal {
  readonly address: string
  readonly fullAddress: string
  readonly maskLen: number
  readonly ip: IPv6

  constructor(network: string)
  constructor(address: string, maskLen: number | string)
  constructor(arg1: string, arg2?: number | string) {
    const [addr, len] = netArgsAdapter(arg1, arg2)
    if (Number.isNaN(len) || len < 0 || len > 128) {
      throw new Error('Invalid mask length')
    }
    if (!isIPv6(addr)) {
      throw new Error('Invalid address')
    }
    this.address = addr
    this.fullAddress = decompressIPv6(addr)
    this.maskLen = len
    this.ip = ipv6(addr)
  }

  get mask(): string {
    return ipv6ToMask(this.maskLen)
  }

  get networkAddress(): string {
    return getIPv6NetworkAddress(this.address, this.maskLen)
  }

  get broadcastAddress(): string {
    return getIPv6BroadcastAddress(this.address, this.maskLen)
  }

  get addressCount(): bigint {
    return BigInt(1) << BigInt(128 - this.maskLen)
  }

  getFirstHost(): IPv6 | null {
    if (this.maskLen >= 127) return null
    return ipv6(this.networkAddress).next()
  }

  getLastHost(): IPv6 | null {
    if (this.maskLen >= 127) return null
    return ipv6(this.broadcastAddress).prev()
  }

  contains(ip: string | IPv6): boolean {
    if (typeof ip === 'string') {
      ip = ipv6(ip)
    }
    return contains(this.address, ip.address, this.maskLen)
  }

  *[Symbol.iterator]() {
    let curIP = this.getFirstHost()
    if (curIP === null) return
    const broadcastLong = ipv6(this.broadcastAddress).long
    while (curIP.long < broadcastLong) {
      yield curIP.address
      curIP = curIP.next()
    }
  }
}

export function subnetv4(network: string): Subnetv4 {
  return new Subnetv4(network)
}

export function subnetv6(network: string): Subnetv6 {
  return new Subnetv6(network)
}
