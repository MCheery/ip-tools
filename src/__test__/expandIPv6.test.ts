import { describe } from 'vitest'
import { expandIPv6 } from '../expandIPv6'

describe('expandIPv6', (it) => {
  it('should expand IPv6 address correctly', ({ expect }) => {
    expect(expandIPv6('2000::')).toBe('2000:0000:0000:0000:0000:0000:0000:0000')
    expect(expandIPv6('2::')).toBe('0002:0000:0000:0000:0000:0000:0000:0000')
    expect(expandIPv6('::fe')).toBe('0000:0000:0000:0000:0000:0000:0000:00fe')
    expect(expandIPv6('::fef3')).toBe('0000:0000:0000:0000:0000:0000:0000:fef3')
    expect(expandIPv6('2001:db8::1')).toBe('2001:0db8:0000:0000:0000:0000:0000:0001')
    expect(expandIPv6('2001:db8::ff')).toBe('2001:0db8:0000:0000:0000:0000:0000:00ff')
    expect(expandIPv6('2001:db8::0')).toBe('2001:0db8:0000:0000:0000:0000:0000:0000')
    expect(expandIPv6('2001:db8:d3::211')).toBe('2001:0db8:00d3:0000:0000:0000:0000:0211')
    expect(expandIPv6('2001:db8:d3::211')).toBe('2001:0db8:00d3:0000:0000:0000:0000:0211')
    expect(expandIPv6('2001:db8:d3::5312:211')).toBe('2001:0db8:00d3:0000:0000:0000:5312:0211')
    expect(expandIPv6('2001:db8:d3::5312:211')).toBe('2001:0db8:00d3:0000:0000:0000:5312:0211')
  })
})