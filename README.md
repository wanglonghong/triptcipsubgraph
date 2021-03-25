# triptcipsubgraph

Triptcip Subgraph
This is a subgraph for Triptcip.

Events and Contracts

Rinkeby Contract : 0x26c9100736344315484cbA3fa1956Da482E6B9a3

Most events are included and tracked in the subgraph. The following events were not tracked:

CreateToken(uint256,indexed address,indexed uint256,uint256)
AuctionCreate(uint256,indexed address,indexed uint256,uint256)
AuctionCreate(uint256,indexed address,indexed uint256,uint256)
AuctionClaim(uint256,indexed address,indexed uint256)

Clone this repository, and run the following:

yarn 
yarn codegen 
yarn build 
yarn deploy 

{ 
  tokens(first: 5) { 
    id 
    owner 
    tokenId 
    timestamp 
  } 
}
