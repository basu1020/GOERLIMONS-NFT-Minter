import React from 'react'

const MintedItems = ({ props }) => {

  return (
    <>
      <div className="card">
        <div className="NFT-image">
          <img src={props.image} alt="" />
        </div>
        <div className="NFT-owner-address">
          <p>{props.owner}</p>
          <p>id - {props.id}</p>
        </div>
      </div>
    </>
  )
}

export default MintedItems