// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

/***
 * @dev Holds config values used by AuctionRaffle contract.
 * @author TrueFi Engineering team
 */
abstract contract Config {
    struct ConfigParams {
        uint256 biddingStartTime;
        uint256 biddingEndTime;
        uint256 claimingEndTime;
        uint256 auctionWinnersCount;
        uint256 raffleWinnersCount;
        uint256 reservePrice;
        uint256 minBidIncrement;
        address bidVerifier;
    }

    // The use of _randomMask and _bidderMask introduces an assumption on max number of participants: 2^32.
    // The use of _bidderMask also introduces an assumption on max bid amount: 2^224 wei.
    // Both of these values are fine for our use case.
    uint256 constant _randomMask = 0xffffffff;
    uint256 constant _randomMaskLength = 32;
    uint256 constant _winnersPerRandom = 256 / _randomMaskLength;
    uint256 constant _bidderMask = _randomMask;
    uint256 constant _bidderMaskLength = _randomMaskLength;

    uint256 immutable _biddingStartTime;
    uint256 immutable _biddingEndTime;
    uint256 immutable _claimingEndTime;
    uint256 immutable _auctionWinnersCount;
    uint256 immutable _raffleWinnersCount;
    uint256 immutable _reservePrice;
    uint256 immutable _minBidIncrement;

    address immutable _bidVerifier;

    constructor(ConfigParams memory params) {
        uint256 biddingStartTime_ = params.biddingStartTime;
        uint256 biddingEndTime_ = params.biddingEndTime;
        uint256 claimingEndTime_ = params.claimingEndTime;
        uint256 auctionWinnersCount_ = params.auctionWinnersCount;
        uint256 raffleWinnersCount_ = params.raffleWinnersCount;
        uint256 reservePrice_ = params.reservePrice;
        uint256 minBidIncrement_ = params.minBidIncrement;
        address bidVerifier_ = params.bidVerifier;

        require(auctionWinnersCount_ > 0, "Config: auction winners count must be greater than 0");
        require(raffleWinnersCount_ > 0, "Config: raffle winners count must be greater than 0");
        require(raffleWinnersCount_ % _winnersPerRandom == 0, "Config: invalid raffle winners count");
        require(biddingStartTime_ < biddingEndTime_, "Config: bidding start time must be before bidding end time");
        require(biddingEndTime_ < claimingEndTime_, "Config: bidding end time must be before claiming end time");
        require(reservePrice_ > 0, "Config: reserve price must be greater than 0");
        require(minBidIncrement_ > 0, "Config: min bid increment must be greater than 0");
        require(
            biddingEndTime_ - biddingStartTime_ >= 6 hours,
            "Config: bidding start time and bidding end time must be at least 6h apart"
        );
        require(
            claimingEndTime_ - biddingEndTime_ >= 6 hours,
            "Config: bidding end time and claiming end time must be at least 6h apart"
        );

        _biddingStartTime = biddingStartTime_;
        _biddingEndTime = biddingEndTime_;
        _claimingEndTime = claimingEndTime_;
        _auctionWinnersCount = auctionWinnersCount_;
        _raffleWinnersCount = raffleWinnersCount_;
        _reservePrice = reservePrice_;
        _minBidIncrement = minBidIncrement_;

        require(bidVerifier_ != address(0), "Config: invalid verifier");
        _bidVerifier = bidVerifier_;
    }

    function biddingStartTime() external view returns (uint256) {
        return _biddingStartTime;
    }

    function biddingEndTime() external view returns (uint256) {
        return _biddingEndTime;
    }

    function claimingEndTime() external view returns (uint256) {
        return _claimingEndTime;
    }

    function auctionWinnersCount() external view returns (uint256) {
        return _auctionWinnersCount;
    }

    function raffleWinnersCount() external view returns (uint256) {
        return _raffleWinnersCount;
    }

    function reservePrice() external view returns (uint256) {
        return _reservePrice;
    }

    function minBidIncrement() external view returns (uint256) {
        return _minBidIncrement;
    }

    function bidVerifier() external view returns (address) {
        return _bidVerifier;
    }
}
