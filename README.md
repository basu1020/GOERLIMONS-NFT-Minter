Hello Everyone, This is my NFT minting dapp built on Ethereum Blockchain. 

![Screenshot (27)](https://user-images.githubusercontent.com/106004070/194912236-331916b7-1580-42fa-8589-7922b30e7b90.png)

Steps involved in this :-

1 > Making Art - I designed the components such as Body, Eyes, Neckband, Background, Mouth using Inkscape. 

![Screenshot (33)](https://user-images.githubusercontent.com/106004070/194918381-71e93d1b-659d-49da-87e2-094a13fbe99a.png)

2 > Generating NFTs and Metadata - I used hashlips generator for combining my components and creating PNG images and JSON files containing Metadata. 

![Screenshot (34)](https://user-images.githubusercontent.com/106004070/194918434-fb26a46f-5196-47a1-a01f-0dcffa4fa7bb.png)

3 > Uploading PNGs and JSONs on IPFS - This is a cruical step as the CID (Content Identifier) will of the Metadata file with the link will be added as the 'baseURI' in    your ERC721 smart contract. There's two important things to note here :- 
  * Uploadin the PNGs folder first 
  * Then adding the CID of PNGs folder to the JSON metadata and finally uploading metadata folder
 
4 > Smart Contract - For this project I used Openzeppelin's ERC721 standard smart contract and added the CID of JSON metadata as my 'baseURI'.

5 > Testing and Deploying the contract - I ran some important tests on my contract using Hardhat which is available in this repo and finally deployed it on GOERLI test network

6 > Frontend - By far the most popular frontend framework is ReactJS and I built my frontend using exactly that. 

7 > Deploying on IPFS - We all have heard that IPFS is the future of internet, so I wanted to get my hands dirty on it. I used Fleek to deploy this website on IPFS, here's the link - https://fleek.co/

![Screenshot (32)](https://user-images.githubusercontent.com/106004070/194916229-9bad7b2e-e343-437d-befb-a085e46e9b89.png)



