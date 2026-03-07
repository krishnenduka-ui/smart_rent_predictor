import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(form));
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen flex justify-center items-center h-100 bg-gray-100">
            <form className="bg-white p-10  rounded-lg shadow hover:shadow-lg transition overflow-hidden "
                onSubmit={handleSubmit}>
                <h2 className="font-bold text-4xl text-center ">Signup</h2>
                <div className=" flex flex-col gap-3 p-10">


                    <input
                        className="w-100 h-10 p-3 border rounded "
                        placeholder="Email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        className="w-100 h-10 p-3 border rounded"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <button className="w-100 h-10 bg-blue-600 rounded text-white hover:text-gray-300 " type="submit">Signup</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;