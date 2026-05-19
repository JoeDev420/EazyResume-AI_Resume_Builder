import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import API, {registerUnauthorizedHandler} from "./AxiosConfig";



const AuthContext = createContext();    //1 the product

export const useAuth = () => {              //2 the convenience product sold seperately

  return useContext(AuthContext);   //gives you access to the value object

};



export const AuthProvider = ( {children} )=>{   //the producer and storefront owner(retailer opens shops here)


     const verifyToken = async ()=>{


    try {


       const response = await API.get("/user/verification")


       if(response.data.success){

            setUser(response.data.user)

       }

    } catch (error) {

      
      setUser(null);

        
    }

    finally{

    setLoading(false);

    }

    }




    const[user,setUser] = useState(null)
    const[loading,setLoading] = useState(true)

     const handleUnauthorized = () => {

        setUser(null);
        setLoading(false);

    };



    const value = {isAuth:!!user,user,loading,refreshAuth: verifyToken}


    useEffect(()=>{

    registerUnauthorizedHandler(handleUnauthorized);

    verifyToken();


    },[])


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );






}                                    


