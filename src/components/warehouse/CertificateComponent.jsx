import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import CustomLoadingButton from '../common/CustomLoadingButton.jsx';

import WarehouseService from '../../services/warehouse-service.js';

import { IoCloudUploadOutline } from "react-icons/io5";

import { MdUpdate } from "react-icons/md";

import PDF_file_icon from '../../assets/PDF_file_icon.webp';
import SpinnerComponent from '../common/SpinnerComponent.jsx';

function CertificateComponent(props) {

    const dispatch = useDispatch();

    const certificate_and_passport = useSelector((state) => state.warehouseSlice.certificate_and_passport);
    const upload_certificate_and_passport = useSelector((state) => state.warehouseSlice.upload_certificate_and_passport);
    const certificate_and_passport_data = useSelector((state) => state.warehouseSlice.certificate_and_passport_data);
    const certificate_and_passport_data_pending = useSelector((state) => state.warehouseSlice.certificate_and_passport_data_pending);

    const [file, setFile] = useState(null);

    const changeCertificate = () => {

        const data = {
            id: props.item.id,
            key: 'certificate',
            value: props.item.certificate
        }
        console.log('data is ', data);
        dispatch(WarehouseService.updateCertOrPassportById(data));
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (!file) {
            alert('Lutfen dosya seciniz');
            return;
        }
        else {
            let formData = new FormData()
            formData.append('file', file);
            let data = {
                id: props.item.id,
                file: formData
            }
            // formData.append('row_id', props.item.id);
            // dispatch(WarehouseService.handleUploadClick(formData));
            dispatch(WarehouseService.handleUploadClick(data));
        }
    }

    useEffect(() => {
        dispatch(WarehouseService.fetchCertificatesOrPassports(props.item.id));
    }, [dispatch]);

    return (
        <div
            className={`absolute flex flex-col items-start top-5 right-1 p-5 w-[30rem]  rounded-xl border-2 bg-white z-10 shadow-2xl border-b border-gray-200 `}>

            <span className='text-3xl my-3 text-center w-full font-bold'>
                Sertifikalar
            </span>

            <div className='my-3'>
                <p className='text-start text-2xl text-gray-400 mb-2'>
                    Dosyalar
                </p>

                {
                    certificate_and_passport_data_pending && <SpinnerComponent />
                }

                {
                    certificate_and_passport_data.length > 0 && !certificate_and_passport_data_pending &&
                    <div className='flex flex-wrap text-base text-gray-400 '>
                        {
                            certificate_and_passport_data.map((item, index) =>
                                <a href={item.link} target="_blank" key={index} className='flex flex-col overflow-hidden text-ellipsis text-nowrap  mx-4 my-2 text-start max-w-28'>
                                    <img src={PDF_file_icon} alt="" className='w-14 h-16' />
                                    <span className='text-xs text-start '>{item.file_name}</span>
                                </a>
                            )
                            
                        }
                    </div>
                }

                {
                    certificate_and_passport_data.length === 0 && !certificate_and_passport_data_pending &&
                    <p className='text-base  text-gray-400'>
                        Girilmis bir dosya yok
                    </p>
                }

            </div>


            <div className='flex flex-col my-3'>
                <p className='text-start text-2xl  text-gray-400'>
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

export default CertificateComponent