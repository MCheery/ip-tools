export function ipv4FromLong(num: number): string {
  const segs: number[] = new Array(4)
  for (let i = 0; i < 4; i++) {
    segs[3 - i] = (num & 0b11111111)
    num >>= 8
  }
  return segs.join('.')
}

export function ipv6FromLong(num: bigint): string {
  const segs: string[] = new Array(8)
  const offset = BigInt(16)
  const unit = BigInt(0xffff)
  for (let i = 0; i < 8; i++) {
    segs[7 - i] = (num & unit).toString(16).padStart(4, '0')
    num >>= offset
  }
  return segs.join(':')
}

export function fromLong(num: number | bigint): string {
  if (typeof num === 'bigint') {
    if (num < 0 || num > BigInt('0xffffffffffffffffffffffffffffffff')) return ''
    return ipv6FromLong(num)
  }

  if (num < 0 || num > 0xffffffff) return ''
  return ipv4FromLong(num)
}