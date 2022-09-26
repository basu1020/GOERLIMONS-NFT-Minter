import React, { useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import MintedItems from './MintedItems'
import GoerliThugs from '../contractjson.json'
import userContext from './Context/userContext'

const Minter = () => {
  const context = useContext(userContext)
  const { provider, signer, account, walletError, setWalletError } = context
  const [count, setCount] = useState(null)
  const [loading, setLoading] = useState(true)
  const [NFTArray, setNFTArray] = useState([])
  
  const contractAddress = '0xf4ee808d9876868D7670AD998988b053a472E608'
  const monContractAddress = ''
  const contractGetter = new ethers.Contract(contractAddress, GoerliThugs.abi, provider)
  const contractSetter = new ethers.Contract(contractAddress, GoerliThugs.abi, signer)

  const getCount = async () => {
    const number = await contractGetter.getCurrentTokenID()
    setCount(parseInt(number))
  }

  const thugsContentId = 'QmTJ8AqFrAnG4vyCz1wuNWEhxVPGGJzsXcJWEiTAPa75Xh' // folder ipfs address 
  const monContentId = '' 

  const MintNFT = async () => {
    const upcomingId = count
    const metadataURI = `${upcomingId}.json`

    if (account) {
      try {
        const result = await contractSetter.mint(metadataURI, {
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
          let res = `ipfs://${thugsContentId}/${i}.json`
          let resOwner = await contractGetter.ownerOf(i);
          let obj = {
            id: i,
            name: String(res.name),
            desription: String(res.desription),
            owner: resOwner,
            image: `https://gateway.pinata.cloud/ipfs/${thugsContentId}/${i}.png`
          };
          sampleArray.push(obj);
        }
        setNFTArray(sampleArray)
        setLoading(false)
      }
      func()
    }
  }, [count])

  return (
    <>
      <div className="container">
        <div className="displayImg">
          <img src="https://i.ibb.co/k8vnjJQ/18.png" alt="18" border="0" />
          <img src="https://i.ibb.co/N2QJCvB/19.png" alt="19" border="0" />
          <img src="https://i.ibb.co/37hHV6b/20.png" alt="20" border="0" />
          <img src="https://i.ibb.co/jh51Mrb/12.png" alt="12" border="0" />
          <img src="https://i.ibb.co/sbZCbJP/14.png" alt="14" border="0" />
          <img src="https://i.ibb.co/m6gNNsp/15.png" alt="15" border="0" />
        </div>
        <p>Address - {contractAddress}</p>
        <p>Get your friendly neibhourhood GoerliMons NOW!!</p>
        <p></p>

        {window.ethereum && <button onClick={MintNFT}>
          MINT FOR 0.0001 <i class="fa-brands fa-ethereum"></i>
        </button>}
        {walletError &&  <p style={{display: "inline-block", backgroundColor: "red", color:"white", borderRadius: "20px", marginTop:"10px"}}>{walletError}</p>}
        {!window.ethereum &&
        <a href='https://metamask.io/download/' target={"_blank"}>
        <button> INSTALL METAMASK </button>
        </a>}
        {count && <p>Total NFTs Minted - {count}/20</p>}
      </div>

      <div className="container">
        { window.ethereum && <p> List of THUGS minted with the addresses currently holding. {loading ? "(loading...)" : ""} </p>}
        {<div className="minted-items">
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