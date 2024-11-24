

import React from 'react'

function TableServiceUnusableHeader() {
  return (

    <thead className='text-black bg-gray-200 border font-medium text-base'>
        <tr>
            <th scope="col" className="px-6 py-3 text-center border">
                S/S
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Miktar
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Komment
            </th>
        </tr>
    </thead>
  )
}

export default TableServiceUnusableHeader