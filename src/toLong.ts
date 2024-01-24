import { decompressIPv6 } from './decompressIPv6'

export function ipv4ToLong(address: string): number {
  const segs = address.split('.').map((seg) => parseInt(seg))
  let result = 0x00000000
  for (let i = 0; i < segs.length; i++) {
    result <<= 8
    result |= segs[i]
  }
  // convert to unsigned
  result >>>= 0
  return result
}

export function ipv6ToLong(address: string): bigint {
  return BigInt('0x' + decompressIPv6(address).replaceAll(':', ''))
}
