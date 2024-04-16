import { describe } from 'vitest'
import { contains } from '../contains'

const IPV4_RIGHT_CASES: Array<[string, string]> = [
  ['192.1.1.1', '192.0.0.0/8'],
]

const IPV4_FAIL_CASES: Array<[string, string]> = [
  ['192.1.1.1', '192.0.0.0/16'],
]

const IPV6_RIGHT_CASES: Array<[string, string]> = [
  ['2001:db8:0001::', '2001:db8::/32'],
]

const IPV6_FAIL_CASES: Array<[string, string]> = [
  ['2001:db8:0001:', '2001:db8::/64'],
]

const INVALID_CASES: Array<[string, string]> = [
  ['aaa', 'bbb'],
  ['aaa', '192.0.0.0/8'],
  ['192.0.0.0', 'bbb'],
]

describe('contains', (it) => {
  it('should return true for valid IPv4 addresses', ({ expect }) => {
    IPV4_RIGHT_CASES.forEach(([ip, network]) => {
      expect(contains(ip, network)).toBe(true)
    })
  })

  it('should return false for invalid IPv4 addresses', ({ expect }) => {
    IPV4_FAIL_CASES.forEach(([ip, network]) => {
      expect(contains(ip, network)).toBe(false)
    })
  })

  it('should return true for valid IPv6 addresses', ({ expect }) => {
    IPV6_RIGHT_CASES.forEach(([ip, network]) => {
      expect(contains(ip, network)).toBe(true)
    })
  })

  it('should return false for invalid IPv6 addresses', ({ expect }) => {
    IPV6_FAIL_CASES.forEach(([ip, network]) => {
      expect(contains(ip, network)).toBe(false)
    })
  })

  it('should return false for invalid input', ({ expect }) => {
    INVALID_CASES.forEach(([ip, network]) => {
      expect(contains(ip, network)).toBe(false)
    })
  })
})