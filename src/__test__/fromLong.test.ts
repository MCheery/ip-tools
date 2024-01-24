import { describe } from 'vitest'
import { fromLong } from '../fromLong'
import { decompressIPv6 } from '../decompressIPv6'

const IPV4_CASES: Array<[string, number]> = [
  ['240.0.0.0', 0xf0000000],
  ['1.1.1.1', 0x01010101],
  ['255.255.255.255', 0xffffffff],
  ['0.0.0.0', 0x00000000],
  ['255.0.0.0', 0xff000000],
  ['0.255.0.0', 0x00ff0000],
  ['0.0.255.0', 0x0000ff00],
  ['0.0.0.255', 0x000000ff],
]

const IPV6_CASES: Array<[string, bigint]> = [
  ['ffff::', BigInt('0xffff0000000000000000000000000000')],
  ['f000::', BigInt('0xf0000000000000000000000000000000')],
  ['::1', BigInt('0x00000000000000000000000000000001')],
  ['::1111', BigInt('0x00000000000000000000000000001111')],
  ['3212::feef:1111', BigInt('0x321200000000000000000000feef1111')],
  ['ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff', BigInt('0xffffffffffffffffffffffffffffffff')],
]

const INVALID_CASES: Array<number | bigint> = [
  -1,
  0x100000000,
  BigInt('0x100000000000000000000000000000000'),
  BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
  BigInt(-1),
]

describe('fromLong', (it) => {
  it('should return the correct IPv4 address', ({ expect }) => {
    IPV4_CASES.forEach(([addr, long]) => {
      expect(fromLong(long)).toBe(addr)
    })
  })

  it('should return the correct IPv6 address', ({ expect }) => {
    IPV6_CASES.forEach(([addr, long]) => {
      expect(fromLong(long)).toBe(decompressIPv6(addr))
    })
  })

  it('should return empty string for invalid input', ({ expect }) => {
    INVALID_CASES.forEach((long) => {
      expect(fromLong(long)).toBe('')
    })
  })
})
