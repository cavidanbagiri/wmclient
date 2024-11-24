
import React from 'react'

function TableServiceUnusableBody(props) {
    return (
        <tr>
            <th scope="col" className="px-6 py-3 text-center border">
                {props.index}
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                {props.item.amount}
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                {props.item.comments}
            </th>
        </tr>
    )
}

export default TableServiceUnusableBody