import { Hex } from 'viem'
import { useChainId, useChains } from 'wagmi'

export const useExplorerAddressLink = (address: Hex): string | undefined => {
  const chains = useChains()
  const chainId = useChainId()
  const currentChain = chains.find((chain) => chain.id === chainId)

  if (!currentChain || !currentChain.blockExplorers?.default) {
    return undefined
  }
  return `${currentChain.blockExplorers.default.url}/address/${address}`
}