import { Hex } from 'viem'

export const shortenHexString = (hexString: Hex, end = 4) =>
  `${hexString.substring(0, 4)}....${hexString.substring(hexString.length - end)}`
