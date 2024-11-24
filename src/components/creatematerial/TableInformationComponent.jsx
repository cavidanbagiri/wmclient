import React from 'react'

function TableInformationComponent(props) {
    return (
        <div className='flex flex-row justify-between items-center mt-3 mb-5 px-5'>

            <div className='flex justify-start text-base'>
                <div className='' >
                    <p className='text-gray-400 text-md'>
                        Toplam Satir:
                    </p>
                    <span className='font-bold text-xl'>
                        {props.table.length}
                    </span>
                </div>
                <div className='pl-40' >
                    <p className='text-gray-400 text-md'>
                        Cari Girilen Fiyat:
                    </p>
                    <span className='font-bold text-xl'>
                        {props.total_price.toFixed(2)} ₽
                    </span>
                </div>
                <div className='pl-40' >
                    <p className='text-gray-400 text-md'>
                        Toplam Girilen Fiyat:
                    </p>
                    <span className='font-bold text-xl'>
                        {props.total_price.toFixed(2)} ₽
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TableInformationComponent