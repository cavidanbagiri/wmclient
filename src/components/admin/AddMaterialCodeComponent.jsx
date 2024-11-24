
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import AdminService from '../../services/admin-service';
import { setCreateMaterialCodeStatusInitial,
    setCreateMaterialCodeStatusError,
    setCreateMaterialCodeMessage
 } from '../../store/admin-store';

import LoadingButton from '@mui/lab/LoadingButton';

function AddMaterialCodeComponent() {


    const dispatch = useDispatch();

    const material_code = useSelector((state) => state.adminSlice.material_code);

    let [material_code_data, setMaterialCodeData] = useState({
        material_description: '',
    });

    function createNewMaterialCode() {
        if (material_code_data.material_description.trim() === '') {
            dispatch(setCreateMaterialCodeStatusError());
            dispatch(setCreateMaterialCodeMessage('Malzeme Ismi Gerekli'));
        }
        else {
            dispatch(AdminService.createMaterialCode(material_code_data));
        }
    }

    // Fetch All Groups
    useEffect(() => {
        dispatch(AdminService.fetchMaterialCodes());
    }, [])

    // Control after creating new ordered conditions and messages
    useEffect(() => {
        if (material_code.status != -1) {
            setTimeout(() => {
                dispatch(setCreateMaterialCodeStatusInitial());
                setMaterialCodeData((each) => ({
                    ...each,
                    material_description: '',
                }));
            }, 2000)
        }
    }, [material_code.status]);

    return (
        <div className=''>

            {
                material_code.status === 1 && <span className={`flex justify-end bg-green-300 w-full text-end text-green-500 font-bold p-1`}>{material_code.message}</span>
            }

            {
                material_code.status === 0 && <span className={`flex justify-end bg-red-300 w-full text-end text-red-500  font-bold p-1`}>{material_code.message}</span>
            }

            <div className='flex flex-col justify-between text-sm my-3'>
                {/* Material Code */}
                <div className='flex  justify-between text-sm my-3'>
                    <div className='w-full'>
                        <span className='text-gray-400'>Malzeme Ismi</span>
                        <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='' value={material_code_data.material_description}
                            onChange={(event) => {
                                setMaterialCodeData((each) => ({
                                    ...each,
                                    material_description: event.target.value
                                }))
                            }} />
                    </div>
                </div>
                {/* Available Material Codes */}
                <div className='text-sm my-3'>
                    <p className='text-gray-400'>Mavcut Malzeme Isimleri</p>
                    <select name="" id="" className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg text-gray-800 outline-none'
                        onChange={(event) => {
                            
                        }}
                    >
                        {material_code.material_codes.map((item) => (
                            <option key={item.id} value={item.id} >{item.material_name}</option>
                        ))}
                    </select>
                </div>


                {/* Submit Button */}
                <div className='opacity-70'>
                    {
                        !material_code.pending ?
                            <button onClick={createNewMaterialCode} className='bg-orange-300 text-gray-800 hover:bg-orange-400 duration-200  w-full py-4 rounded-lg my-4 text-lg'>
                                Onayla
                            </button>
                            :
                            <LoadingButton loading variant="outlined" className='text-black w-full p-4'>
                                Waiting
                            </LoadingButton>
                    }

                </div>

                {/* Last Created Material Code and Data */}
                {
                    material_code.created_data &&
                <div className='flex flex-col items-center'>
                    <p className='text-gray-700 text-base my-3'>Last Created Material Code</p>
                    <p className='text-gray-400 my-3'>{material_code.created_data.material_name}</p>
                    <p className='text-gray-400'>{material_code.created_data.material_code}</p>
                </div>
                }
                
            </div>
        </div>
    )
}

export default AddMaterialCodeComponent