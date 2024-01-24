# ip-tools
some useful functions to IP(IPv4 and IPv6)

## Usage
```js
// IP Object
const ip = ipv4('192.168.0.1')
ip.address // 192.168.0.1
ip.isValid() // true
ip.inReversedRange() // number
ip.getOctet(2)
ip.getOctets()
ip.containBy(network)

// Subnet Object
const subnet = subnetv4('192.168.1.1/24')
subnet.networkAddress // 192.168.1.0
subnet.broadcastAddress // 192.168.1.255
subnet.firstHost // 192.168.1.1
subnet.lastHost // 192.168.1.254
subnet.mask // 255.255.255.0
subnet.cidrMask // 24
```