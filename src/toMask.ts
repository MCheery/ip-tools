import { ipv4FromLong } from "./fromLong";

export function toMask(maskLen: number): string {
  return ipv4FromLong(0xffffffff << (32 - maskLen))
}