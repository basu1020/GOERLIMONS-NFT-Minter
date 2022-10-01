import React, { useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import MintedItems from './MintedItems'
import GoerliMons from '../GMON.json'
import userContext from './Context/userContext'

const Minter = () => {
  const context = useContext(userContext)
  const { provider, signer, account, walletError, setWalletError } = context
  const [count, setCount] = useState(null)
  const [loading, setLoading] = useState(true)
  const [NFTArray, setNFTArray] = useState([])
  
  const monContractAddress = '0xF9a04c183f965973A71F529AEbF1dEEbe36E4044'

  const MonContractGetter = new ethers.Contract(monContractAddress, GoerliMons.abi, provider)
  const MonContractSetter = new ethers.Contract(monContractAddress, GoerliMons.abi, signer)

  const getCount = async () => {
    const number = await MonContractGetter.getCurrentTokenID()
    setCount(parseInt(number))
  }

  // const MonContentId_MetaData = 'QmQfX8nNu4HAPMNyXJisRDTE1Lwco7oWeSWqB242RNAA4z' 
  const MonContentId_Images = 'QmTqw4YYbMMeSNjV5WAJ6GPKuPy6VvaNLzzRNLkxUf4Fj1'

  const MintNFT = async () => {
    const upcomingId = count
    const metadataURI = `${upcomingId}.json`

    if (account) {
      try {
        const result = await MonContractSetter.mint(metadataURI, {
          value: ethers.utils.parseEther('0.0001'),
        });
        await result.wait()
        getCount()
      } catch (error) {
        alert(error.message)
      }
    }
    else{
      setWalletError("Please connect the wallet first")
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      getCount()
      let sampleArray = []
      const func = async () => {
        for (let i = 0; i < count; i++) {
          let resOwner = await MonContractGetter.ownerOf(i);
          let obj = {
            id: i,
            owner: resOwner,
            image: `https://ipfs.io/ipfs/${MonContentId_Images}/${i}.png`
          };
          sampleArray.push(obj);
        }
        setNFTArray(sampleArray)
        console.log(NFTArray)
        setLoading(false)
      }
      func()
    }
    // eslint-disable-next-line
  }, [count])

  return (
    <>
      <div className="container">
        <div className="displayImg">
        <p style={{fontSize : '35px'}}>Mint your friendly neibhourhood GOERLIMONS NOW!!</p>
        <img src="https://i.ibb.co/Fn1V7rK/3.png" alt="3" border="0"/>
        <img src="https://i.ibb.co/56pG3bk/6.png" alt="6" border="0"/>
        <img src="https://i.ibb.co/3h000jQ/8.png" alt="8" border="0"/>
        <img src="https://i.ibb.co/LNg1Vjz/13.png" alt="13" border="0"/>
        <img src="https://i.ibb.co/M5MZV9G/16.png" alt="16" border="0"/>
        <img src="https://i.ibb.co/wByRHKM/28.png" alt="28" border="0"/>
        </div>
        <p>Address - {monContractAddress}</p>
        
        <p></p>

        {window.ethereum && <button onClick={MintNFT} >
          MINT FOR 0.0001 <i className="fa-brands fa-ethereum"></i>
        </button>}
        {walletError &&  <p style={{display: "inline-block", backgroundColor: "red", color:"white", borderRadius: "20px", marginTop:"10px"}}>{walletError}</p>}
        {!window.ethereum &&
        <a href='https://metamask.io/download/' rel="noreferrer" target={"_blank"}>
        <button> INSTALL METAMASK </button>
        </a>}
        {count !== null && <p>Total NFTs Minted - {count}/40</p>}
      </div>

      <div className="container">
        { window.ethereum && <p> List of GOERLIMONS minted with their owners. {loading ? "(loading...)" : ""} </p>}
        {<div className="minted-items" onClick={() => {console.log(NFTArray)}}>
          {NFTArray.map((nft) => {
            return <MintedItems key={nft.id} props={nft} />
          })}
        </div>}
        {loading && <p>Loading .....</p>}
      </div>
    </>
  )
}

export default Minter