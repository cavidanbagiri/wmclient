
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WarehouseService from '../services/warehouse-service';

import TableHeaderComponent from '../components/warehouse/TableHeaderComponent'
import TableBodyComponent from '../components/warehouse/TableBodyComponent'
import OrderSelectedComponent from '../components/warehouse/OrderSelectedComponent';
import ZeroFilteredComponent from '../components/warehouse/ZeroFilteredComponent';
import MaterialTypeInform from '../components/warehouse/MaterialTypeInformComponent';
import MessageBox from '../layouts/MessageBox';
import RowInformationComponent from '../components/common/RowInformationComponent.jsx';
import OrderUpdateComponent from '../components/warehouse/OrderUpdateComponent';
import TableColumnFilterComponent from "../components/warehouse/TableColumnFilterComponent.jsx";
import AddStockComponent from "../components/warehouse/AddStockComponent.jsx";
import FilterComponent from "../components/warehouse/FilterComponent.jsx";
import PageTitleComponent from '../components/warehouse/PageTitleComponent.jsx';
import SpinnerComponent from '../components/common/SpinnerComponent.jsx';

import { IoFilterOutline } from "react-icons/io5";

import CommonService from '../services/common.services.js';

import {
    setOrderSelectionUpdateToggleTrue,
    setOrderUpdateMessageBoxFalse,
    addStockToggleTrue,
    setAddStockMessageBoxFalse,
    clearSelected,
    setCertificateAndPassportMessageBoxFalse,
    setUploadCertificateAndPassportMessageBoxFalse
} from "../store/warehouse-store.js";
import { rowInformToggleTrue } from "../store/common-store.js";
import { USER_MESSAGES } from '../constants/values.js';



function WarehousePage() {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.userSlice.user);
    const type_count = useSelector((state) => state.commonSlice.type_count);
    const filtered_warehouse_data = useSelector((state) => state.warehouseSlice.filtered_warehouse_data);
    const filtered_warehouse_data_pending = useSelector((state) => state.warehouseSlice.filtered_warehouse_data_pending);
    const selected_items = useSelector((state) => state.warehouseSlice.selected_items);
    const row_inform = useSelector((state) => state.commonSlice.row_inform);
    const order_update = useSelector((state) => state.warehouseSlice.order_update);
    const addstock = useSelector((state) => state.warehouseSlice.addstock);
    const certificate_and_passport = useSelector((state) => state.warehouseSlice.certificate_and_passport);
    const upload_certificate_and_passport = useSelector((state) => state.warehouseSlice.upload_certificate_and_passport);


    const [show_message_box, setShowMessageBox] = useState(false);
    const [show_message_box_message, setShowMessageBoxMessage] = useState('');

    const [show_table_column_component, setShowTableColumnCompoenent] = useState(false);


    const clearFilter = () => {
        const projectId = user.projectId;
        dispatch(WarehouseService.fetchWarehouseData(projectId));
        // setDocumentNum('');
        // setMaterialName('');
        // setSelectedDate('');
        // setPO('');
    }

    const getTypeFilter = (type) => {
        console.log('coming is ', type);
        let data = {
            material_type_id: type,
        }
        dispatch(WarehouseService.filterWarehouseData(data));
    }

    // Show Message Box Message Controller
    const showMessageBoxMessageHandle = (key, value) => {
        if (key === 'update') {
            setShowMessageBox(true);
            setShowMessageBoxMessage(value)
        }
        else if (key === 'delete') {
            setShowMessageBox(true);
            setShowMessageBoxMessage(value)
        }
        else if (key === 'inform') {
            setShowMessageBox(true);
            setShowMessageBoxMessage(value)
        }
        else if (key === 'addstock') {
            setShowMessageBox(true);
            setShowMessageBoxMessage(value)
        }
    }

    // Fetch Warehouse Data
    useEffect(() => {
        // const projectId = user.projectId;
        dispatch(WarehouseService.fetchWarehouseData());
    }, [dispatch])

    useEffect(() => {
        return () => {
            dispatch(clearSelected());
        }
    }, [dispatch]);

    // Toggle Message Box after adding stock the element
    useEffect(() => {
        if (addstock.addstock_message_box === true) {
            setTimeout(() => {
                dispatch(setAddStockMessageBoxFalse());
            }, 2000)
        }
    }, [addstock.addstock_message_box, dispatch])

    useEffect(() => {
        if (order_update.order_update_message_box === true) {
            setTimeout(() => {
                dispatch(setOrderUpdateMessageBoxFalse());
            }, 2000)
        }
    }, [order_update.order_update_message_box, dispatch])

    // Show Message Box Controller
    useEffect(() => {
        if (show_message_box) {
            setTimeout(() => {
                setShowMessageBox(false);
            }, 2000)
        }
    }, [show_message_box])


    // Set Certificate and Passport Message Box False
    useEffect(() => {
        if (certificate_and_passport.message_box === true) {
            setTimeout(() => {
                dispatch(setCertificateAndPassportMessageBoxFalse());
            }, 2000)
        }
    }, [certificate_and_passport.message_box, dispatch]);

    // Set Upload Certificate and Passport Message Box False
    useEffect(() => {
        if (upload_certificate_and_passport.message_box === true) {
            setTimeout(() => {
                dispatch(setUploadCertificateAndPassportMessageBoxFalse());
            }, 2000)
        }
    }, [upload_certificate_and_passport.message_box, dispatch]);

    return (

        <div className='flex flex-col items-center'>


            {
                show_message_box && <MessageBox message={show_message_box_message} color={'bg-red-500'} />
            }


            {/* Order Update */}
            {
                order_update.order_update_toggle && <OrderUpdateComponent />
            }
            {
                order_update.order_update_message_box && <MessageBox message={order_update.order_update_error_message} color={order_update.order_update_color_cond} />
            }


            {/* Add Stock */}
            {
                addstock.addstock_toggle && <AddStockComponent />
            }
            {
                addstock.addstock_message_box && <MessageBox message={addstock.addstock_error_message} color={addstock.addstock_color_cond} />
            }


            {/* order Information */}
            {
                row_inform.toggle && <RowInformationComponent />
            }


            {/* Certificate and Passport */}
            {
                certificate_and_passport.message_box && <MessageBox message={certificate_and_passport.error_message} color={certificate_and_passport.color_cond} />
            }

            {/* Certificate and Passport */}
            {
                upload_certificate_and_passport.message_box && <MessageBox message={upload_certificate_and_passport.error_message} color={upload_certificate_and_passport.color_cond} />
            }


            {/* Page Title */}
            <PageTitleComponent />


            {/* Type Information */}
            <div className='flex flex-col w-full px-3'>
                <span style={{ fontWeight: 700, fontFamily: 'IBM Plex Sans' }} className='px-2 text-[32px] text-start my-2 '>Malzeme Tip Ozeti</span>
                <div className='flex  w-full items-start px-2 mt-2 mb-5 '>

                    {/* Material Type Section */}
                    <div className='flex items-start w-full '>
                        {
                            type_count.length > 0 &&
                            type_count.map((item, index) => (
                                item.type === 'Sarf' ? <MaterialTypeInform color={'border-red-500'} key={index + 1} title={item.type} item={item} getTypeFilter={getTypeFilter} />
                                    : item.type === 'Proje' ? <MaterialTypeInform color={'border-green-500'} key={index + 1} title={item.type} item={item} getTypeFilter={getTypeFilter} />
                                        : item.type === 'Demirbas' ? <MaterialTypeInform color={'border-blue-500'} key={index + 1} title={item.type} item={item} getTypeFilter={getTypeFilter} />
                                            : item.type === 'It Malzeme' ? <MaterialTypeInform color={'border-pink-500'} key={index + 1} title={item.type} item={item} getTypeFilter={getTypeFilter} />
                                                : item.type === 'Idari Isler' ? <MaterialTypeInform color={'border-sky-500'} key={index + 1} title={item.type} item={item} getTypeFilter={getTypeFilter} />
                                                    : <MaterialTypeInform key={index + 1} color={'border-orange-500'} item={item} title={item.type} getTypeFilter={getTypeFilter} />
                            ))
                        }
                    </div>

                    {/* Button Section */}
                    <div className='flex flex-col justify-between items-start w-full '>

                        {/* Working Buttons Section */}
                        <div className='flex justify-end text-xs w-full' style={{ fontWeight: 500 }}>

                            <button onClick={() => {
                                if (selected_items.length === 0) {
                                    showMessageBoxMessageHandle('addstock', USER_MESSAGES.ATLEAST_ONE_ROW_OPTION);
                                }
                                else if(user.is_admin || user.status_code === '1000' || user.status_code === '10000' || user.status_code === '10001'){
                                    dispatch(addStockToggleTrue());
                                    dispatch(WarehouseService.fetchSelectedItemsById(selected_items));
                                }
                                else {
                                    showMessageBoxMessageHandle('addstock', USER_MESSAGES.AUTHORIZATION_ERROR);
                                }
                            }}
                                className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-indigo-600  hover:bg-indigo-600 hover:text-white duration-200 text-[11px]' >Stoka Ekle</button>

                            <button onClick={() => {
                                if (selected_items.length > 1) {
                                    showMessageBoxMessageHandle('update', USER_MESSAGES.TWO_OR_MORE_ROW_OPTION);
                                }
                                else if (selected_items.length === 0) {
                                    showMessageBoxMessageHandle('update', USER_MESSAGES.ATLEAST_ONE_ROW_OPTION);
                                }
                                else if(user.is_admin || user.status_code === '1000' || user.status_code === '10000' || user.status_code === '10001'){
                                    dispatch(setOrderSelectionUpdateToggleTrue());
                                    dispatch(WarehouseService.getPOById(selected_items[0]));
                                }
                                else {
                                    showMessageBoxMessageHandle('update', USER_MESSAGES.AUTHORIZATION_ERROR);
                                }
                            }}
                                className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white duration-200 text-[11px]' >Secileni Guncelle</button>
                           
                            <button onClick={() => {
                                showMessageBoxMessageHandle('delete', USER_MESSAGES.AUTHORIZATION_ERROR);
                            }}
                                className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white duration-200 text-[11px]' >Secileni Sil</button>

                            <button onClick={() => {
                                if (selected_items.length > 1) {
                                    showMessageBoxMessageHandle('inform', USER_MESSAGES.TWO_OR_MORE_ROW_OPTION);
                                }
                                else if (selected_items.length === 0) {
                                    showMessageBoxMessageHandle('inform', USER_MESSAGES.ATLEAST_ONE_ROW_OPTION);
                                }
                                else {
                                    dispatch(rowInformToggleTrue());
                                    const data = {'module':'warehouse', 'id':selected_items[0]}
                                    dispatch(CommonService.getRowInform(data));
                                }
                            }}
                                className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white duration-200 text-[11px]' >Genel Bilgi</button>
                            
                            <button onClick={clearFilter} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white duration-200 text-[11px]' >Filtereyi Temizle</button>

                            <button onClick={() => {
                                dispatch(clearSelected());
                            }} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white duration-200 text-[11px]' >Secilenleri Temizle</button>
                        
                        </div>

                        {/* Table Column Name Section */}
                        <div className=' flex justify-end items-center relative text-xs w-full px-4 mt-8' style={{ fontWeight: 600 }}>
                            <span onClick={() => {
                                show_table_column_component ? setShowTableColumnCompoenent(false) : setShowTableColumnCompoenent(true);
                            }}
                                className='text-sm font-medium text-gray-700 ml-2 hover:cursor-pointer' >Tablo Sutunlarini Ozellestir</span>
                            <span onClick={() => {
                                show_table_column_component ? setShowTableColumnCompoenent(false) : setShowTableColumnCompoenent(true);
                            }}
                                className='pl-2'><IoFilterOutline className='text-base hover:cursor-pointer' /></span>
                            {
                                show_table_column_component && <TableColumnFilterComponent />
                            }
                        </div>

                    </div>
                </div>
            </div>


            {/* Filter Title Section */}
            <div className='flex px-4 my-2 justify-start w-full'>
                <span className='text-3xl  tracking-tighter' style={{ fontWeight: 600, fontFamily: 'IBM Plex Sans' }}>Filtre Islemleri</span>
            </div>

            <FilterComponent />


            <table className='w-full flex-col'>
                <TableHeaderComponent />
                {
                    !filtered_warehouse_data_pending &&
                    <TableBodyComponent />
                }
            </table>

            {
                filtered_warehouse_data_pending &&
                <div className='flex justify-center items-center p-10 w-full h-96 '>
                    <SpinnerComponent />
                </div>
            }


            {
                !filtered_warehouse_data.length && filtered_warehouse_data_pending === false && <ZeroFilteredComponent resetFunc={clearFilter} />
            }

            {/* Row Selected Section */}
            {
                selected_items.length >= 1 ? <OrderSelectedComponent
                    showMessaggeBoxMessageHandle={showMessageBoxMessageHandle}
                /> : <div></div>
            }



        </div>
    )
}

export default WarehousePage