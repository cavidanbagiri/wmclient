


import React from 'react'

function TableAreaHeader() {
  return (
    <thead className='text-black bg-gray-200 border font-medium text-base'>
        <tr>
            <th scope="col" className="px-6 py-3 text-center border">
                S/S
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Sicil Numara
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Isim Soyisim
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Calistigi Grup
            </th>
        </tr>
    </thead>
  )
}

export default TableAreaHeader