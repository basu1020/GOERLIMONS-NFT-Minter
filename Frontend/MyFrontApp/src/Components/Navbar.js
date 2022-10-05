import React, { useContext } from 'react'
import userContext from './Context/userContext'

const Navbar = () => {
    const context = useContext(userContext)
    const { account, onClickConnector, disconnectWallet } = context

    const onClickAccountButton = () => {
        if (!account) {
            onClickConnector()
        }
        else if (account) {
            document.getElementsByClassName('modal-wallet')[0].style.display = "flex"
            document.getElementsByClassName('modal-wallet')[0].style.flexDirection = "column"
            document.getElementsByClassName('modal-wallet')[0].style.justifyContent = "center"
            document.getElementsByClassName('modal-wallet')[0].style.alignItems = "center"
            document.getElementsByClassName('modal-wallet')[0].style.position = "absolute"
            document.getElementsByClassName('modal-button')[0].style.display = "block"
            document.querySelector('body').classList.add('disable-scroll')
        }
    }

    const onClickModalWallet = () => {
        document.getElementsByClassName('modal-wallet')[0].style.display = "none"
        document.getElementsByClassName('modal-wallet')[0].style.position = ""
        document.getElementsByClassName('modal-button')[0].style.display = "none"
        document.querySelector('body').classList.remove('disable-scroll')
    }

    const onClickDisconnect = () => {
        disconnectWallet()
        document.getElementsByClassName('modal-wallet')[0].style.display = "none"
        document.getElementsByClassName('modal-wallet')[0].style.position = ""
        document.getElementsByClassName('modal-button')[0].style.display = "none"
    }

    return (
        <>
            <nav>
                <div className="title">
                    <p className='title-thugs'>GOERLI_MONS.</p>
                    <p className="title-721">721</p>
                </div>
                <div className="options">
                    <div className="meta-mask">
                        <p className='meta-mask-p' onClick={onClickAccountButton}
                        >
                            <i class="fa-solid fa-wallet"></i>
                            {account ? account.slice(0, 10) + "..." : "CONNECT"}
                        </p>
                    </div>
                </div>
                <div className='modal-wallet' onClick={onClickModalWallet}>
                    <div className='modal-content'>
                        <div>
                            <p>
                                Address - {account}
                            </p>
                        </div>
                        <div >
                            <button
                                className='modal-button' onClick={onClickDisconnect}>Disconnect
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar