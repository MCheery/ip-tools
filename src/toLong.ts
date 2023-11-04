import { expandIPv6 } from "./expandIPv6"

export function ipv4ToLong(address: string): number {
  const segs = address.split('.').map((seg) => parseInt(seg))
  let result = 0x0
  for (let i = 0; i < segs.length; i++) {
    result <<= 8
    result |= segs[i]
  }
  result >>>= 0
  return result
}

export function ipv6ToLong(address: string): bigint {
  const segs = expandIPv6(address).split(':').map((seg) => parseInt(seg, 16))
  let result = BigInt(0)
  const offset = BigInt(16)
  for (let i = 0; i < segs.length; i++) {
    result <<= offset
    result |= BigInt(segs[i])
  }
  return result
}
