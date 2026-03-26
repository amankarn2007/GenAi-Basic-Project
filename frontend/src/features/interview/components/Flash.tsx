

export default function Flash({setFlash, msg}: {setFlash: React.Dispatch<React.SetStateAction<boolean>>, msg?: string}) {
    return (
        <div className="absolute top-5 left-[40%] w-80 h-12 rounded-lg bg-red-400 border-2 border-red-500 flex items-center justify-evenly gap-5 px-5">
            { msg ? 
                <h3 className="text-red-800">{ msg }</h3> : 
                <h3 className="text-red-800">Can't perform this operation</h3> 
            }
            <p className="hover:scale-120 cursor-pointer transition-transform" onClick={() => setFlash((prev) => !prev)}>
                <i className="fa-solid fa-xmark text-red-800"></i>
            </p>
        </div>
    )
}