import { describe } from 'vitest'
import { decompressIPv6 } from '../decompressIPv6'
import { getBroadcastAddress } from '../getBroadcastAddress'

const IPV4_CASES = [
  ['192.168.2.1/8', '192.255.255.255'],
  ['177.255.255.255/24', '177.255.255.255'],
  ['255.255.255.255/31', '255.255.255.255'],
  ['255.255.255.255/32', '255.255.255.255'],
  ['177.255.255.255/-1', ''],
  ['177.255.255.255/33', ''],
  ['177.255.255.255/0', '255.255.255.255'],
]

const IPV6_CASES = [
  ['2000::/8', '20ff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'],
  ['1999::/8', '19ff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'],
  ['1984::/16', '1984:ffff:ffff:ffff:ffff:ffff:ffff:ffff'],
  ['1984::23:12/16', '1984:ffff:ffff:ffff:ffff:ffff:ffff:ffff'],
  ['::1/8', '00ff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'],
  ['8000::1/1', 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'],
  ['::1:efef/124', '::1:efef'],
  ['::1:1111/124', '::1:111f'],
  ['::/0', 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'],
  ['::/129', ''],
  ['::/-1', ''],
]

describe('getBroadcastAddress', (it) => {
  it('should return the broadcast addressv4', ({ expect }) => {
    IPV4_CASES.forEach(([input, output]) => {
      expect(getBroadcastAddress(input)).toBe(output)
    })
  })

  it('should return the broadcast addressv6', ({ expect }) => {
    IPV6_CASES.forEach(([input, output]) => {
      expect(getBroadcastAddress(input)).toBe(decompressIPv6(output))
    })
  })
})