
import { useDispatch, useSelector } from 'react-redux'

import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { BsArrowReturnLeft } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { PiWrenchLight } from "react-icons/pi";
import { AiOutlineSend } from "react-icons/ai";




import '../../css/dropdown.css';

import {
    setOrderSelectionReturnToggleTrue,
    setOrderSelectionUpdateToggleTrue,
    setOrderSelectionProvideToggleTrue,
    setOrderSelectionMaterialUnusableToggleTrue,
    setOrderSelectionMaterialServiceToggleTrue,
} from '../../store/stock-store.js';

import { rowInformToggleTrue } from '../../store/common-store.js';

import StockService from "../../services/stock-service.js";
import CommonService from '../../services/common.services.js';

import { AnimatePresence, motion } from 'framer-motion';
import { USER_MESSAGES } from '../../constants/values.js';


function OrderSelectedComponent(props) {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.userSlice.user);

    const selected_items = useSelector((state) => state.stockSlice.selected_items)

    return (

        <AnimatePresence>
            <motion.div className="flex flex-row justify-center fixed bottom-10 mb-4 rounded-lg overflow-hidden"
            exit={{ opacity: 0, y: -200, }} initial={{ opacity: 0, y: 200, }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            >

                <div className="flex justify-between bg-white border rounded-md shadow-2xl">
                    <div className="flex items-center">
                        <span className="bg-orange-500 py-4 px-6 text-white font-bold rounded-l-md text-2xl">{selected_items.length}</span>
                        <div className="mx-3">
                            <p style={{ fontWeight: 500 }} className='text-2xl'>Secilenler</p>
                        </div>
                    </div>
                    <div
                     className="flex items-center  ml-[100px]">

                        {/* Inform Row Field */}
                        <motion.div exit={{ opacity: 0, x: -200, }} initial={{ opacity: 0, x: 200, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                            onClick={() => {
                                if (selected_items.length > 1) {
                                    props.showMessaggeBoxMessageHandle('inform', USER_MESSAGES.TWO_OR_MORE_ROW_OPTION);
                                }
                                else {
                                    dispatch(rowInformToggleTrue());
                                    const data = { 'module': 'stock', 'id': selected_items[0] }
                                    dispatch(CommonService.getRowInform(data));
                                }
                            }}
                            className="flex flex-col items-center mx-3 cursor-pointer w-full hover:bg-gray-50">
                            <IoIosInformationCircleOutline className='text-2xl text-gray-800' />
                            <span className="text-xs w-20 text-center">Genel Bilgi</span>
                        </motion.div>

                        {/* Provide Row Side */}
                        <motion.div exit={{ opacity: 0, x: -200, }} initial={{ opacity: 0, x: 200, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                            onClick={() => {
                                if (selected_items.length === 0) {
                                    props.showMessageBoxMessageHandle('provide', USER_MESSAGES.ATLEAST_ONE_ROW_OPTION);
                                }
                                else {
                                    dispatch(setOrderSelectionProvideToggleTrue());
                                    dispatch(StockService.getDataByIds(selected_items));
                                }
                            }}
                            className="flex flex-col items-center mx-3 cursor-pointer w-full hover:bg-gray-50">
                            <AiOutlineSend className='text-2xl text-gray-800' />
                            <span className="text-xs w-20 text-center">Sahaya Cik</span>
                        </motion.div>

                        {/* Update Row Side */}
                        <motion.div exit={{ opacity: 0, x: -200, }} initial={{ opacity: 0, x: 200, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
                            onClick={() => {
                                if (selected_items.length > 1) {
                                    props.showMessaggeBoxMessageHandle('update', USER_MESSAGES.TWO_OR_MORE_ROW_OPTION);
                                }
                                else if(user.is_admin || user.status_code === '1000' || user.status_code === '10000' || user.status_code === '10001'){
                                    dispatch(setOrderSelectionUpdateToggleTrue());
                                    dispatch(StockService.getById(selected_items[0]));
                                }
                                else {
                                    props.showMessaggeBoxMessageHandle('update', USER_MESSAGES.AUTHORIZATION_ERROR);
                                }
                            }}
                            className="flex flex-col items-center mx-3 cursor-pointer hover:bg-gray-50">
                            <CiEdit className='text-2xl text-gray-800' />
                            <span className="text-xs w-20 text-center">Guncelle</span>
                        </motion.div>

                        {/* Delete Side */}
                        <motion.div exit={{ opacity: 0, x: -200, }} initial={{ opacity: 0, x: 200, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
                            onClick={() => {
                                props.showMessaggeBoxMessageHandle('delete', USER_MESSAGES.AUTHORIZATION_ERROR);
                            }}
                            className="flex flex-col items-center mx-3 cursor-pointer hover:bg-gray-50">
                            <MdDeleteOutline className='text-2xl text-gray-800' />
                            <span className="text-xs w-20 text-center">Secileni Sil</span>
                        </motion.div>

                        {/* Return Warehouse Side */}
                        <motion.div exit={{ opacity: 0, x: -200, }} initial={{ opacity: 0, x: 200, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
                            onClick={() => {
                                if (selected_items.length === 0) {
                                    props.showMessaggeBoxMessageHandle('return', USER_MESSAGES.ATLEAST_ONE_ROW_OPTION);
                                }
                                else if (selected_items.length > 1) {
                                    props.showMessaggeBoxMessageHandle('return', USER_MESSAGES.TWO_OR_MORE_ROW_OPTION);
                                }
                                else if(user.is_admin || user.status_code === '1000' || user.status_code === '10000' || user.status_code === '10001'){
                                    dispatch(setOrderSelectionReturnToggleTrue());
                                    dispatch(StockService.getById(selected_items[0]));
                                }
                                else {
                                    props.showMessaggeBoxMessageHandle('return', USER_MESSAGES.AUTHORIZATION_ERROR);
                                }
                            }}
                            className="flex flex-col items-center mx-3 cursor-pointer w-full hover:bg-gray-50">
                            <BsArrowReturnLeft className='text-2xl text-gray-800' />
                            <span className="text-xs w-20 text-center">Geri Al</span>
                        </motion.div>

                        {/* Set unusable materials Side */}
                        <motion.div exit={{ opacity: 0, x: -200, }} initial={{ opacity: 0, x: 200, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}
                            onClick={() => {
                                if (selected_items.length === 0) {
                                    props.showMessaggeBoxMessageHandle('unusablematerial', USER_MESSAGES.ATLEAST_ONE_ROW_OPTION);
                                }
                                else if (selected_items.length > 1) {
                                    props.showMessaggeBoxMessageHandle('unusablematerial', USER_MESSAGES.TWO_OR_MORE_ROW_OPTION);
                                }
                                else {
                                    dispatch(setOrderSelectionMaterialUnusableToggleTrue());
                                    dispatch(StockService.getById(selected_items[0]));
                                }
                            }}
                            className="flex flex-col items-center mx-2 cursor-pointer w-full hover:bg-gray-50">
                            <IoIosCloseCircleOutline className='text-2xl text-gray-800' />
                            <span className="text-xs w-20 text-center">Zayiat Cikar</span>
                        </motion.div>

                        <motion.div exit={{ opacity: 0, x: -200, }} initial={{ opacity: 0, x: 200, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.0 }}
                            onClick={() => {
                                if (selected_items.length === 0) {
                                    props.showMessaggeBoxMessageHandle('servicematerial', USER_MESSAGES.ATLEAST_ONE_ROW_OPTION);
                                }
                                else if (selected_items.length > 1) {
                                    props.showMessaggeBoxMessageHandle('servicematerial', USER_MESSAGES.TWO_OR_MORE_ROW_OPTION);
                                }
                                else {
                                    dispatch(setOrderSelectionMaterialServiceToggleTrue());
                                    dispatch(StockService.getById(selected_items[0]));
                                }
                            }}
                            className="flex flex-col items-center mx-2 cursor-pointer w-full hover:bg-gray-50">
                            <PiWrenchLight className='text-2xl text-gray-800' />
                            <span className="text-xs w-20 text-center">Servise Gonder</span>
                        </motion.div>

                    </div>
                </div>
            </motion.div>
        </AnimatePresence>

    )
}

export default OrderSelectedComponent