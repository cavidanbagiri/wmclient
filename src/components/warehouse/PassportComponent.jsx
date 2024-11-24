import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import CustomLoadingButton from '../common/CustomLoadingButton.jsx';

import WarehouseService from '../../services/warehouse-service.js';

import { IoCloudUploadOutline } from "react-icons/io5";

import { MdUpdate } from "react-icons/md";

import PDF_file_icon from '../../assets/PDF_file_icon.webp';

function PassportComponent(props) {

    const dispatch = useDispatch();

    const certificate_and_passport = useSelector((state) => state.warehouseSlice.certificate_and_passport);
    const upload_certificate_and_passport = useSelector((state) => state.warehouseSlice.upload_certificate_and_passport);
    const certificate_and_passport_data = useSelector((state) => state.warehouseSlice.certificate_and_passport_data);

    const [file, setFile] = useState(null);

    const changeCertificate = () => {

        const data = {
            id: props.item.id,
            key: 'passport',
            value: props.item.passport
        }
        dispatch(WarehouseService.updateCertOrPassportById(data));
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (!file) {
            alert('Please select a file');
            return;
        }
        else {
            let formData = new FormData()
            formData.append('file', file);
            formData.append('row_id', props.item.id);
            dispatch(WarehouseService.handleUploadClick(formData));
        }
    }

    useEffect(() => {
        dispatch(WarehouseService.fetchCertificatesOrPassports(props.item.id));
    }, [dispatch]);



    return (
        <div
            className={`absolute flex flex-col items-start top-5 right-1 p-5 w-[30rem]  rounded-xl border-2 bg-white z-10 shadow-2xl border-b border-gray-200 `}>

            <span className='text-3xl my-3 text-center w-full font-medium'>
                Pasaport
            </span>

            <div className='my-3'>
                <p className='text-start text-lg text-gray-400'>
                    Dosyalar
                </p>
                {
                    certificate_and_passport_data.length > 0 ?
                        <div className='flex flex-wrap text-base text-gray-400 '>
                            {
                                certificate_and_passport_data.map((item, index) =>
                                    <a href={item.location} target="_blank" key={index} className='mr-4 my-2'>
                                        <img src={PDF_file_icon} alt="" className='w-14 h-16' />
                                        {item.filename}
                                    </a>
                                )
                            }
                        </div>
                        :
                        <p className='text-base  text-gray-400'>
                            Girilmis bir dosya yok
                        </p>
                }
            </div>


            <div className='flex flex-col my-3'>
                <p className='text-start text-lg  text-gray-400'>
                    Dosya Ekle
                </p>
                <input placeholder='Add Certificate or Passport' type='file'
                    onChange={handleFileChange}
                    className={`hover:bg-gray-200 rounded-lg text-base my-2 border`} />
                {
                    !upload_certificate_and_passport.pending ?
                        <button onClick={handleUploadClick}
                            className={`hover:bg-slate-600 bg-slate-800  p-3 mb-3 rounded-lg text-base text-white duration-300`}>
                            Upload <IoCloudUploadOutline className='ml-1 inline text-2xl' />
                        </button>
                        :
                        <CustomLoadingButton />
                }
            </div>

            {
                !certificate_and_passport.pending ?
                    <span onClick={changeCertificate}
                        className={`hover:bg-slate-700 bg-slate-800 text-gray-100 p-3 rounded-lg text-base my-3`}>
                        Tersini Isaretle <MdUpdate className='ml-3 inline text-2xl' />
                    </span>
                    :
                    <CustomLoadingButton />
            }


        </div>
    )
}

export default PassportComponent