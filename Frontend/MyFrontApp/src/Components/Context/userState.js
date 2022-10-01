import UserContext from './userContext'
import { useState } from 'react'
import { ethers } from 'ethers'

const UserState = (props) => {

    let provider;
    let signer;
    const [account, setAccount] = useState(null)
    const [walletError, setWalletError] = useState(null)
    
    if(window.ethereum){
        provider = new ethers.providers.Web3Provider(window.ethereum)
        signer = provider.getSigner()
    }

    const onClickConnector = async () => {

        if (window.ethereum) {
            const [acc] = await window.ethereum.request({ method: 'eth_requestAccounts' })
            setAccount(acc)
        }
        setWalletError(null)
    }
    return (
        <UserContext.Provider value={{ provider, signer,  account,  walletError, setWalletError, onClickConnector }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState