import { createContext, useEffect, useState, useContext } from "react";
import {getCurrentUser} from '../lib/appwrite'
export const GlobalContext = useContext();
const useGlobalContext = ()=> useContext(GlobalContext);
const GlobalProvider = ({children})=>{
    const [isLoading,setIsLoading] = useState(true);
    const [user,setUser] = useState(null);
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    useEffect(()=>{
        getCurrentUser()
        .then((res)=>{
            if(res){
                setIsLoggedIn(true);
                setUser(res)
            }else{
                setIsLoggedIn(false);
                setUser(null)
            }
        })
        .catch((error)=>{
            console.error(error);
        })
        .finally(()=>{
            setIsLoading(false);
        })
    },[])
  return(
    <GlobalContext.Provider value={{isLoading,user,setUser,isLoggedIn,setIsLoggedIn}}>
        {children}
    </GlobalContext.Provider>
  )
}
export default GlobalProvider;