

import React from 'react'

function ServiceUnusableTableHeaderComponent(props) {
  return (
    <thead className='text-sm bg-gray-100'>
        <tr>
            <th scope="col" className="px-6 py-3 text-center border">
                F
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                S/S
            </th>
            <th scope="col" className="px-6 py-3 text-center border min-w-96">
                Malzeme Ismi
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Birim
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Miktar
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Seri No
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Malzeme ID Kodu
            </th>
            <th scope="col" className="px-6 py-3 text-center border ">
                Koment
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                STF No
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Yaratildi
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Tarih
            </th>
            {
                props.header_for === "unusable" &&
                <th scope="col" className="px-6 py-3 text-center border">
                    Fiyat
                </th>
            }
            {
                props.header_for === "unusable" &&
                <th scope="col" className="px-6 py-3 text-center border">
                    Para Birimi
                </th>
            }
            <th scope="col" className="px-6 py-3 text-center border">
                Proje
            </th>
        </tr>
    </thead>
  )
}

export default ServiceUnusableTableHeaderComponent