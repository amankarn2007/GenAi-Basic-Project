import { useNavigate } from "react-router"


export default function Register() {
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen bg-gray-950 flex items-center justify-center">
            <div className="flex flex-col px-5 py-2 gap-5">
                <h2 className="text-white text-5xl py-5">Register</h2>

                <div className="flex flex-col gap-2">
                    <label className="text-white text-lg font-semibold">Username</label>
                    <input type="text" placeholder="Enter your username" className="pr-50 pl-5 py-3 rounded-2xl text-start bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-white text-lg font-semibold">Email</label>
                    <input type="text" placeholder="Enter your email" className="pr-50 pl-5 py-3 rounded-2xl text-start bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-white text-lg font-semibold">Password</label>
                    <input type="text" placeholder="Enter password" className="pr-50 pl-5 py-3 rounded-2xl text-start bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                <div className="mt-2">
                    <button className="py-3 w-full rounded-2xl text-white bg-red-600 cursor-pointer active:scale-103 transition-transform duration-300 ease-in-out">Register</button>

                    <p className="text-white ml-2 mt-2">Already have and account ? <span className="text-red-700 cursor-pointer" onClick={() => navigate("/login")}>Login</span></p>
                </div>
            </div>
        </div>
    )
}