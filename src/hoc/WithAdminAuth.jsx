

import {withRouter} from 'react-router-dom'
import useAdminAuth from '../customHooks/UseAdminAuth'


const WithAuth = (props) => useAdminAuth(props) && props.children

export default withRouter(WithAuth)