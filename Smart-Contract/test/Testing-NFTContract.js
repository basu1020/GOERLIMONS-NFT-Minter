const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("NFT contract testing", function () {
    let owner;
    let address_one;
    let address_two;
    let adderss_three;
    let addresses;
    let NFTContract;
    let ContractInstance;

    beforeEach("This block will run before each testing block", async () => {
        ContractInstance = await ethers.getContractFactory('MyNFT');
        [owner, address_one, address_two, adderss_three, ...addresses] = await ethers.getSigners()
        NFTContract = await ContractInstance.deploy()
    })

    describe("Contract Deployment", async () => {
        it("should declare the right owner of the contract", async () => {
            expect(await NFTContract.owner()).to.equal(owner.address)
        })

        it("should return the correct Token URI", async () => {
            expect(await NFTContract.getCurrentTokenID()).to.equal(0)
            await NFTContract.mint("0.json", {
                value: ethers.utils.parseEther('0.0001')
            })
            expect(await NFTContract.tokenURI(0)).to.equal("ipfs://QmQfX8nNu4HAPMNyXJisRDTE1Lwco7oWeSWqB242RNAA4z/0.json")
            const currentTOkenURIafterDeplyment = await NFTContract.getCurrentTokenID()
            const tokenURIOF = await NFTContract.tokenURI(0)
            console.log(currentTOkenURIafterDeplyment, tokenURIOF)
        })
    })

    describe("Minting and Transactions", async () => {
        it("Should mint the NFTs properly", async () => {
            await NFTContract.connect(address_one).mint("0.json", {
                value: ethers.utils.parseEther('0.0001')
            })
            expect(await NFTContract.balanceOf(address_one.address)).to.equal(1)
        })

        it("Should facilitate transfers", async () => {
            //minting an NFT
            await NFTContract.mint("0.json", {
                value: ethers.utils.parseEther('0.0001')
            })

            //transfering
            await NFTContract.transfer(address_two.address, 0)
            expect(await NFTContract.ownerOf(0)).to.equal(address_two.address)
        })
    })

    describe("Approvals", async () => {
        it("Approving activities should be working", async () => {
            //minting an NFT
            await NFTContract.connect(address_one).mint("0.json", {
                value: ethers.utils.parseEther('0.0001')
            })

            //approving an address for NFT
            await NFTContract.connect(address_one).approve(address_two.address, 0)

            //checking the approved account
            expect(await NFTContract.getApproved(0)).to.equal(address_two.address)

            //making the operator transfer NFT from owner
            await NFTContract.connect(address_two).transferFrom(address_one.address, adderss_three.address, 0)

            //checking the balance
            expect(await NFTContract.ownerOf(0)).to.equal(adderss_three.address)
        })
    })

    describe("Enumerability", async () => {

        it("should return correct total supply", async () => {
            //minting two NFTs 
            await NFTContract.mint("0.json", {
                value: ethers.utils.parseEther('0.0001')
            })
            await NFTContract.mint("1.json", {
                value: ethers.utils.parseEther('0.0001')
            })

            //checking total supply
            expect(await NFTContract.totalSupply()).to.equal(2)
        })

        it("should return the correct tokenID at a given index of an owner", async () => {
            //minting two NFTs at the same address
            await NFTContract.connect(address_one).mint("0.json", {
                value: ethers.utils.parseEther('0.0001')
            })
            await NFTContract.connect(address_one).mint("1.json", {
                value: ethers.utils.parseEther('0.0001')
            })

            // Checking the tokenID at a given index
            expect(await NFTContract.tokenOfOwnerByIndex(address_one.address, 1)).to.equal(1)
        })

        it("should return the correct tokenId at a given index of all the tokenIds stored by the contract", async () => {
            //minting two NFTs 
            await NFTContract.connect(address_one).mint("0.json", {
                value: ethers.utils.parseEther('0.0001')
            })
            
            await NFTContract.connect(address_one).mint("1.json", {
                value: ethers.utils.parseEther('0.0001')
            })

            //checking the token by index no
            expect(await NFTContract.tokenByIndex(1)).to.equal(1)
        })
    })
})