import { describe } from 'vitest'
import { isIPv4, isIPv6 } from '../isValidIP'

const IPV4_TRUE_CASES = [
  '1.1.1.1',
  '0.0.0.0',
  '255.255.255.255',
  '1.10.23.123',
  '192.168.1.1'
]

const IPV4_FALSE_CASES = [
  '1',
  '1.1',
  '1.1.1',
  '',
  '1.2.3.256',
  '256.0.0.0',
  '192.-168.1.1',
  'hello',
]

const IPV6_TRUE_CASES = [
  '1:1:1:1:1:1:1:1',
  '11::',
  '::11',
  '11::2',
  'ff::fe:2',
  '::',
  '0000::',
  '0::',
  '::123',
]

const IPV6_FALSE_CASES = [
  '1',
  '1:1',
  '1:1:1',
  '1:1:1:1',
  '1:1:1:1:1',
  '1:1:1:1:1:1',
  '1:1:1:1:1:1:1',
  '',
  'ff::g',
  'ffg::',
  '0:12345::',
  '0::2::',
  'hello',
]

describe('isIPv4', (it) => {
  it('should return true for valid IPv4 addresses', ({ expect }) => {
    IPV4_TRUE_CASES.forEach((str) => {
      expect(isIPv4(str)).toBe(true)
    })
  })

  it('should return false for invalid IPv4 addresses', ({ expect }) => {
    IPV4_FALSE_CASES.forEach((str) => {
      expect(isIPv4(str)).toBe(false)
    })
  })
})

describe('isIPv6', (it) => {
  it('should return true for valid IPv6 addresses', ({ expect }) => {
    IPV6_TRUE_CASES.forEach((str) => {
      expect(isIPv6(str)).toBe(true)
    })
  })

  it('should return false for invalid IPv6 addresses', ({ expect }) => {
    IPV6_FALSE_CASES.forEach((str) => {
      expect(isIPv6(str)).toBe(false)
    })
  })
})