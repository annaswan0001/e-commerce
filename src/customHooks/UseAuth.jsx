import {useSelector} from 'react-redux'
import {useEffect} from 'react'



const mapStateToProps = ({user})=>({
   currentUser: user.currentUser
})

const useAuth = (props) =>{
    const {currentUser} = useSelector(mapStateToProps)
    useEffect(() => {
        if(!currentUser){
            props.history.push('/login')
        }
    }, [currentUser])

    return currentUser
}

export default useAuth