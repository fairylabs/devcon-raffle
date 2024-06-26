import { AuctionState, useAuctionState } from '@/blockchain/hooks/useAuctionState'
import { Colors } from '@/styles/colors'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { ConnectWalletWarning } from './ConnectWalletWarning'
import { BidFlow } from './bid/BidFlow'
import { AwaitingResults } from '@/components/userActious/claim/AwaitingResults'
import { ClaimingClosed } from '@/components/userActious/claim/ClaimingClosed'
import { BidAwaiting } from '@/components/userActious/BidAwaiting'
import { WrongNetworkWarning } from './WrongNetworkWarning'
import { ClaimingFlow } from '@/components/userActious/claim/ClaimingFlow'
import { MediaQueries } from '@/styles/mediaQueries'

const UserActions: Record<AuctionState, () => ReactElement> = {
  AwaitingBidding: BidAwaiting,
  WalletNotConnected: ConnectWalletWarning,
  WrongNetwork: WrongNetworkWarning,
  BiddingFlow: BidFlow,
  AwaitingResults: AwaitingResults,
  ClaimingFlow: ClaimingFlow,
  ClaimingClosed: ClaimingClosed,
}

export const UserActionSection = () => {
  const state = useAuctionState()
  if (!state) {
    return <Wrapper />
  }

  const Content = UserActions[state]
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-left: -170px;
  width: 724px;
  height: 450px;
  background-color: ${Colors.Pink};
  position: relative;
  z-index: 1;
  justify-content: center;
  align-items: center;

  ${MediaQueries.large} {
    width: calc(100% + 96px);
    height: max-content;
    min-height: 500px;
    margin-left: -48px;
    padding: 40px;
  }

  ${MediaQueries.medium} {
    width: 100%;
    height: 100%;
    margin-left: 0;
    padding: 32px;
  }
`
