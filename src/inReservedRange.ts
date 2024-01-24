import { IPV4_RESERVED_RANGES, IPV6_RESERVED_RANGES } from './constants'
import { IPVersion, RESERVED_IPV4_TYPE, RESERVED_IPV6_TYPE } from './enums'
import { getIPVersion } from './isValidIP'
import { ipv4ToLong, ipv6ToLong } from './toLong'

export function ipv4InReservedRange(addressv4: string): RESERVED_IPV4_TYPE {
  const ip = ipv4ToLong(addressv4)
  for (const [target, mask, type] of IPV4_RESERVED_RANGES) {
    if ((target ^ (ip & mask)) === 0) {
      return type
    }
  }
  return RESERVED_IPV4_TYPE.NONE
}

export function ipv6InReservedRange(addressv6: string): RESERVED_IPV6_TYPE {
  const ip = ipv6ToLong(addressv6)
  const zero = BigInt(0)
  for (const [target, mask, type] of IPV6_RESERVED_RANGES) {
    if ((target ^ (ip & mask)) === zero) {
      return type
    }
  }
  return RESERVED_IPV6_TYPE.NONE
}

export function ipInReservedRange(address: string): boolean {
  const type = getIPVersion(address)
  if (type === IPVersion.IPv4) {
    return ipv4InReservedRange(address) === RESERVED_IPV4_TYPE.NONE
  }
  if (type === IPVersion.IPv6) {
    return ipv6InReservedRange(address) === RESERVED_IPV6_TYPE.NONE
  }
  return false
}
