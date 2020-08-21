import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkIsAdmin } from './../../utils/checkIsAdmin';
import './Admin.scss';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})

const AdminToolbar = props => {
  const { currentUser } = useSelector(mapState);

  const isAdmin = checkIsAdmin(currentUser);
  

  return (
     <React.Fragment>
    {isAdmin && <div className="adminToolbar">
        {/* {console.log(isAdmin)} */}
      <ul>
        <li>
          <Link to="/admin">
            My admin
          </Link>
        </li>
      </ul>
    </div>}
    </React.Fragment>
  );
}

export default AdminToolbar; 