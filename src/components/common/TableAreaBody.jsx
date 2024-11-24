


import React from 'react'

function TableAreaBody(props) {
    return (
        
            <tr>
                <th scope="col" className="px-6 py-3 text-center border">
                    {props.index}
                </th>
                <th scope="col" className="px-6 py-3 text-center border">
                    {props.item.card_number}
                </th>
                <th scope="col" className="px-6 py-3 text-center border">
                    {props.item.username}
                </th>
                <th scope="col" className="px-6 py-3 text-center border">
                    {props.item.GroupModel.group_name}
                </th>
            </tr>
    )
}

export default TableAreaBody