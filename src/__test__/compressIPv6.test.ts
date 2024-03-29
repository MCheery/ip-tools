import { describe } from 'vitest'
import { compressIPv6 } from '../compressIPv6'

const CASES: Array<[string, string]> = [
  ['2000::1', '2000:0000:0000:0000:0000:0000:0000:0001'],
  ['2000::', '2000:0000:0000:0000:0000:0000:0000:0000'],
  ['2::', '0002:0000:0000:0000:0000:0000:0000:0000'],
  ['::fe', '0000:0000:0000:0000:0000:0000:0000:00fe'],
  ['::fef3', '0000:0000:0000:0000:0000:0000:0000:fef3'],
  ['2001:db8::1', '2001:0db8:0000:0000:0000:0000:0000:0001'],
  ['2001:db8::ff', '2001:0db8:0000:0000:0000:0000:0000:00ff'],
  ['2001:db8::', '2001:0db8:0000:0000:0000:0000:0000:0000'],
  ['2001:db8:d3::211', '2001:0db8:00d3:0000:0000:0000:0000:0211'],
  ['2001:db8:d3::5312:211', '2001:0db8:00d3:0000:0000:0000:5312:0211'],
]

describe('compressIPv6', (it) => {
  it('should expand IPv6 address correctly', ({ expect }) => {
    CASES.forEach(([output, input]) => {
      expect(compressIPv6(input)).toBe(output)
    })
  })
})
