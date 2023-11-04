import { describe } from 'vitest'
import { isIPv4, isIPv6 } from '../isValidIP'

describe.skip('isIPv4', (it) => {
  it('should return true for valid IPv4 addresses', ({ expect }) => {
    expect(isIPv4('1.1.1.1')).toBe(true)
    expect(isIPv4('0.0.0.0')).toBe(true)
    expect(isIPv4('255.255.255.255')).toBe(true)
    expect(isIPv4('192.168.1.1')).toBe(true)
  })

  it('should return false for invalid IPv4 addresses', ({ expect }) => {
    expect(isIPv4('1')).toBe(false)
    expect(isIPv4('1.1')).toBe(false)
    expect(isIPv4('1.1.1')).toBe(false)
    expect(isIPv4('1.1.1.1.1')).toBe(false)
    expect(isIPv4('')).toBe(false)
    expect(isIPv4('0.0.0.256')).toBe(false)
    expect(isIPv4('192.-168.1.1')).toBe(false)
  })
})

describe.skip('isIPv6', (it) => {
  it('should return true for valid IPv6 addresses', ({ expect }) => {
    expect(isIPv6('1:1:1:1:1:1:1:1')).toBe(true)
    expect(isIPv6('11::')).toBe(true)
    expect(isIPv6('::11')).toBe(true)
    expect(isIPv6('11::2')).toBe(true)
    expect(isIPv6('ff::fe:2')).toBe(true)
  })

  it('should return false for invalid IPv6 addresses', ({ expect }) => {
    expect(isIPv6('1')).toBe(false)
    expect(isIPv6('1:1')).toBe(false)
    expect(isIPv6('1:1:1')).toBe(false)
    expect(isIPv6('1:1:1:1')).toBe(false)
    expect(isIPv6('1:1:1:1:1')).toBe(false)
    expect(isIPv6('1:1:1:1:1:1')).toBe(false)
    expect(isIPv6('1:1:1:1:1:1:1')).toBe(false)
    expect(isIPv6('')).toBe(false)
    expect(isIPv6('ff::g')).toBe(false)
  })
})