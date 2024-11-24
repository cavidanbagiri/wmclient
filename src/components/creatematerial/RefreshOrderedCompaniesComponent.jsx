import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux';

import MessageBox from '../../layouts/MessageBox';

import CommonService from '../../services/common.services';

import { LuRefreshCw } from "react-icons/lu";

function RefreshOrderedCompaniesComponent() {

    const dispatch = useDispatch();

    const [company_refresh_message, setCompanyRefreshMessage] = useState(false);
    const [ordered_refresh_message, setOrderedRefreshMessage] = useState(false);

    const refreshCompany = () => {
        dispatch(CommonService.fetchCompanies());
        setCompanyRefreshMessage(true);
      }
      const refreshOrdereds = () => {
        dispatch(CommonService.fetchOrdereds());
        setOrderedRefreshMessage(true)
      }

    useEffect(() => {
        if (company_refresh_message) {
            setTimeout(() => {
                setCompanyRefreshMessage(false);
            }, 1500,)
        }
        if (ordered_refresh_message) {
            setTimeout(() => {
                setOrderedRefreshMessage(false);
            }, 1500)
        }
    }, [company_refresh_message, ordered_refresh_message])

    return (

        <>
            {
                company_refresh_message && <MessageBox message={'Firmalar Yenilendi'} color={'bg-green-500'} />
            }

            {
                ordered_refresh_message && <MessageBox message={'Siparisciler Yenilendi'} color={'bg-green-500'} />
            }
            {/* Ordered Dropdown */}
            <div className='flex '>

                <div className='flex px-2 mt-3 items-center hover:cursor-pointer' onClick={refreshCompany}>
                    <LuRefreshCw className='text-green-500' />
                    <span className='text-xs text-gray-700 ml-2 font-bold' >Firma Yenile</span>
                </div>

                <div className='flex px-2 mt-3 items-center hover:cursor-pointer' onClick={refreshOrdereds}>
                    <LuRefreshCw className='text-green-500' />
                    <span className='text-xs text-gray-700 ml-2 font-bold' >Siparisci Yenile</span>
                </div>

            </div>
        </>

    )
}

export default RefreshOrderedCompaniesComponent