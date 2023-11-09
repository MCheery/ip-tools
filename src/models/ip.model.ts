import { Subnetv4, Subnetv6 } from './subnet.model'

type Version = 4 | 6

type LongType<V extends Version> = V extends 4 ? number : bigint
type SubnetType<V extends Version> = V extends 4 ? Subnetv4 : Subnetv6
type IPVersion<V extends Version> = V extends 4 ? IPv4 : IPv6

export interface IP<V extends Version> {
  readonly address: string
  readonly long: LongType<V>
  containedBy(network: string | SubnetType<V>): boolean
  isSame(ip: string | this): boolean
  inRange(start: string | this, end?: string | this): boolean
  inReservedRange(): number
  getOctet(index: number): string
  getOctets(): string[]
  next(step?: number): IPVersion<V>
  prev(step?: number): IPVersion<V>
}

export interface IPv4 extends IP<4> {}

export interface IPv6 extends IP<6> {
  readonly fullAddress: string
}
