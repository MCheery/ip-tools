export function netArgsAdapter(arg1: string, arg2?: number | string): [string, number] {
  let addr: string
  let maskLen: number
  if (arg2 === undefined) {
    const [addrStr, maskLenStr] = arg1.split('/')
    addr = addrStr
    maskLen = parseInt(maskLenStr)
  } else {
    addr = arg1
    maskLen = parseInt(arg2.toString())
  }
  return [addr, maskLen]
}

export function ipRangeArgsAdapter(arg1: string, arg2: string | [string, string | undefined], arg3?: string): [string, string, string | undefined] {
  let address: string
  let start: string
  let end: string | undefined
  if (Array.isArray(arg2)) {
    address = arg1
    start = arg2[0]
    end = arg2[1]
  } else {
    address = arg1
    start = arg2
    end = arg3
  }
  return [address, start, end]
}