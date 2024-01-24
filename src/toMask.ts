import { ipv4FromLong, ipv6FromLong } from './fromLong'

export function ipv4ToMask(maskLen: number): string {
  return ipv4FromLong(0xffffffff << (32 - maskLen))
}

export function ipv6ToMask(maskLen: number): string {
  return ipv6FromLong(BigInt('0xffffffffffffffffffffffffffffffff') << BigInt(128 - maskLen))
}

export function toMask(maskLen: number, isIPv6 = false): string {
  if (maskLen < 0) return ''
  if (maskLen <= 32) {
    return isIPv6 ? ipv6ToMask(maskLen) : ipv4ToMask(maskLen)
  }
  if (maskLen <= 128) {
    return ipv6ToMask(maskLen)
  }
  return ''
}
