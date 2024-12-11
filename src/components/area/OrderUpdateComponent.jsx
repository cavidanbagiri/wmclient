
import { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import {
    setOrderSelectionUpdateToggleFalse,
} from '../../store/area-store.js';

import AreaService from "../../services/area-service.js";

import CustomLoadingButton from "../common/CustomLoadingButton.jsx";
import MessageBox from "../../layouts/MessageBox.jsx";
import SpinnerComponent from "../common/SpinnerComponent.jsx";


import { AnimatePresence, motion } from 'framer-motion';

function OrderUpdateComponent() {

    const dispatch = useDispatch();
    const po_data = useSelector((state) => state.areaSlice.po_data);
    const po_data_pending = useSelector((state) => state.areaSlice.po_data_pending);
    const order_update = useSelector((state) => state.areaSlice.order_update);

    // const [material_name, setMaterialName] = useState('');
    // const [qty, setQty] = useState(0);
    // const [unit, setUnit] = useState('');
    const [serial_number, setSerialNumber] = useState('');
    const [material_id, setMaterialId] = useState('');
    const [card_number, setCardNumber] = useState('');
    const [username, setUsername] = useState('');

    const [show_message_box, setShowMessageBox] = useState(false);
    const [show_message_box_message, setShowMessageBoxMessage] = useState('');


    const postFunc = () => {
        let cond = true;
        if (card_number.length < 4) {
            cond = false;
            setShowMessageBox(true);
            setShowMessageBoxMessage('Card Number must be greater than 4 characters');
            return;
        }
        else {
            let updated_data = {
                id: po_data?.data?.id,
                // material_name: material_name,
                // qty: qty,
                // serial_number: serial_number,
                // material_id: material_id,
                card_number: card_number,
                username: username,
            };
            dispatch(AreaService.updateArea(updated_data))
        }

    }



    useEffect(() => {
        if (po_data?.data?.card_number) {
            // setMaterialName(po_data.data?.material_name);
            // setQty(po_data.data?.qty);
            // setUnit(po_data.data?.unit);
            setSerialNumber(po_data.data?.serial_number);
            setMaterialId(po_data.data?.material_id);
            setCardNumber(po_data.data?.card_number);
            setUsername(po_data.data?.username);
        }
    }, [po_data]);

    useEffect(() => {
        if (show_message_box) {
            setTimeout(() => {
                setShowMessageBox(false);
            }, 2000)
        }
    }, [show_message_box])

    return (

        <div className='flex flex-row justify-between z-10 fixed top-0 right-0 w-full h-full bg-black bg-opacity-30'>

            {
                show_message_box && <MessageBox message={show_message_box_message} color={'bg-red-500'} />
            }

            <div className='w-1/2' ></div>

            <AnimatePresence>
                <motion.div exit={{ opacity: 0, x: -400, }} initial={{ opacity: 0, x: 200, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
                    className='flex flex-col bg-white w-1/2' >
                    {/* Close and Title Component Section */}
                    <div className='flex justify-between p-5 text-end'>
                        <span style={{ fontWeight: 600, fontFamily: 'Open Sans' }} className='text-3xl'>
                            Guncelle
                        </span>
                        <span
                            onClick={() => {
                                dispatch(setOrderSelectionUpdateToggleFalse());
                            }}
                            className='p-2 hover:bg-gray-100 hover:cursor-pointer rounded-lg'>
                            <IoMdClose className='text-2xl' />
                        </span>
                    </div>
                    {po_data_pending && <div className='flex justify-center w-full'><SpinnerComponent /></div>}
                    {po_data && !po_data_pending &&
                        <div className='flex flex-col p-4 '>

                            {/* <div className='flex items-center justify-between mt-3'>
                                <span className='w-1/3'>Malzeme Ismi </span>
                                <div className='relative w-full flex justify-end'>
                                    <span className={''}>
                                        {material_name}
                                    </span>
                                </div>
                            </div>

                            <div className='flex items-center justify-between mt-3'>
                                <span className='w-1/3'>Sayisi</span>
                                <div className='relative'>
                                    {qty}
                                </div>
                            </div>

                            <div className='flex items-center justify-between mt-3'>
                                <span className='w-1/3'>Birim </span>
                                <div className='relative'>
                                    {unit}
                                </div>
                            </div> */}

                            {/* Serial Number Side */}
                            <div className='flex items-center justify-between mt-3'>
                                <span className='w-1/3'>Seri No </span>
                                <div className='relative w-full'>
                                    {serial_number}
                                </div>
                            </div>

                            {/* Material ID Side */}
                            <div className='flex items-center justify-between mt-3'>
                                <span className='w-1/3'>Malzeme ID Kodu </span>
                                <div className='relative w-full'>
                                    {material_id}
                                </div>
                            </div>

                            {/* Card Number */}
                            <div className='flex items-center justify-between mt-3'>
                                <span className='w-1/3'>Sicil No </span>
                                <div className='relative w-full'>
                                    <input value={card_number} type="text" className={'border p-2 rounded-lg'}
                                        onChange={(e) => {
                                            if (e.target.value.length < 4) {
                                                setShowMessageBox(true);
                                                setShowMessageBoxMessage('Sicil Numara en az 4 haneli olmalidir');
                                            }
                                            else {
                                                setCardNumber(e.target.value);
                                            }
                                        }} />
                                </div>
                            </div>

                            {/* Username */}
                            <div className='flex items-center justify-between mt-3'>
                                <span className='w-1/3'>Username </span>
                                <div className='relative w-full'>
                                    <input value={username} type="text" className={'border p-2 rounded-lg'}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 5) {
                                                setShowMessageBox(true);
                                                setShowMessageBoxMessage('Teslim Alan Ismi en az 5 haneli olmalidir');
                                            }
                                            else {
                                                setUsername(e.target.value);
                                            }
                                        }} />
                                </div>
                            </div>


                            {/* Button Field */}
                            {
                                !order_update.order_update_pending ?

                                    <div className='flex justify-end mt-10'>
                                        <button onClick={postFunc}
                                            className='px-6 py-3 bg-green-500 rounded-lg text-white'>Onayla</button>
                                    </div>
                                    :
                                    <CustomLoadingButton />
                            }
                        </div>
                    }
                </motion.div>
            </AnimatePresence>


        </div>
    )
}

export default OrderUpdateComponent