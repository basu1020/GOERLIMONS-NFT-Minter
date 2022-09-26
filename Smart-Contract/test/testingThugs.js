const ethers = require('ethers')

const address = '0xf4ee808d9876868D7670AD998988b053a472E608'

const abi = [
    'function getCurrentTokenID() public view returns(uint256)',
    'function tokenURI(uint256 tokenId) public view returns(string memory)'
]

// const realAbi = require('../artifacts/contracts/NFT.sol/MyNFT.json')

const web3provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/wiA2KhT0atCCb-eSKU_t6rinXMSpPwP2')
const wallet = new ethers.Wallet('82251bb09dd146c54ee888780171ba19fd2962b53c4275ebd10bf885d6e615ac')
const connectedWallet = wallet.connect(web3provider)


const contractInstance = new ethers.Contract(address, abi, web3provider)

const main = async () => {
    const metadata = await contractInstance.connect(connectedWallet).tokenURI(3)
    console.log(metadata)
}

main()