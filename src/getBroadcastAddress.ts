import { ipv4FromLong, ipv6FromLong } from './fromLong'
import { isIPv4, isIPv6 } from './isValidIP'
import { ipv4ToLong, ipv6ToLong } from './toLong'
import { netArgsAdapter } from './utils/argsAdapter'

export function getIPv4BroadcastAddress(addr: string, maskLen: number): string {
  const maskLong = 0xffffffff >>> maskLen
  const netLong = (ipv4ToLong(addr) | maskLong) >>> 0
  return ipv4FromLong(netLong)
}

export function getIPv6BroadcastAddress(addr: string, maskLen: number): string {
  const maskLong = BigInt('0xffffffffffffffffffffffffffffffff') >> BigInt(maskLen)
  const netLong = ipv6ToLong(addr) | maskLong
  return ipv6FromLong(netLong)
}

export function getBroadcastAddress(addr: string, maskLen: number | string): string
export function getBroadcastAddress(network: string): string
export function getBroadcastAddress(arg1: string, arg2?: number | string): string {
  const [addr, maskLen] = netArgsAdapter(arg1, arg2)

  if (Number.isNaN(maskLen) || maskLen < 0) {
    return ''
  }
  if (isIPv4(addr)) {
    if (maskLen === 32) return addr
    if (maskLen > 32) return ''
    return getIPv4BroadcastAddress(addr, maskLen)
  }
  if (isIPv6(addr)) {
    if (maskLen === 128) return addr
    if (maskLen > 128) return ''
    return getIPv6BroadcastAddress(addr, maskLen)
  }
  return ''
}