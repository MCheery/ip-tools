import { IPVersion } from './enums'
import { getIPVersion } from './isValidIP'
import { ipv4ToLong, ipv6ToLong } from './toLong'

function ipv4ToMaskLen(mask: string): number {
  const long = ipv4ToLong(mask)
  let ones = 0
  let cur = 0x80000000
  while (cur > 0) {
    if ((long & cur) !== 0) {
      ones += 1
    } else {
      return ones
    }
    cur >>>= 1
  }
  return ones
}

function ipv6ToMaskLen(mask: string): number {
  const long = ipv6ToLong(mask)
  let ones = 0
  let cur = BigInt('0x80000000000000000000000000000000')
  const zero = BigInt(0)
  const one = BigInt(1)
  while (cur > zero) {
    if ((long & cur) !== zero) {
      ones += 1
    } else {
      return ones
    }
    cur >>= one
  }
  return ones
}

export function toMaskLen(mask: string): number {
  if (getIPVersion(mask) === IPVersion.IPv4) {
    return ipv4ToMaskLen(mask)
  }
  if (getIPVersion(mask) === IPVersion.IPv6) {
    return ipv6ToMaskLen(mask)
  }
  return -1
}
