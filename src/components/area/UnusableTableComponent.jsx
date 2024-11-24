import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import AreaService from '../../services/area-service';

import ServiceUnusableTableHeaderComponent from './ServiceUnusableTableHeaderComponent.jsx';
import ServiceUnusableTableBodyComponent from './ServiceUnusableTableBodyComponent.jsx';
import MessageBox from '../../layouts/MessageBox.jsx';
import SpinnerComponent from '../../components/common/SpinnerComponent.jsx';

import { setUnusableToStockMessageBoxFalse } from '../../store/area-store.js';

function UnusableTable() {

  const dispatch = useDispatch();

  const user = useSelector(state => state.userSlice.user);
  const unusable_materials = useSelector(state => state.areaSlice.unusable_materials);
  const unusable_materials_pending = useSelector(state => state.areaSlice.unusable_materials_pending);
  
  const unusable_to_stock = useSelector(state => state.areaSlice.unusable_to_stock);

  useEffect(() => {
    dispatch(AreaService.getUnusableMaterials(user.projectId));
  }, [dispatch])

  // useEffect(() => {
  //   dispatch(AreaService.getServiceMaterials(user.projectId));
  // }, [dispatch])

  useEffect(() => {
    if (unusable_to_stock.message_box) {
      setTimeout(() => {
        dispatch(setUnusableToStockMessageBoxFalse())
      }, 2000)
    }
  })

  return (

    <div className='flex flex-col w-full my-3'>

      {
        unusable_to_stock.message_box &&
        <MessageBox message={unusable_to_stock.error_message} color={unusable_to_stock.color_cond} />
      }

      <table className='w-full'>
        <ServiceUnusableTableHeaderComponent header_for="unusable" />

        {
          !unusable_materials_pending &&
          <ServiceUnusableTableBodyComponent sending_data={unusable_materials} header_for="unusable" />
        }
      </table>

      {
          unusable_materials_pending && <div className='flex justify-center items-center h-96 w-full '><SpinnerComponent/></div>
      }

    </div>

  )
}

export default UnusableTable