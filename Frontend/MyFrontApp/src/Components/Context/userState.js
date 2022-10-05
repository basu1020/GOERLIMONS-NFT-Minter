import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'
import UserContext from './userContext'
import { useState, useEffect } from 'react'
import { ethers, providers } from 'ethers'
import GoerliMons from '../../GMON.json'

const UserState = (props) => {

  let provider;
  let signer;
  let ethersProvider
  const [MonContractSetter, SetMonContractSetter] = useState(null)
  const monContractAddress = '0xF9a04c183f965973A71F529AEbF1dEEbe36E4044'
  const [account, setAccount] = useState(null)
  const [walletError, setWalletError] = useState(null)
  const [web3Modal, setWeb3Modal] = useState(null)

  useEffect(() => {
    const providerOptions = {
      binancechainwallet: {
        package: true
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: 'a46c4873075d48ec92fe67b184a6fbdb',
        }
      },
      walletlink: {
        package: WalletLink,
        options: {
          appName: "GoerliMon NFT Minter",
          infuraId: "a46c4873075d48ec92fe67b184a6fbdb",
          rpc: "",
          chainId: 5,
          appLogoUrl: null,
          darkMode: true
        }
      },
    };

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true, // very important
      network: "goerli",
      theme: {
        background: "black",
        main: "white",
        secondary: "white",
        border: "#2bdfe2",
        hover: "#2bdfe2"
      },
      providerOptions,
    });

    setWeb3Modal(newWeb3Modal)
  }, [])

  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if (web3Modal && web3Modal.cachedProvider) {
      onClickConnector()
    }
  }, [web3Modal])


  const onClickConnector = async () => {
    provider = await web3Modal.connect();
    addListeners(provider)
    ethersProvider = new providers.Web3Provider(provider)
    signer = ethersProvider.getSigner()
    const userAddress = await ethersProvider.getSigner().getAddress()
    setAccount(userAddress)
    setWalletError(null)
    const MonContractSetterInstance = new ethers.Contract(monContractAddress, GoerliMons.abi, signer)
    SetMonContractSetter(MonContractSetterInstance)
  }

  async function disconnectWallet() {
    web3Modal.clearCachedProvider()
    localStorage.removeItem("walletconnect")
    setAccount("")
  }

  async function addListeners(web3ModalProvider) {

    web3ModalProvider.on("accountsChanged", async (accounts) => {
      const userAddress = await ethersProvider.getSigner().getAddress()
      setAccount(userAddress)
    })
  }

  return (
    <UserContext.Provider value={{ ethersProvider, signer, account, walletError, MonContractSetter, disconnectWallet, setWalletError, onClickConnector }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState