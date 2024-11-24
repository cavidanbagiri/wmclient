
import { useDispatch, useSelector } from 'react-redux'

import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";

import WarehouseService from '../../services/warehouse-service';
import CommonService from '../../services/common.services';

import { rowInformToggleTrue } from '../../store/common-store';

import {
    addStockToggleTrue,
    setOrderSelectionUpdateToggleTrue
} from '../../store/warehouse-store';


import '../../css/dropdown.css';
import { AnimatePresence, motion } from 'framer-motion';
import { USER_MESSAGES } from '../../constants/values';




function OrderSelectedComponent(props) {

    const dispatch = useDispatch();

    const selected_items = useSelector((state) => state.warehouseSlice.selected_items)

    const user = useSelector((state) => state.userSlice.user);

    return (

        <AnimatePresence>
            <motion.div className='flex flex-row justify-center fixed bottom-10 mb-4 rounded-lg overflow-hidden' 
             exit={{ opacity: 0, y: -200, }} initial={{ opacity: 0, y: 200, }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="flex justify-between bg-white border rounded-md shadow-2xl">
                    <div className="flex items-center">
                        <span className="bg-orange-500 py-4 px-6 text-white font-bold rounded-l-md text-2xl">{selected_items.length}</span>
                        <div className="mx-3">
                            <p style={{ fontWeight: 500 }} className='text-2xl'>Secilenler</p>
                        </div>
                    </div>
                    <div className="flex items-center  ml-[100px]">

                        <motion.div exit={{ opacity: 0, x: -200, }} initial={{ opacity: 0, x: 200, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                            onClick={() => {
                                if (selected_items.length > 1) {
                                    props.showMessaggeBoxMessageHandle('inform', USER_MESSAGES.TWO_OR_MORE_ROW_OPTION);
                                }
                                else {
                                    dispatch(rowInformToggleTrue());
                                    const data = { 'module': 'warehouse', 'id': selected_items[0] }
                                    dispatch(CommonService.getRowInform(data));
                                }
                            }}
                            className="flex flex-col items-center mx-3 cursor-pointer w-full hover:bg-gray-50">
                            <IoIosInformationCircleOutline className='text-2xl text-gray-800' />
                            <span className="text-xs w-20 text-center">Genel Bilgi</span>
                        </motion.div>

                        <motion.div exit={{ opacity: 0, x: -200, }} initial={{ opacity: 0, x: 200, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                            onClick={() => {
                                if (selected_items.length > 1) {
                                    props.showMessaggeBoxMessageHandle('update', USER_MESSAGES.TWO_OR_MORE_ROW_OPTION);
                                }
                                else if(user.is_admin || user.status_code === '1000' || user.status_code === '10000' || user.status_code === '10001'){
                                    dispatch(setOrderSelectionUpdateToggleTrue());
                                    dispatch(WarehouseService.getPOById(selected_items[0]));
                                }
                                else {
                                    props.showMessaggeBoxMessageHandle('update', USER_MESSAGES.AUTHORIZATION_ERROR);
                                }
                            }}
                            className="flex flex-col items-center mx-3 cursor-pointer hover:bg-gray-50">
                            <CiEdit className='text-2xl text-gray-800' />
                            <span className="text-xs w-20 text-center">Guncelle</span>
                        </motion.div>

                        <motion.div exit={{ opacity: 0, x: -200, }} initial={{ opacity: 0, x: 200, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
                            onClick={() => {
                                props.showMessaggeBoxMessageHandle('delete', USER_MESSAGES.AUTHORIZATION_ERROR);
                            }}
                            className="flex flex-col items-center mx-3 cursor-pointer hover:bg-gray-50">
                            <MdDeleteOutline className='text-2xl text-gray-800' />
                            <span className="text-xs w-16 text-center">Secileni Sil</span>
                        </motion.div>

                        <motion.div exit={{ opacity: 0, x: -200, }} initial={{ opacity: 0, x: 200, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
                            onClick={() => {
                                if (selected_items.length === 0) {
                                    props.showMessageBoxMessageHandle('addstock', USER_MESSAGES.ATLEAST_ONE_ROW_OPTION);
                                }
                                else if(user.is_admin || user.status_code === '1000' || user.status_code === '10000' || user.status_code === '10001'){
                                    dispatch(addStockToggleTrue());
                                    dispatch(WarehouseService.fetchSelectedItemsById(selected_items));
                                }
                                else {
                                    props.showMessaggeBoxMessageHandle('addstock', USER_MESSAGES.AUTHORIZATION_ERROR);
                                }
                            }}
                            className="flex flex-col items-center mx-3 cursor-pointer w-full hover:bg-gray-50">
                            <IoIosAddCircleOutline className='text-2xl text-gray-800' />
                            <span className="text-xs w-20 text-center">Stoka Ekle</span>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>


    )
}

export default OrderSelectedComponent