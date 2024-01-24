import { describe } from 'vitest'
import { getNetworkAddress } from '../getNetworkAddress'
import { decompressIPv6 } from '../decompressIPv6'

const IPV4_CASES = [
  ['192.168.2.1/8', '192.0.0.0'],
  ['177.255.255.255/24', '177.255.255.0'],
  ['255.255.255.255/31', '255.255.255.254'],
  ['255.255.255.255/32', '255.255.255.255'],
  ['177.255.255.255/-1', ''],
  ['177.255.255.255/33', ''],
]

const IPV6_CASES = [
  ['2000::/8', '2000::'],
  ['1999::/8', '1900::'],
  ['1984::/16', '1984::'],
  ['1984::23:12/16', '1984::'],
  ['::1/8', '::'],
  ['f000::1/1', '8000::'],
  ['::1:efef/124', '::1:efe0'],
]

describe('getNetworkAddress', (it) => {
  it('should return the network addressv4', ({ expect }) => {
    IPV4_CASES.forEach(([input, output]) => {
      expect(getNetworkAddress(input)).toBe(output)
    })
  })

  it('should return the network addressv6', ({ expect }) => {
    IPV6_CASES.forEach(([input, output]) => {
      expect(getNetworkAddress(input)).toBe(decompressIPv6(output))
    })
  })
})