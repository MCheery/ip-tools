import { describe } from 'vitest'
import { ipv4InReservedRange, ipv6InReservedRange } from '../inReservedRange'
import { RESERVED_IPV4_TYPE, RESERVED_IPV6_TYPE } from '../enums'

const IPV4_IN_CASES: Array<[string, RESERVED_IPV4_TYPE]> = [
  ['0.0.0.0', RESERVED_IPV4_TYPE.THIS_HOST_ON_THIS_NETWORK],
  ['0.0.0.1', RESERVED_IPV4_TYPE.THIS_NETWORK],
  ['10.0.0.0', RESERVED_IPV4_TYPE.PRIVATE_USE],
  ['100.64.0.0', RESERVED_IPV4_TYPE.SHARED_ADDRESS_SPACE],
  ['127.0.0.0', RESERVED_IPV4_TYPE.LOOP_BACK],
  ['169.254.0.0', RESERVED_IPV4_TYPE.LINK_LOCAL],
  ['172.16.0.0', RESERVED_IPV4_TYPE.PRIVATE_USE_2],
  ['192.0.0.0', RESERVED_IPV4_TYPE.IPV4_SERVICE_CONTINUITY_PREFIX],
  ['192.0.0.255', RESERVED_IPV4_TYPE.IETF_PROTOCOL_ASSIGNMENTS],
  ['192.0.0.8', RESERVED_IPV4_TYPE.IPV4_DUMMY_ADDRESS],
  ['192.0.0.9', RESERVED_IPV4_TYPE.PORT_CONTROL_PROTOCOL_ANYCAST],
  ['192.0.0.10', RESERVED_IPV4_TYPE.TRAVERSAL_USING_RELAYS_AROUND_NAT_ANYCAST],
  ['192.0.0.170', RESERVED_IPV4_TYPE.NAT64_DNS64_DISCOVERY],
  ['192.0.0.171', RESERVED_IPV4_TYPE.NAT64_DNS64_DISCOVERY],
  ['192.0.2.0', RESERVED_IPV4_TYPE.DOCUMENTATION_TEST_NET_1],
  ['192.31.196.0', RESERVED_IPV4_TYPE.AS112_V4],
  ['192.52.193.0', RESERVED_IPV4_TYPE.AMT],
  ['192.168.0.0', RESERVED_IPV4_TYPE.PRIVATE_USE_3],
  ['192.175.48.0', RESERVED_IPV4_TYPE.DIRECT_DELEGATION_AS112_SERVICE],
  ['198.18.0.0', RESERVED_IPV4_TYPE.BENCHMARKING],
  ['198.51.100.0', RESERVED_IPV4_TYPE.DOCUMENTATION_TEST_NET_2],
  ['203.0.113.0', RESERVED_IPV4_TYPE.DOCUMENTATION_TEST_NET_3],
  ['255.255.255.255', RESERVED_IPV4_TYPE.LIMITED_BROADCAST],
  ['240.0.0.0', RESERVED_IPV4_TYPE.RESERVED],
  ['172.30.0.1', RESERVED_IPV4_TYPE.PRIVATE_USE_2],
]

const IPV4_OUT_CASES: string[] = [
  '192.2.2.1',
]

const IPV6_IN_CASES: Array<[string, RESERVED_IPV6_TYPE]> = [
  ['::1', RESERVED_IPV6_TYPE.LOOPBACK_ADDRESS],
  ['::', RESERVED_IPV6_TYPE.UNSPECIFIED_ADDRESS],
  ['::ffff:0:0', RESERVED_IPV6_TYPE.IPV4_MAPPED_ADDRESS],
  ['64:ff9b::', RESERVED_IPV6_TYPE.IPV4_IPV6_TRANSLAT],
  ['64:ff9b:1::', RESERVED_IPV6_TYPE.IPV4_IPV6_TRANSLAT],
  ['100::', RESERVED_IPV6_TYPE.DISCARD_ONLY_ADDRESS_BLOCK],
  ['2001::1', RESERVED_IPV6_TYPE.TEREDO],
  ['2001:40::', RESERVED_IPV6_TYPE.IEFE_PROTOCOL_ASSIGNMENTS],
  ['2001:1::1', RESERVED_IPV6_TYPE.PORT_CONTROL_PROTOCOL_ANYCAST],
  ['2001:1::2', RESERVED_IPV6_TYPE.TRAVERSAL_USING_RELAYS_AROUND_NAT_ANYCAST],
  ['2001:2::', RESERVED_IPV6_TYPE.BENCHMARKING],
  ['2001:3::', RESERVED_IPV6_TYPE.AMT],
  ['2001:4:112::', RESERVED_IPV6_TYPE.AS112_V6],
  ['2001:20::', RESERVED_IPV6_TYPE.ORCHID_V2],
  ['2001:30::', RESERVED_IPV6_TYPE.DETS_PREFIX],
  ['2001:db8::', RESERVED_IPV6_TYPE.DOCUMENTATION],
  ['2002::', RESERVED_IPV6_TYPE.IPV6_TO_IPV4],
  ['2620:4f:8000::', RESERVED_IPV6_TYPE.DIRECT_DELEGATION_AS112_SERVICE],
  ['fc00::', RESERVED_IPV6_TYPE.UNIQUE_LOCAL],
  ['fe80::', RESERVED_IPV6_TYPE.LINK_LOCAL_UNICAST],
]

const IPV6_OUT_CASES: string[] = [
  '2333::'
]

describe('ipv4InReservedRange', (it) => {
  it('should return type if address is in reserved range', ({ expect }) => {
    IPV4_IN_CASES.forEach(([address, type]) => {
      expect(ipv4InReservedRange(address)).toBe(type)
    })
  })

  it('should return 0 if address is not in reserved range', ({ expect }) => {
    IPV4_OUT_CASES.forEach((address) => {
      expect(ipv4InReservedRange(address)).toBe(RESERVED_IPV4_TYPE.NONE)
    })
  })
})

describe('ipv6InReservedRange', (it) => {
  it('should return type if address is in reserved range', ({ expect }) => {
    IPV6_IN_CASES.forEach(([address, type]) => {
      expect(ipv6InReservedRange(address)).toBe(type)
    })
  })

  it('should return 0 if address is not in reserved range', ({ expect }) => {
    IPV6_OUT_CASES.forEach((address) => {
      expect(ipv6InReservedRange(address)).toBe(RESERVED_IPV6_TYPE.NONE)
    })
  })
})
