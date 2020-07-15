import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkIsAdmin } from "../utils/checkIsAdmin";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAdminAuth = (props) => {
  const history = useHistory();
  const { currentUser } = useSelector(mapState);

  useEffect(() => {
    if (!checkIsAdmin(currentUser)){
        console.log(!checkIsAdmin(currentUser));
        history.push("/login");
    }  
  }, [currentUser]);
  
  return currentUser;
};

export default useAdminAuth;
