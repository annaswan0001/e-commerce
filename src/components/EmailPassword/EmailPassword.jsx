import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './EmailPassword.scss';

import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../Forms/Input/Input';
import Button from '../Forms/Button/Button';

import { auth } from './../../firebase/utils';

const configAuthWrapper = {
    headline: 'Email Password'
  };

const EmailPassword = (props) => {
  
const [email,setEmail] = useState("")
const [errors, setErrors] = useState([])

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
  
        const config = {
          url: 'http://localhost:3000/login'
        };
  
        await auth.sendPasswordResetEmail(email, config)
          .then(() => {
            props.history.push('/login');
          })
          .catch(() => {
            const err = ['Email not found. Please try again.'];
           setErrors(err)
          });
  
      } catch(err) {
        // console.log(err);
      }

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