
import { useDispatch, useSelector } from 'react-redux';

import AddStockEachComponent from "./AddStockEachComponent.jsx";
import CustomLoadingButton from "../common/CustomLoadingButton.jsx";

import WarehouseService from "../../services/warehouse-service.js";

import { AnimatePresence, motion } from 'framer-motion';

import { IoMdClose } from "react-icons/io";

import {
    addStockToggleFalse, setAddStockColorCond,
    setAddStockMessageBoxMessage,
    setAddStockMessageBoxTrue,
    setAddStockStatus
} from '../../store/warehouse-store';
import { useEffect } from 'react';
import SpinnerComponent from '../common/SpinnerComponent.jsx';

function AddStockComponent() {

    const dispatch = useDispatch();
    const fetch_selected_items = useSelector((state) => state.warehouseSlice.fetch_selected_items);
    const fetch_selected_items_pending = useSelector((state) => state.warehouseSlice.fetch_selected_items_pending);

    const addstock = useSelector((state) => state.warehouseSlice.addstock);

    const receiveStock = () => {
        let cond = true;
        for (const i of fetch_selected_items) {
            if (i.leftover <= 0) {
                cond = false;
                dispatch(setAddStockMessageBoxTrue());
                dispatch(setAddStockMessageBoxMessage('Stoka Eklenmek istenen miktar, kalan miktardan fazla olamaz'));
                dispatch(setAddStockColorCond('bg-red-500'));
                return;
            }
            if (i.entered_amount <= 0) {
                cond = false;
                dispatch(setAddStockMessageBoxTrue());
                dispatch(setAddStockMessageBoxMessage(ENTERING_ZERO_VALUE_ERROR));
                dispatch(setAddStockColorCond('bg-red-500'));
                return;
            }
            else if (Number(i.entered_amount) > i.leftover) {
                cond = false;
                dispatch(setAddStockMessageBoxTrue());
                dispatch(setAddStockMessageBoxMessage('Girilen Miktar Kalan Miktardan Fazla Olamaz'));
                dispatch(setAddStockColorCond('bg-red-500'));
                return;
            }
        }
        if (cond) {
            dispatch(WarehouseService.receiveToStock(fetch_selected_items));
        }
    }

    useEffect(() => {
        if (addstock.status === 201) {
            setTimeout(() => {
                dispatch(setAddStockStatus())
            }, 2000)
        }
    }, [addstock.status])

    return (


        <div
            className='flex flex-row justify-between z-10 fixed top-0 right-0 w-full h-full bg-black bg-opacity-30 '>
            <div className='w-1/2' ></div>
            <AnimatePresence>
                <motion.div exit={{ opacity: 0, x: -400, }} initial={{ opacity: 0, x: 200, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
                    className='flex flex-col bg-white w-1/2 overflow-y-auto' >
                    {/* Close Component Section */}
                    <div className='flex justify-between p-5 text-end'>
                        <span style={{ fontWeight: 600, fontFamily: 'Open Sans' }} className='text-3xl'>
                            Stoka Ekle
                        </span>
                        <span
                            onClick={() => {
                                dispatch(addStockToggleFalse());
                            }}
                            className='p-2 hover:bg-gray-100 hover:cursor-pointer rounded-lg'>
                            <IoMdClose className='text-2xl' />
                        </span>
                    </div>
                    <div className={'p-5 '}>

                        {fetch_selected_items_pending && <div className='flex justify-center w-full'> <SpinnerComponent /> </div>
                        }

                        { 
                        fetch_selected_items == null ? '' :
                        fetch_selected_items && !fetch_selected_items_pending &&
                            fetch_selected_items.map((item, index) => (
                                <AddStockEachComponent item={item} key={index} />
                            ))
                        }

                        <div className={'flex justify-end'}>
                            {
                                !addstock.addstock_pending ?

                                    <button className={'bg-green-500 py-2 px-5 text-lg text-white rounded-lg'} onClick={receiveStock}>
                                        Onayla
                                    </button>
                                    :
                                    <CustomLoadingButton />
                            }
                        </div>

                    </div>
                </motion.div>
            </AnimatePresence>
        </div>


    )
}

export default AddStockComponent
