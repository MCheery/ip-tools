import { IPVersion } from './enums/ipVersion'

const v4Seg = '(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])'
const v4Str = `(?:${v4Seg}\\.){3}${v4Seg}`
const ipv4Reg = new RegExp(`^${v4Str}$`)

const v6Seg = '(?:[0-9a-fA-F]{1,4})'
const ipv6Reg = new RegExp(
  '^(?:' +
  `(?:${v6Seg}:){7}(?:${v6Seg}|:)|` +
  `(?:${v6Seg}:){6}(?:${v4Str}|:${v6Seg}|:)|` +
  `(?:${v6Seg}:){5}(?::${v4Str}|(?::${v6Seg}){1,2}|:)|` +
  `(?:${v6Seg}:){4}(?:(?::${v6Seg}){0,1}:${v4Str}|(?::${v6Seg}){1,3}|:)|` +
  `(?:${v6Seg}:){3}(?:(?::${v6Seg}){0,2}:${v4Str}|(?::${v6Seg}){1,4}|:)|` +
  `(?:${v6Seg}:){2}(?:(?::${v6Seg}){0,3}:${v4Str}|(?::${v6Seg}){1,5}|:)|` +
  `(?:${v6Seg}:){1}(?:(?::${v6Seg}){0,4}:${v4Str}|(?::${v6Seg}){1,6}|:)|` +
  `(?::(?:(?::${v6Seg}){0,5}:${v4Str}|(?::${v6Seg}){1,7}|:))` +
  ')(?:%[0-9a-zA-Z-.:]{1,})?$'
)

export function isIPv4(s: string): boolean {
  return ipv4Reg.test(s)
}

export function isIPv6(s: string): boolean {
  return ipv6Reg.test(s)
}

export function getIPVersion(s?: string): IPVersion {
  if (!s) return IPVersion.Unknown

  if (isIPv4(s)) return IPVersion.IPv4
  if (isIPv6(s)) return IPVersion.IPv6
  return IPVersion.Unknown
}