import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth.service"
authService






const LogoutBtn = () => {

    const dispatch = useDispatch()

    const logoutHandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }

  return (
    <div>LogoutBtn</div>
  )
}

export default LogoutBtn