import React from 'react'

const MintedItems = ({ props }) => {

  return (
    <>
      <div className="card">
        <div className="NFT-image">
          <img src={props.image} alt="" />
        </div>
        <div className="NFT-owner-address">
          <p>{props.owner.slice(0, 20)}...</p>
        </div>
      </div>
    </>
  )
}

export default MintedItems