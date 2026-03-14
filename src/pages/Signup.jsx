import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import pic from '../assets/images/picture.jpg'
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Signup = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInput = ((e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(form));
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-gray-100 ">
            <div className=" flex flex-row justify-center p-10  rounded-xl overflow-hidden">
                <img className="h-150 rounded-l-xl shadow-2xl" src={pic} />
                <div className="rounded-r-xl shadow-2xl" >
                    <form className="mt-20 " onSubmit={handleSubmit}>
                        <h2 className="font-bold text-4xl text-center ">Signup Here...</h2>
                        <div className=" flex flex-col gap-5 p-10">

                            <div className="relative">
                                <FaUser className="absolute left-3 top-3 text-gray-400" />

                                <input
                                    type="text"
                                    className="w-full h-10 pl-10 pr-3 border rounded"
                                    placeholder="Username"
                                    name="username"
                                    value={form.username}
                                    onInput={handleInput}
                                />
                            </div>

                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    className="w-full h-10 pl-10 p-3 border rounded "
                                    placeholder="Email"
                                    name="email"
                                    value={form.email}
                                    onInput={handleInput}
                                />
                            </div>

                            <div className="relative">
                                <FaLock className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    className="w-full h-10 pl-10 p-3 border rounded"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={form.password}
                                    onInput={handleInput}
                                />
                            </div>

                            <button className="w-100 h-10 bg-emerald-600 rounded text-white hover:text-gray-300 " type="submit">Signup</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;