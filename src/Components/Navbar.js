import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers'


const Navbar = () => {
    const [account, setAccount] = useState(null)

    const onClickConnector = async () => {
        const [acc] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(acc)
    }
    

    return (
        <>
            <nav>
                <div className="title">
                    <p className='title-thugs'>GOERLI_THUGS.</p>
                    <p className="title-721">721</p>
                </div>
                <div className="options">
                    <div className="div-links">
                        <a className="links" href="/">HOME</a>
                    </div>
                    <div className="meta-mask" onClick={onClickConnector}>
                        <p className='meta-mask-p'><i class="fa-solid fa-wallet"></i> {account ? account.slice(0,10) + "..." : "CONNECT"}</p>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar