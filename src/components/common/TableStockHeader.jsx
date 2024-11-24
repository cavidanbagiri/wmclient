
import React from 'react'

function TableStockHeader() {
  return (
    <thead className='text-black bg-gray-200 border font-medium text-base'>
        <tr>
            <th scope="col" className="px-6 py-3 text-center border">
                S/S
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Qty
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Stock
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Serial No
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Material ID
            </th>
        </tr>
    </thead>
  )
}

export default TableStockHeader