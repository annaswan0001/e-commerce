import { useRouteMatch } from "react-router-dom"

import React from 'react'
import useAuth from '../../customHooks/UseAuth'
import {withRouter} from 'react-router-dom'


const WithAuth = (props) => useAuth(props) && props.children

export default withRouter(WithAuth)