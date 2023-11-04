/**
 * Expand IPv6 address
 * @param address string of IPv6 address
 * @returns string of expanded IPv6 address
 * @example expandIPv6('2001:db8::1') -> '2001:0db8:0000:0000:0000:0000:0000:0001'
 */
export function expandIPv6(address: string): string {
  const segs = address.split(':')
  let omitPointer = segs.findIndex((seg) => seg === '')
  if (omitPointer === -1) {
    return segs.map((seg) => seg.padStart(4, '0')).join(':')
  }

  const expands = new Array<string>(8)
  const omitCount = 8 - segs.length + 1
  let i = 0
  while (i < omitPointer) {
    expands[i] = segs[i].padStart(4, '0')
    i += 1
  }
  expands.fill('0000', omitPointer, omitPointer + omitCount)
  i += omitCount
  while (i < 8) {
    expands[i] = segs[i - omitCount + 1].padStart(4, '0')
    i += 1
  }
  return expands.join(':')
}