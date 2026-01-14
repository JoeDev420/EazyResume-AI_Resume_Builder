import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../components/AuthContext"
import { useEffect } from "react"
import API from "../components/AxiosConfig"
import Oauth from "../components/Oauth"
import LoadingSpinner from "../components/LoadingSpinner"
import { toast } from "react-toastify";


const Login = () => {

  //first obtain the state parameter from the URL. you'll either come to login or register and that will be the state's value
  //and that state will be set in this form. Thus you will see either the login or register page

    const{isAuth,refreshAuth} = useAuth()

    const [searchParams,setSearchParams] = useSearchParams();

    const raw = searchParams.get("state"); //register or undefined 

    const state = raw === "register" ? "register" : "login"; //if raw is register, state is register, if raw is not register    then state=login

    const [error, setError] = React.useState("");

    const navigate = useNavigate();

    const redirectPath = searchParams.get("redirect") || "/app";

    //if state is not login then the register form will be shown.

    const [loading,setLoading] = useState(false)

    const [oauthLoad,setOauthLoad] = useState(false)

    useEffect(() => {
    
    if (isAuth) {
        navigate("/", { replace: true });
    }
    }, []);
    

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {

    try {
        
        e.preventDefault()

        const payload =
            state === "login"? { email: formData.email, password: formData.password }: formData;


        setLoading(true)

        const response = await API.post(`/user/${state}`,payload)


        if(response.data.token){


        if(state!="login"){    
            toast.success(response.data.message)
        }


            await refreshAuth();        //refreshAuth uses the token given to the user and sets them up in state

            setLoading(false)

            navigate(redirectPath, { replace: true });  //then we go to a protected route and if refreshAuth worked user gets in

        }

        }
    catch (error) {

            setLoading(false)

        
        if(state==="login"){

            const msg = "Invalid username or password";

            console.log(error.message)

            setError(msg);

        }

        else{

            toast.error(error.response.data.message)

        }


    }


    }

    const handleChange = (e) => {

        if(error){      //only if user already made an error before
            
        setError("")
    
    }

        const { name, value } = e.target

        setFormData(prev => ({ ...prev, [name]: value }))

    }




    return (

    <>




    <div className="flex items-center justify-center mt-35">

        <div className="flex flex-col items-center justify-center gap-4">

            {error && (
        <div className="text-red-500 text-sm mt-2">
            {error}
        </div>
        )}

            <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
                <h1 className="text-gray-900 text-3xl mt-10 font-medium">{state === "login" ? "Login" : "Sign up"}</h1>
                
                {state !== "login" && (
                    <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                        <input disabled={loading ||oauthLoad} type="text" name="name" placeholder="Name" className="border-none outline-none ring-0" value={formData.name} onChange={handleChange} required />
                    </div>
                )}
                <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
                    <input disabled={loading || oauthLoad} type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-icon lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    <input disabled={loading || oauthLoad} type="password" name="password" placeholder="Password" className="border-none outline-none ring-0" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mt-4 text-left text-indigo-500">
                    <button onClick={()=>{navigate("/forgot-password")}} className="text-sm" type="reset">Forget password?</button>
                </div>
                <button type="submit" className={`relative text-center mt-2 w-full h-11 rounded-full text-white  hover:opacity-90 transition-opacity ${oauthLoad?"bg-gray-300":"bg-indigo-500"}`} disabled={loading || oauthLoad}>
                  {loading?<LoadingSpinner />:<div>{state === "login" ? "Login" : "Sign up"}</div>}
                
                </button>
                <p onClick={() => {
                    setSearchParams(state==="login"?{state:"register"}:{state:"login"})

                    if(error){setError("")}
                }} 
                className="text-gray-500 text-sm mt-3 mb-11">{state === "login" ? "Don't have an account?" : "Already have an account?"} <a href="#" className="text-indigo-500 hover:underline">click here</a></p>
            </form>

        <div className="googleLogin">

            <Oauth redirectPath={redirectPath}
                   formLoading={loading}
                   oauthLoad = {oauthLoad}
                   setOauthLoad = {setOauthLoad}
            
            />

        </div>



        </div>


        

    </div>

    </> 

    )

}

export default Login