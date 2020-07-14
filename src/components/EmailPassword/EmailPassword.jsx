import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './EmailPassword.scss';

import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../Forms/Input/Input';
import Button from '../Forms/Button/Button';

import { useDispatch, useSelector} from 'react-redux'
import { resetPasswordStart, resetUserState } from '../../redux/User/userActions';


const configAuthWrapper = {
    headline: 'Email Password'
  };

  const mapState= ({user})=>({
    isReset : user.isReset,
    resetError: user.error
  })

const EmailPassword = (props) => {
  
const [email,setEmail] = useState("")
const [errors, setErrors] = useState([])
const dispatch = useDispatch()
const {isReset, resetError} =useSelector(mapState)

useEffect(() => {
  if(isReset){
    props.history.push('/login')
    dispatch(resetUserState())
  }
  
}, [isReset])

useEffect(() => {
  if(resetError && resetError.length>0){
    setErrors(resetError)
  }
  
}, [resetError])

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordStart({email}))
}

 

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">

        {errors.length > 0 && (
            <ul>
              {errors.map((e, index) => {
                return (
                  <li key={index}>
                    {e}
                  </li>
                );
              })}
            </ul>
          )}


          <form onSubmit={handleSubmit}>

            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e)=>setEmail(e.target.value)}
            />

            <Button type="submit">
              Email Password
            </Button>

          </form>

        </div>
      </AuthWrapper>
    );
}

export default withRouter(EmailPassword); 