import { BigInt, ByteArray } from "@graphprotocol/graph-ts"
import { log } from '@graphprotocol/graph-ts'
import {
  Triptcip,
  Approval,
  ApprovalForAll,
  AuctionClaim,
  AuctionCreate,
  AuctionPlaceBid,
  CreateToken,
  OwnershipTransferred,
  Paused,
  Transfer,
  Unpaused
} from "../generated/Triptcip/Triptcip"
import { Token, Auction, AuctionBid, AuctionClaim as AuctionClaimEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleAuctionClaim(event: AuctionClaim): void {
  let newClaimId = concat(event.params.owner, event.params.tokenId).toHex()
  let entity = AuctionClaimEntity.load(newClaimId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new AuctionClaimEntity(newClaimId)
  }

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.tokenId = event.params.tokenId
  entity.timestamp = event.params.timestamp
  
  // Entities can be written to the store with `.save()`
  entity.save()

}

export function handleAuctionCreate(event: AuctionCreate): void {
  let newAuctionId = concat(event.params.owner, event.params.tokenId).toHex()
  let entity = Auction.load(newAuctionId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Auction(newAuctionId)
  }

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.tokenId = event.params.tokenId
  entity.timestamp = event.params.timestamp
  entity.reservePrice = event.params.reservePrice

  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleAuctionPlaceBid(event: AuctionPlaceBid): void {
  let newBidId = concat(event.params.owner, event.params.tokenId).toHex()
  let entity = AuctionBid.load(newBidId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new AuctionBid(newBidId)
  }

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.tokenId = event.params.tokenId
  entity.timestamp = event.params.timestamp
  entity.amount = event.params.amount
  entity.deadline = event.params.deadline

  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleCreateToken(event: CreateToken): void {
  let newTokenId = concat(event.params.owner, event.params.tokenId).toHex()
  let entity = Token.load(newTokenId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Token(newTokenId)
  }

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.tokenId = event.params.tokenId
  entity.timestamp = event.params.timestamp
  entity.royalty = event.params.royalty

  // Entities can be written to the store with `.save()`
  entity.save()

}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleTransfer(event: Transfer): void {}

export function handleUnpaused(event: Unpaused): void {}


function concat(a: ByteArray, b: BigInt): ByteArray {
  let out = new Uint8Array(a.length + b.length);
  for (let i = 0; i < a.length; i++) {
    out[i] = a[i];
  }
  for (let j = 0; j < b.length; j++) {
    out[a.length + j] = b[j];
  }
  return out as ByteArray;
}
