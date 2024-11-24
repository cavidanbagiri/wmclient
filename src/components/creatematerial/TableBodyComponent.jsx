import React, { useEffect, useState } from 'react'
import TableRowComponent from './TableRowComponent'
import { useSelector, useDispatch } from 'react-redux';
import AdminService from '../../services/admin-service';
function TableBodyComponent() {

    const table_check = useSelector((state) => state.createTableSlice.table_check);
    const material_code = useSelector((state) => state.commonSlice.material_code);


    return (

        <tbody className='text-[11px] text-center' style={{ fontFamily: 'Roboto' }}>

            {table_check.map((item, index) => (
                <TableRowComponent key={index + 1} index={index + 1} data={material_code.material_codes} />
            ))}

        </tbody>
    )
}

export default TableBodyComponent