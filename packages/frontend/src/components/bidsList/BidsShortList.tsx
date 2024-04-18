import { useMemo } from 'react'
import styled from 'styled-components'
import { Bid, bidToBidWithPlace, BidWithPlace } from '@/types/bid'
import { useUserBid } from '@/blockchain/hooks/useUserBid'
import { Colors } from '@/styles/colors'
import { useReadAuctionParams } from '@/blockchain/hooks/useReadAuctionParams'
import { useBids } from '@/providers/BidsProvider'
import { useContractState } from '@/blockchain/hooks/useAuctionState'
import { Separator } from '@/components/common/Separator'
import { BidListEntry } from '@/components/common/BidListEntry'
import { isAuctionSettled } from '@/utils/isAuctionSettled'
import { getFirstRaffleBidIndex } from '@/utils/getFirstRaffleBidIndex'
import { BidListContainer } from '@/components/common/BidListContainer'

const topAuctionBidsCount = 3
const bidsMaxCount = topAuctionBidsCount + 1

export const BidsShortList = () => {
  const userBid = useUserBid()
  const { auctionWinnersCount, raffleWinnersCount } = useReadAuctionParams()
  const { state } = useContractState()
  const { bidList: allBids } = useBids()

  const bidsShortList = useMemo(
    () => selectBids(auctionWinnersCount, allBids, userBid),
    [auctionWinnersCount, allBids, userBid],
  )

  const participatesInAuction = useMemo(() => {
    return isAuctionParticipant(userBid, auctionWinnersCount, raffleWinnersCount, allBids.length)
  }, [auctionWinnersCount, allBids.length, raffleWinnersCount, userBid])

  return (
    <>
      <BidListContainer>
        {bidsShortList.map((bid) => (
          <BidListEntry key={bid.address} bid={bid} isUser={userBid && userBid.address === bid.address} view="short" />
        ))}
        {!participatesInAuction && userBid && (
          <>
            <Separator color={Colors.Grey} />
            <BidListEntry bid={userBid} isUser view="short" />
          </>
        )}
      </BidListContainer>
      {userBid && !isAuctionSettled(state) && (
        <BidListText>You’re taking part in the {participatesInAuction ? 'auction' : 'raffle'}!</BidListText>
      )}
    </>
  )
}

function isAuctionParticipant(
  userBid: BidWithPlace | undefined,
  auctionWinnersCount: number | undefined,
  raffleWinnersCount: number | undefined,
  bidsLength: number,
) {
  if (!userBid || !raffleWinnersCount || !auctionWinnersCount) {
    return false
  }
  const firstRaffleBidIndex = getFirstRaffleBidIndex(bidsLength, auctionWinnersCount, raffleWinnersCount)
  return userBid.place <= firstRaffleBidIndex
}

function selectBids(
  auctionWinnersCount: number | undefined,
  bidList: Bid[],
  userBid: BidWithPlace | undefined,
): BidWithPlace[] {
  if (auctionWinnersCount === undefined) {
    return []
  }

  if (bidList.length <= bidsMaxCount) {
    return bidList.map(bidToBidWithPlace)
  }

  const topAuctionBids = bidList.slice(0, topAuctionBidsCount).map(bidToBidWithPlace)

  const lastAuctionBidIndex = bidList.length > auctionWinnersCount ? auctionWinnersCount - 1 : bidList.length - 1
  const lastAuctionBid = bidToBidWithPlace(bidList[lastAuctionBidIndex], lastAuctionBidIndex)

  return userBid && shouldUserBidBeDisplayed(userBid, lastAuctionBid, auctionWinnersCount)
    ? topAuctionBids.concat([userBid, lastAuctionBid])
    : topAuctionBids.concat([lastAuctionBid])
}

const shouldUserBidBeDisplayed = (userBid: BidWithPlace, lastAuctionBid: Bid, auctionWinnersCount: number) => {
  return !(userBid.address === lastAuctionBid.address) && within(bidsMaxCount, auctionWinnersCount - 1, userBid.place)
}

const within = (...[lower, higher, value]: number[]) => value >= lower && value <= higher

const BidListText = styled.div`
  width: 100%;
  text-align: center;
  background: linear-gradient(90deg, #7ec188 0%, #65c4e8 45.31%, #7779b5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  margin-top: -16px;
`