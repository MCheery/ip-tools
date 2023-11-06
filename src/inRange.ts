import { IPType, getIPType } from "./isValidIP"
import { ipv4ToLong, ipv6ToLong } from "./toLong"

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

export function ipInRange(address: string, start: string, end?: string): boolean {
  const ipType = getIPType(address)
  const startType = getIPType(start)
  const endType = getIPType(end)

  if (ipType !== startType || ipType !== endType) {
    return false
  }
  if (ipType === IPType.ipv4) {
    return ipv4InRange(address, start, end)
  }
  if (ipType === IPType.ipv6) {
    return ipv6InRange(address, start, end)
  }
  return false
}
