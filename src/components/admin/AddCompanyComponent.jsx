
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import AdminService from '../../services/admin-service';
import {
    setCreateCompanyStatusInitial,
    setCreateCompanyStatusError,
    setCreateCompanyMessage
} from '../../store/admin-store';


import LoadingButton from '@mui/lab/LoadingButton';

function AddCompanyComponent() {

    const dispatch = useDispatch();
    const company = useSelector((state) => state.adminSlice.company);
    

    let [company_data, setCompanyData] = useState({
        company_name: '',
        email_address: '',
        phone_number: '',
        country: '',
    });

    function createNewCompany() {
        if (company_data.company_name.trim() === '') {
            dispatch(setCreateCompanyStatusError());
            dispatch(setCreateCompanyMessage('Firma Ismi Gerekli'));
            return
        }
        else if (company_data.email_address.indexOf('@') === -1 || company_data.email_address.trim() === '' || company_data.email_address.indexOf('.') === -1 ) {
            dispatch(setCreateCompanyStatusError());
            dispatch(setCreateCompanyMessage('Email Gerekli'));
            return
        }
        else{
            dispatch(AdminService.createCompany(company_data));
        }
    }

    // Control after creating new ordered conditions and messages
    useEffect(() => {
        if (company.status != -1) {
            setTimeout(() => {
                dispatch(setCreateCompanyStatusInitial());
                setCompanyData((each) => ({
                    ...each,
                    company_name: '',
                    email_address: '',
                    phone_number: '',
                    country: '',
                }));
            }, 2000)
        }
    }, [company.status]);


    return (
        <div className='flex flex-col'>

            {
                company.status === 1 && <span className={`flex justify-end bg-green-300 w-full text-end text-green-500 font-bold p-1`}>{company.message}</span>
            }

            {
                company.status === 0 && <span className={`flex justify-end bg-red-300 w-full text-end text-red-500  font-bold p-1`}>{company.message}</span>
            }


            <div className='flex justify-between text-sm my-3'>
                <div className='w-1/2 mr-2'>
                    <span className='text-gray-400'>Email</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="email" placeholder='company@[az-AZ]].ru' value={company_data.email_address}
                        onChange={(event) => {
                            setCompanyData((each) => ({
                                ...each,
                                email_address: event.target.value
                            }))
                        }} />
                </div>
                <div className='w-1/2 ml-2'>
                    <span className='text-gray-400'>Iletisim Numarasi</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='+(8) 9656666666' value={company_data.phone_number}
                        onChange={(event) => {
                            setCompanyData((each) => ({
                                ...each,
                                phone_number: event.target.value
                            }))
                        }} />
                </div>
            </div>
            <div className='text-sm my-3'>
                <p className='text-gray-400'>Ulke Sec</p>
                <select name="" id="" className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg text-gray-800 outline-none'
                    onChange={(event) => {
                        setCompanyData((each) => ({
                            ...each,
                            country: event.target.value
                        }))
                    }}>
                    <option value="Azerbaijan" >Azerbaijan</option>
                    <option value="Russia" >Russia</option>
                    <option value="Turkiye" >Turkiye</option>
                </select>
            </div>
            <div className='text-sm'>
                <span className='text-gray-400'>Firma Ismi</span>
                <input className='bg-gray-100 w-full mb-4 mt-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='Firma ismi' value={company_data.company_name}
                    onChange={(event) => {
                        setCompanyData((each) => ({
                            ...each,
                            company_name: event.target.value
                        }))
                    }}
                />


            </div>
            <div className=''>
                {
                    !company.pending ?
                        <button onClick={createNewCompany} className='bg-orange-400 text-gray-800 hover:bg-orange-300 duration-200  w-full py-4 rounded-lg my-4 text-lg'>
                            Onayla
                        </button>
                        :
                        <LoadingButton loading variant="outlined" className='text-black w-full p-4'>
                            Waiting
                        </LoadingButton>
                }

            </div>
        </div>
    )
}

export default AddCompanyComponent