import React,{useCallback} from 'react'
import PropTypes from 'prop-types'
import {signInWithGoogle} from '../../firebase/utils'
import './SignIn.scss'
import Button from '../../components/Forms/Button/Button'


class SignIn extends React.Component {
    
    handleSubmit = async e =>{
        e.preventDefault()
    }
    render() {
        const {
            props,
        } = this;

       

        return (
            <div className="signin">
                <div className="wrapper">
                    <h2>Login</h2>
                    <div className="formWrapper">
                        <form onSubmit={this.handleSubmit}>
                            <div className="socialSignIn">
                                <div className="row">
                                    <Button onClick={signInWithGoogle}>
                                        Sugn in with Google
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

SignIn.propTypes = {

}

export default SignIn 

