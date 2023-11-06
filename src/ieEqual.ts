import { IPType, getIPType } from "./isValidIP";
import { ipv4ToLong, ipv6ToLong } from "./toLong";

export function isEqual(a: string, b: string): boolean {
  const typeA = getIPType(a)
  if (typeA === IPType.unknown) {
    return false
  }
  const typeB = getIPType(b)
  if (typeB === IPType.unknown || typeA !== typeB) {
    return false
  }
  if (typeA === IPType.ipv4) {
    return ipv4ToLong(a) === ipv4ToLong(b)
  } else {
    return ipv6ToLong(a) === ipv6ToLong(b)
  }
}