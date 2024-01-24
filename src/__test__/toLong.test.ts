import { describe } from 'vitest'
import { ipv4ToLong, ipv6ToLong } from '../toLong'

const IPV4_CASES: Array<[string, number]> = [
  ['240.0.0.0', 0xf0000000],
  ['1.1.1.1', 0x01010101],
  ['255.255.255.255', 0xffffffff],
  ['0.0.0.0', 0x00000000],
  ['255.0.0.0', 0xff000000],
  ['0.255.0.0', 0x00ff0000],
  ['0.0.255.0', 0x0000ff00],
  ['0.0.0.255', 0x000000ff],
  ['192.168.2.1', 0xc0a80201],
]

const IPV6_CASES: Array<[string, string]> = [
  ['ffff::', '0xffff0000000000000000000000000000'],
  ['f000::', '0xf0000000000000000000000000000000'],
  ['::1', '0x00000000000000000000000000000001'],
  ['::1111', '0x00000000000000000000000000001111'],
  ['3212::feef:1111', '0x321200000000000000000000feef1111'],
  ['::', '0x00000000000000000000000000000000'],
  ['::ffff', '0x0000000000000000000000000000ffff'],
  ['::ffff:0:0', '0x00000000000000000000ffff00000000'],
  ['ffff:ffff::ffff:0:0', '0xffffffff000000000000ffff00000000'],
  ['ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff', '0xffffffffffffffffffffffffffffffff'],
]

describe('ipv4ToLong', (it) => {
  it('should return the number of ipv4 correctly', ({ expect }) => {
    IPV4_CASES.forEach(([addr, long]) => {
      expect(ipv4ToLong(addr)).toBe(long)
    })
    expect(ipv4ToLong('240.0.0.0')).toBe(0xf0000000)
    expect(ipv4ToLong('1.1.1.1')).toBe(0x01010101)
  })
})

describe('ipv6ToLong', (it) => {
  it('should return the number of ipv6 correctly', ({ expect }) => {
    IPV6_CASES.forEach(([addr, long]) => {
      expect(ipv6ToLong(addr)).toBe(BigInt(long))
    })
  })
})