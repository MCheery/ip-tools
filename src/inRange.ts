import { IPVersion } from './enums/ipVersion'
import { getIPVersion } from './isValidIP'
import { ipv4ToLong, ipv6ToLong } from './toLong'
import { ipRangeArgsAdapter } from './utils/argsAdapter'

export function ipv4InRange(addressv4: string, start: string, end?: string): boolean {
  const ipNum = ipv4ToLong(addressv4)
  const startNum = ipv4ToLong(start)
  if (ipNum < startNum) return false

  if (!end) return true
  const endNum = ipv4ToLong(end)
  return ipNum <= endNum
}

export function ipv6InRange(addressv6: string, start: string, end?: string): boolean {
  const ipNum = ipv6ToLong(addressv6)
  const startNum = ipv6ToLong(start)
  if (ipNum < startNum) return false

  if (!end) return true
  const endNum = ipv6ToLong(end)
  return ipNum <= endNum
}

export function ipInRange(address: string, start: string, end?: string): boolean
export function ipInRange(address: string, range: [string, string | undefined]): boolean
export function ipInRange(arg1: string, arg2: string | [string, string | undefined], arg3?: string): boolean {
  const [address, start, end] = ipRangeArgsAdapter(arg1, arg2, arg3)

  const ipVersion = getIPVersion(address)
  const startType = getIPVersion(start)
  const endType = getIPVersion(end)

  if (ipVersion !== startType || (end !== undefined && ipVersion !== endType)) {
    return false
  }
  if (ipVersion === IPVersion.IPv4) {
    return ipv4InRange(address, start, end)
  }
  if (ipVersion === IPVersion.IPv6) {
    return ipv6InRange(address, start, end)
  }
  return false
}
