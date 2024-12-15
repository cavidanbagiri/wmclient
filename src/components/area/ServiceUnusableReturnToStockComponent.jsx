
import React from 'react'

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import AreaService from '../../services/area-service';

import CustomLoadingButton from '../common/CustomLoadingButton';

function ServiceUnusableReturnToStockComponent(props) {

    const dispatch = useDispatch();

    const [return_amount, setReturnAmount] = React.useState(props.item.amount);

    const service_to_stock = useSelector(state => state.areaSlice.service_to_stock);
    const unusable_to_stock = useSelector(state => state.areaSlice.unusable_to_stock);

    return (
        <div className='flex flex-col justify-around absolute top-10 right-10 bg-white p-3 w-96 border rounded-xl shadow-xl z-10'>

            <span
                onClick={() => {
                    props.closeReturnBox()
                }}
                className=' text-end cursor-pointer'>
                X
            </span>

            <span className='text-center text-2xl font-bold mt-5'>
                Geri Al
            </span>

            <label htmlFor="amount" className='text-start text-gray-400 text-lg mt-10'>Miktar</label>
            <input className='w-full p-3  text-lg rounded-lg border shadow-lg' onChange={(e) => {
                setReturnAmount(e.target.value)
            }}
                type="number" value={return_amount} name="amount" id="" />


            {
                !unusable_to_stock.pending && !service_to_stock.pending ?

                <button onClick={() => {
                    const sending_data = {
                        id: props.item.id,
                        quantity: return_amount
                    }
    
                    if (props.header_for === "unusable") {
                        dispatch(AreaService.unusableReturnToStock(sending_data))
                    }
                    else if (props.header_for === "service") {
                        dispatch(AreaService.serviceReturnToStock(sending_data))
                    }
                }}
    
                    className='w-full p-2  text-lg rounded-lg bg-green-500 text-white font-bold shadow-lg mt-10 mb-5'>
                    Geri Al
                </button>

                :
                <CustomLoadingButton/>

            }

            

        </div>
    )
}

export default ServiceUnusableReturnToStockComponent
