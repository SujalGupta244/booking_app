import {useSelector} from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'


const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    if(token){
        const decode = jwtDecode(token)
        const {username, email} = decode
        
        return {username, email}
    }

  return {username: '', email : ''}
}

export default useAuth