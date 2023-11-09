import { IPVersion } from './enums/ipVersion'
import { getIPVersion } from './isValidIP'
import { ipv4ToLong, ipv6ToLong } from './toLong'

export function isSame(a: string, b: string): boolean {
  const typeA = getIPVersion(a)
  if (typeA === IPVersion.Unknown) {
    return false
  }
  const typeB = getIPVersion(b)
  if (typeB === IPVersion.Unknown || typeA !== typeB) {
    return false
  }
  if (typeA === IPVersion.IPv4) {
    return ipv4ToLong(a) === ipv4ToLong(b)
  } else {
    return ipv6ToLong(a) === ipv6ToLong(b)
  }
}
