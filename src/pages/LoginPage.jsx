import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserService from "../services/user-service.js";
import MessageBox from "../layouts/MessageBox.jsx";

import { setLoginErrorFalse } from "../store/user-store.js";

import CustomLoadingButton from "../components/common/CustomLoadingButton.jsx";

import warehouse_management_logo from '../assets/warehouse_management_logo.png'

function LoginPage() {
    const dispatch = useDispatch();

    const is_login_error = useSelector(state => state.userSlice.is_login_error);
    const login_pending = useSelector(state => state.userSlice.login_pending);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const changeUsernameInform = (event) => {
        setUsername(event.target.value);
    }
    const changePasswordInform = (event) => {
        setPassword(event.target.value);
    }

    async function signIn() {
        const user_data = {
            email: username,
            password: password
        }
        dispatch(UserService.userLogin(user_data));

    }

    useEffect(() => {
        if (is_login_error === true) {
            setTimeout(() => {
                dispatch(setLoginErrorFalse());
            }, 1500)
        }
    }, [is_login_error])


    return (

        <div style={{ fontFamily: 'IBM Plex Sans' }} className='flex justify-center items-center h-screen'>

            {
                is_login_error &&
                <MessageBox color={'bg-red-500'} message={'Boyle bir kullanici bulunamadi'} />
            }

            <div className='flex rounded-xl border shadow-2xl'>
                <div className=' w-[500px] h-[550px]  rounded-s-xl'>
                    <img src={warehouse_management_logo} alt="" className='w-[500px] h-[550px]' />
                </div>

                <div className='flex flex-col w-[500px] h-[550px] justify-center items-center p-5'>
                    <span className='text-5xl my-8 font-bold'>
                        Giris Sayfasi
                    </span>
                    <div className='flex flex-col h-full w-full justify-center items-around'>

                        {/* <form onSubmit={signIn}> */}
                        <input className='bg-gray-100 p-4 rounded-lg outline-none my-5 w-full' type="text" name="email" id="email" onChange={changeUsernameInform} placeholder='Username or Email' />
                        <input className='bg-gray-100 p-4 rounded-lg outline-none my-5 w-full' type="password" name="password" id="password" onChange={changePasswordInform} placeholder='Password' />
                        {
                            login_pending
                                ?
                                <CustomLoadingButton/>
                                :
                                <button onClick={signIn} className='text-xl bg-slate-900 w-full px-5 py-4 my-3 rounded-lg text-white font-bold hover:bg-slate-800 '>
                                    Giris Yap
                                </button>
                        }
                        {/* </form> */}
                        <span className='w-full text-base underline duration-300 cursor-pointer hover:text-blue-400 text-gray-400 font-bold mt-4'>
                            Parolayi Unutdum
                        </span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginPage