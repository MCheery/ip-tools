import { IP } from './ip.model'

type Version = 4 | 6

type LongType<V extends Version> = V extends 4 ? number : bigint

export interface Subnet<V extends Version> {
  readonly ip: IP<V>
  readonly address: string
  readonly mask: string
  readonly maskLen: number
  readonly networkAddress: string
  readonly broadcastAddress: string
  readonly addressCount: LongType<V>
  getFirstHost(): IP<V> | null
  getLastHost(): IP<V> | null
  contains(ip: string | IP<V>): boolean
  // TODO: provide the functions about supernet and subnet
  // isSame(subnet: string | Subnet<V>): boolean
  // isSubnetOf(subnet: string | Subnet<V>): boolean
  // isSupernetOf(subnet: string | Subnet<V>): boolean
  [Symbol.iterator](): IterableIterator<string>
}

export interface Subnetv4 extends Subnet<4> {}

export interface Subnetv6 extends Subnet<6> {
  readonly fullAddress: string
}