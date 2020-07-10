import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

function Button({children, ...otherProps}) {
    return (
        <button className="btn" {...otherProps}>
            {children}
        </button>
    )
}

Button.propTypes = {

}

export default Button

