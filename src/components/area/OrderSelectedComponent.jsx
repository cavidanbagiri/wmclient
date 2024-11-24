
import { useDispatch, useSelector } from 'react-redux'

import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { BsArrowReturnLeft } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";

import '../../css/dropdown.css';

import {
    setOrderSelectionUpdateToggleTrue, setOrderSelectionReturnToggleTrue,
} from '../../store/area-store.js';

import { AnimatePresence, motion } from 'framer-motion';

import AreaService from "../../services/area-service.js";
import { USER_MESSAGES } from '../../constants/values.js';

function OrderSelectedComponent(props) {

    const dispatch = useDispatch();

    const selected_items = useSelector((state) => state.areaSlice.selected_items)

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
                    <div className="flex items-center  ml-[100px]">

                        {/* Update Row Side */}
                        <motion.div exit={{ opacity: 0, x: -200, }} initial={{ opacity: 0, x: 200, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                            onClick={() => {
                                if (selected_items.length > 1) {
                                    props.showMessaggeBoxMessageHandle('update', USER_MESSAGES.TWO_OR_MORE_ROW_OPTION);
                                }
                                else {
                                    dispatch(setOrderSelectionUpdateToggleTrue());
                                    dispatch(AreaService.getById(selected_items[0]));
                                }
                            }}
                            className="flex flex-col items-center mx-3 cursor-pointer hover:bg-gray-50">
                            <CiEdit className='text-2xl text-gray-800' />
                            <span className="text-xs w-20 text-center">Duzenle</span>
                        </motion.div>


                        {/* Return Stock Side */}
                        <motion.div exit={{ opacity: 0, x: -200, }} initial={{ opacity: 0, x: 200, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                            onClick={() => {
                                if (selected_items.length === 0) {
                                    props.showMessaggeBoxMessageHandle('returnstock', USER_MESSAGES.ATLEAST_ONE_ROW_OPTION);
                                }
                                else if (selected_items.length > 1) {
                                    props.showMessaggeBoxMessageHandle('returnstock', USER_MESSAGES.TWO_OR_MORE_ROW_OPTION);
                                }
                                else {
                                    dispatch(setOrderSelectionReturnToggleTrue());
                                    dispatch(AreaService.getById(selected_items[0]));
                                }
                            }}
                            className="flex flex-col items-center mx-3 cursor-pointer w-full hover:bg-gray-50">
                            <BsArrowReturnLeft className='text-2xl text-gray-800' />
                            <span className="text-xs w-20 text-center">Geri Al</span>
                        </motion.div>


                    </div>
                </div>

            </motion.div>
        </AnimatePresence>


    )
}

export default OrderSelectedComponent