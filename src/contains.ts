import { getIPVersion } from './isValidIP'
import { ipv4ToLong, ipv6ToLong } from './toLong'
import { netArgsAdapter } from './utils/argsAdapter'

export function net4Contains(ip: string, netAddr: string, maskLen: number): boolean {
  const netLong = ipv4ToLong(netAddr)
  const ipLong = ipv4ToLong(ip)
  const mask = 0xffffffff << (32 - maskLen)
  return (netLong & mask) === (ipLong & mask)
}

export function net6Contains(ip: string, netAddr: string, maskLen: number): boolean {
  const netLong = ipv6ToLong(netAddr)
  const ipLong = ipv6ToLong(ip)
  const mask = BigInt(0xffffffff << (32 - maskLen))
  return (netLong & mask) === (ipLong & mask)
}

export function contains(ip: string, network: string): boolean
export function contains(ip: string, netAddr: string, maskLen: number | string): boolean
export function contains(ip: string, arg2: string, arg3?: number | string): boolean {
  const [netAddr, maskLen] = netArgsAdapter(arg2, arg3)

  if (Number.isNaN(maskLen)) {
    return false
  }

  const ipVersion = getIPVersion(ip)
  const netType = getIPVersion(netAddr)
  if (ipVersion !== netType) {
    return false
  }
  if (ipVersion === 4) {
    return net4Contains(ip, netAddr, maskLen)
  }
  if (ipVersion === 6) {
    return net6Contains(ip, netAddr, maskLen)
  }
  return false
}
