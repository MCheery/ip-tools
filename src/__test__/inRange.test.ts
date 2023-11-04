import { describe } from 'vitest'
import { ipInRange } from '../inRange'

describe('ipInRange', (it) => {
  it('should return true if address is in reserved range', ({ expect }) => {
    expect(ipInRange('192.0.0.0', ['192.0.0.0', '192.0.0.0'])).toBe(true)
    expect(ipInRange('192.0.0.0', ['192.0.0.0', '193.0.0.0'])).toBe(true)
    expect(ipInRange('192.2.123.1', ['191.0.0.0', '193.0.0.0'])).toBe(true)
    expect(ipInRange('2000::3', ['2000::', '2000::4'])).toBe(true)
    expect(ipInRange('2::3', ['1::', '2::4'])).toBe(true)
  })

  it('should return true if address is in reserved range', ({ expect }) => {
    expect(ipInRange('192.0.0.0', ['193.0.0.0', '191.0.0.0'])).toBe(false)
    expect(ipInRange('192.0.0.0', ['193.0.0.0', '200.0.0.0'])).toBe(false)
    expect(ipInRange('192.2.123.1', ['0.0.0.0', '3.0.0.0'])).toBe(false)
    expect(ipInRange('2000::3', ['2001::', '2000::2'])).toBe(false)
    expect(ipInRange('2::3', ['1::', '2::2'])).toBe(false)
  })
})
