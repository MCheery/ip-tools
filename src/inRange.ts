import { ipv4ToLong, ipv6ToLong } from "./toLong"
import { IPType, getIPType } from "./isValidIP"

export function ipv4InRange(addressv4: string, range: [string, string]): boolean {
  const start = ipv4ToLong(range[0])
  const end = ipv4ToLong(range[1])
  const ip = ipv4ToLong(addressv4)
  return ip >= start && ip <= end
}

export function ipv6InRange(addressv6: string, range: [string, string]): boolean {
  const ip = ipv6ToLong(addressv6)
  const start = ipv6ToLong(range[0])
  const end = ipv6ToLong(range[1])
  return ip >= start && ip <= end
}

export function ipInRange(address: string, range: [string, string]): boolean {
  const [start, end] = range
  const ipType = getIPType(address)
  const startType = getIPType(start)
  const endType = getIPType(end)

  if (ipType !== startType || ipType !== endType) {
    return false
  }
  if (ipType === IPType.ipv4) {
    return ipv4InRange(address, [start, end])
  }
  if (ipType === IPType.ipv6) {
    return ipv6InRange(address, [start, end])
  }
  return false
}
