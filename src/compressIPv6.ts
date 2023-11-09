import { decompressIPv6 } from './decompressIPv6';

export function compressIPv6(address: string): string {
  const segs = decompressIPv6(address).split(':')
  let l = -1, r = -1
  let i = 0, j = 0
  let flag = false
  while (j <= segs.length) {
    if (segs[j] === '0000') {
      if (!flag) {
        flag = true
        i = j
      }
    } else {
      if (flag) {
        flag = false
        if (j - i > r - l) {
          l = i
          r = j
        }
      }
    }
    j++
  }

  if (l === -1) return segs.map(seg => seg.replace(/^0+/, '')).join(':')

  const leftSegs = segs.slice(0, l).map(seg => seg.replace(/^0+/, ''))
  const rightSegs = segs.slice(r).map(seg => seg.replace(/^0+/, ''))
  return `${leftSegs.join(':')}::${rightSegs.join(':')}`
}
