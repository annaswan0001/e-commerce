import React from 'react'
import logo from '../../assets/logo.png'
import PropTypes from 'prop-types'
import './Header.scss'

function Header(props) {
    return (
        <div className="header"> 
            <div className="wrapper">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
            </div>
        </div>
    )
}

// Header.PropTypes = {

// }

export default Header

