
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WarehouseService from '../../services/warehouse-service';
import { USER_MESSAGES } from '../../constants/values';


function ZeroFilteredComponent(props) {

    const user = useSelector((state) => state.userSlice.user);

    const dispatch = useDispatch();

    return (
        <div className='flex flex-col w-full h-96 items-center justify-center'>
            <span style={{ fontWeight: 500 }} className='text-4xl text-gray-500'>
                {USER_MESSAGES.NO_DATA_FOUND}
            </span>
            <button className='border p-3 my-5 rounded-lg bg-gray-50 hover:bg-gray-100 duration-200'
                onClick={() => {
                    dispatch(WarehouseService.fetchWarehouseData(user.projectId));
                    props.resetFunc();
                }}
            >
                Filtreyi Temizle
            </button>
        </div>
    )
}

export default ZeroFilteredComponent