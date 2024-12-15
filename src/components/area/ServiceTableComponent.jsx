import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import AreaService from '../../services/area-service';

import ServiceUnusableTableHeaderComponent from './ServiceUnusableTableHeaderComponent.jsx';
import ServiceUnusableTableBodyComponent from './ServiceUnusableTableBodyComponent.jsx';
import MessageBox from '../../layouts/MessageBox.jsx';
import SpinnerComponent from '../../components/common/SpinnerComponent.jsx';

import { setServiceToStockMessageBoxFalse } from '../../store/area-store.js';

function ServiceTableComponent() {

    const dispatch = useDispatch();

    const user = useSelector(state => state.userSlice.user);
    const service_materials = useSelector(state => state.areaSlice.service_materials);
    const service_materials_pending = useSelector(state => state.areaSlice.service_materials_pending);
    const service_to_stock = useSelector(state => state.areaSlice.service_to_stock);

    useEffect(() => {
        dispatch(AreaService.getServiceMaterials());
    }, [dispatch])

    useEffect(() => {
        if (service_to_stock.message_box) {
            setTimeout(() => {
                dispatch(setServiceToStockMessageBoxFalse())
            }, 2000)
        }
    })

    return (
        <div className='flex flex-col w-full my-3'>

            {
                service_to_stock.message_box &&
                <MessageBox message={service_to_stock.error_message} color={service_to_stock.color_cond} />
            }

            <table className='w-full'>
                <ServiceUnusableTableHeaderComponent header_for="service" />

                {
                    !service_materials_pending &&
                    <ServiceUnusableTableBodyComponent sending_data={service_materials} header_for="service" />
                }

            </table>

            {
                service_materials_pending && <div className='flex justify-center items-center h-96 w-full '><SpinnerComponent /></div>
            }

        </div>
    )
}

export default ServiceTableComponent