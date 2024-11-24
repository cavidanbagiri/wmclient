
import React from 'react'

function TableStockBody(props) {
    return (
        
            <tr>
                <th scope="col" className="px-6 py-3 text-center border">
                    {props.index}
                </th>
                <th scope="col" className="px-6 py-3 text-center border">
                    {props.item.qty}
                </th>
                <th scope="col" className="px-6 py-3 text-center border">
                    {props.item.stock}
                </th>
                <th scope="col" className="px-6 py-3 text-center border">
                {props.item.serial_number}
                </th>
                <th scope="col" className="px-6 py-3 text-center border">
                {props.item.material_id}
                </th>
            </tr>
    )
}

export default TableStockBody