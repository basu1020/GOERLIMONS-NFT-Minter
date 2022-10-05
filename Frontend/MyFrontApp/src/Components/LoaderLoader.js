import React from 'react'
import { Bars } from 'react-loader-spinner'

const LoaderLoader = () => {
    return (

        <Bars
            height="50"
            width="80"
            radius="9"
            color="white"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass />
    )
}

export default LoaderLoader