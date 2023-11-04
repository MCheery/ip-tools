import { describe } from 'vitest'
import { ipv4ToLong, ipv6ToLong } from '../toLong'

describe('toLong', (it) => {
  it('should return the number of ipv4 correctly', ({ expect }) => {
    expect(ipv4ToLong('240.0.0.0')).toBe(0xf0000000)
    expect(ipv4ToLong('1.1.1.1')).toBe(0x01010101)
  })

  it('should return the number of ipv6 correctly', ({ expect }) => {
    expect(ipv6ToLong('ffff::')).toBe(BigInt(0xffff0000000000000000000000000000))
    expect(ipv6ToLong('f000::')).toBe(BigInt(0xf0000000000000000000000000000000))
  })
})