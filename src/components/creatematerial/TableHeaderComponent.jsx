import React from 'react'

function TableHeaderComponent() {
  return (
    <thead  className="text-black bg-gray-200 border font-medium text-xs" >
    <tr>
      <th scope="col" className="px-6 py-2 text-center border">
        S/S
      </th>
      <th scope="col" className="px-6 py-1 text-center border min-w-40 font-medium ">
        <div className="">
          Malzeme Kodu
        </div>
      </th>
      <th scope="col" className="px-6 py-1 text-center border min-w-64 font-medium ">
        <div className="">
          Malzeme Aciklama
        </div>
      </th>
      <th scope="col" className="px-6 py-1 text-center border w-1/3 font-medium ">
        <div className="">
          Malzeme Ismi
        </div>
      </th>
      <th scope="col" className="px-6 py-1 text-center border font-medium ">
        <div className="">
          Malzeme Tipi
        </div>
      </th>
      <th scope="col" className="px-6 py-1 text-center border min-w-28 font-medium ">
        Sayi
      </th>
      <th scope="col" className="px-6 py-1 text-center border w-4 font-medium ">
        Birim
      </th>
      <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
        Fiyat
      </th>
      <th scope="col" className="px-6 py-1 text-center border font-medium  min-w-28">
        Toplam
      </th>
      <th scope="col" className="px-6 py-1 text-center border font-medium min-w-24">
        Siparis Numarasi
      </th>
      <th scope="col" className="px-6 py-1 text-center border font-medium w-28">
        Sertifika
      </th>
      <th scope="col" className="px-6 py-1 text-center border font-medium w-28">
        Pasaport
      </th>

    </tr>
    </thead>
  )
}

export default TableHeaderComponent