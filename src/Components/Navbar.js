import React, { useContext } from 'react'
import userContext from './Context/userContext'

const Navbar = () => {
    const context = useContext(userContext)
    const { account } = context
    const { onClickConnector } = context
    
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