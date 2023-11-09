import { describe } from 'vitest'
import { ipInRange } from '../inRange'

const TRUE_CASES: Array<[string, string, string?]> = [
  ['192.0.0.0', '192.0.0.0', '192.0.0.0'],
  ['192.0.0.0', '192.0.0.0', '193.0.0.0'],
  ['192.2.123.1', '191.0.0.0', '193.0.0.0'],
  ['192.255.255.255', '192.0.0.0'],
  ['2000::3', '2000::', '2000::4'],
  ['2::3', '1::', '2::4'],
  ['ffff::', 'ffff::', 'ffff::1'],
  ['::', '::', '::'],
]

const FALSE_CASES: Array<[string, string, string]> = [
  ['192.0.0.0', '193.0.0.0', '191.0.0.0'],
  ['192.0.0.0', '193.0.0.0', '200.0.0.0'],
  ['192.2.123.1', '0.0.0.0', '3.0.0.0'],
  ['2000::3', '2001::', '2000::2'],
  ['2::3', '1::', '2::2'],
  ['192.1.1.1', '::', 'ffff::'],
  ['192.0.0.0', '', '191.0.0.0'],
  ['192.0.0.0', '193.0.0.0', ''],
  ['', '192.0.0.0', ''],
  ['', '192.0.0.0', '192.0.0.0'],
]

describe('ipInRange', (it) => {
  it('should return true if address is in reserved range', ({ expect }) => {
    TRUE_CASES.forEach(([addr, start, end]) => {
      expect(ipInRange(addr, start, end)).toBe(true)
    })
  })

  it('should return true if address is in reserved range', ({ expect }) => {
    FALSE_CASES.forEach(([addr, start, end]) => {
      expect(ipInRange(addr, start, end)).toBe(false)
    })
  })
})
