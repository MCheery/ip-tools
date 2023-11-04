export function longToIpv4(num: number): string {
  const segs: number[] = new Array(4)
  for (let i = 0; i < 4; i++) {
    segs[3 - i] =(num & 0b11111111)
    num >>= 8
  }
  return segs.join('.')
}

export function longToIpv6(num: bigint): string {
  const segs: string[] = new Array(8)
  const offset = BigInt(16)
  for (let i = 0; i < 8; i++) {
    segs[7 - i] = (num & BigInt(0xffff)).toString(16)
    num >>= offset
  }
  return segs.join(':')
}