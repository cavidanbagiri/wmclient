
import React, { useState } from 'react'

import TableColumnFilterComponent from './TableColumnFilterComponent';

import { IoFilterOutline } from "react-icons/io5";


function TableColumnComponentToggle() {

    const [show_table_column_component, setShowTableColumnCompoenent] = useState(false);
    
    return (
        <div className='flex justify-end items-center relative text-xs w-full px-4 my-4' style={{ fontWeight: 600 }}>
            <span onClick={() => {
                show_table_column_component ? setShowTableColumnCompoenent(false) : setShowTableColumnCompoenent(true);
            }}
                className='text-sm font-medium text-gray-700 ml-2 hover:cursor-pointer'>Tablo Sutunlarini Ozellestir </span>
            <span onClick={() => {
                show_table_column_component ? setShowTableColumnCompoenent(false) : setShowTableColumnCompoenent(true);
            }}
                className='pl-2'><IoFilterOutline className='text-base hover:cursor-pointer' /></span>
            {
                show_table_column_component && <TableColumnFilterComponent />
            }
        </div>
    )
}

export default TableColumnComponentToggle