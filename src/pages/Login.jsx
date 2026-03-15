import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import picture from '../assets/images/picture2.jpg'
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.users);

    const handleInput= ((e)=>{
        const {name,value} = e.target
        setForm((prev) =>({...prev,[name]:value}))
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(form));
        navigate("/dashboard");
        
    };

    return (
        <div className="min-h-screen bg-gray-100">

        <div className=" flex flex-row justify-center p-10  rounded-xl overflow-hidden">
            <img className="h-150 rounded-l-xl shadow-2xl" src={picture}/>
            <div className="rounded-r-xl shadow-2xl">
       
            <form className="mt-20 " onSubmit={handleSubmit}>
                <h2 className="font-bold text-4xl text-center ">Login</h2>
                <div className=" flex flex-col gap-5 p-10">

                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-3 text-gray-400"/>
                    <input
                        type="text"
                        className="w-100 h-10 pl-10 border rounded "
                        placeholder="Email"
                        name="email"
                        onInput={handleInput}
                    />
                    </div>

                    <div className="relative">
                        <FaLock className="absolute left-3 top-3 text-gray-400"/>
                    <input
                         className="w-100 h-10 pl-10 border rounded"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleInput}
                    />
                    </div>

                    <button className="w-100 h-10 bg-emerald-600 rounded text-white hover:text-gray-300 " type="submit">Login</button>
                    <p className="text-center">Don’t have an account?<Link to={"/signup"} className="text-green-400">SignUp</Link></p>
                </div>

            </form>
            </div>
             </div>
        </div>
    );
}

export default Login;