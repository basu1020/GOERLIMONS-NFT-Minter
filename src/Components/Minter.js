import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import MintedItems from './MintedItems'
import GoerliThugs from '../contractjson.json'

const Minter = () => {
  const [count, setCount] = useState(null)
  const [NFTArray, setNFTArray] = useState([])
  const contractAddress = '0xf4ee808d9876868D7670AD998988b053a472E608'
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(contractAddress, GoerliThugs.abi, signer)

  const getCount = async () => {
    const number = await contract.getCurrentTokenID()
    setCount(parseInt(number))
  }

  const contentId = 'QmTJ8AqFrAnG4vyCz1wuNWEhxVPGGJzsXcJWEiTAPa75Xh'

  const MintNFT = async () => {
    const upcomingId = count
    const metadataURI = `${contentId}/${upcomingId}.json`

    const result = await contract.mint(metadataURI, {
      value: ethers.utils.parseEther('0.0001'),
    });

    await result.wait()
    getCount()
  }

  useEffect(() => {
    if (window.ethereum) {
      getCount()
      let sampleArray = []
      const func = async () => {
        for (let i = 0; i < count; i++) {
          let res = `ipfs://${contentId}/${i}.json`
          let resOwner = await contract.ownerOf(i);
          let obj = {
            id: i,
            name: String(res.name),
            desription: String(res.desription),
            owner: resOwner,
            image: `https://gateway.pinata.cloud/ipfs/${contentId}/${i}.png`
          };
          sampleArray.push(obj);
        }
        setNFTArray(sampleArray)
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
        <p>Get your friendly neibhourhood THUG NOW!!</p>
        <p></p>

        {window.ethereum && <button onClick={MintNFT}>
          MINT FOR 0.0001 <i class="fa-brands fa-ethereum"></i>
        </button>}
        {!window.ethereum && <button> INSTALL METAMASK </button>}
        {count && <p>Total NFTs Minted - {count}/20</p>}
      </div>

      <div className="container">
        <p onClick={() => { console.log(NFTArray) }}> List of THUGS minted with the addresses currently holding. </p>
        <div className="minted-items">
          {NFTArray.map((nft) => {
            return <MintedItems key={nft.id} props={nft} />
          })}
        </div>
      </div>
    </>
  )
}

export default Minter