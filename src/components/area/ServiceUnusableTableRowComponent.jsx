
import React, { useState } from 'react'

import ServiceUnusableCommentBoxComponent from './ServiceUnusableCommentBoxComponent';
import ServiceUnusableReturnToStockComponent from './ServiceUnusableReturnToStockComponent' 

import { PiDotsThreeOutlineVerticalThin } from "react-icons/pi";


function ServiceUnusableTableRowComponent(props) {

  const [comment_box, setCommentBox] = React.useState(false);

  const [return_box, setReturnBox] = React.useState(false);

  const closeReturnBox = () => {
    setReturnBox(false)
  }
  
  return (
    <tr className=' text-sm text-center border-b hover:bg-gray-50 cursor-pointer' style={{ fontFamily: 'IBM Plex Sans' }}>
      <td className=' flex justify-center items-center py-2 h-full '
        onClick={() => {
          setReturnBox(!return_box)
        }}>
        <PiDotsThreeOutlineVerticalThin className=' text-center text-lg'/>
      </td>
      <td className='py-2'>{props.index + 1}</td>
      <td className='text-start px-2 max_two_line_table_row'>{props?.item?.stock?.warehouse_materials?.material_name} </td>
      <td className='px-2'>{props?.item?.stock?.warehouse_materials?.unit}</td>
      <td className='px-2'>{props.item.quantity}</td>
      <td>{props?.item?.stock?.serial_number}</td>
      <td className='text-center px-2'>{props?.item?.stock?.material_id}</td>
      <td className='text-ellipsis whitespace-nowrap  cursor-pointer hover:bg-gray-100 relative p-1' style={{ maxWidth: '200px' }}
        onClick={() => setCommentBox(!comment_box)}>
        <div className='overflow-hidden w-full '>
          {props.item.comment} 
        </div>
        {
          comment_box && <ServiceUnusableCommentBoxComponent comment_box={props.item.comment} />
        }
      </td>
      <td className='px-2'>{props?.item?.stock?.warehouse_materials?.po}</td>
      {/* <td className='px-2'>{props.item.created_by}</td> */}
      <td className='px-2'>{props.item.created_at}</td>
      
      {
        props.header_for === "unusable" &&
        <td className='px-2'>{props?.item?.stock?.warehouse_materials?.price}</td>
      }
      {
        props.header_for === "unusable" &&
        <td className='px-2'>{props?.item?.stock?.warehouse_materials?.currency}</td>
      }
      {/* <td className='px-2'>{props.item.abbrevation_name}</td> */}

      <td className='relative'>
        {
          return_box && <ServiceUnusableReturnToStockComponent 
          item={props.item} header_for={props.header_for} closeReturnBox={closeReturnBox} />
        }
      </td>

    </tr>
  )
}

export default ServiceUnusableTableRowComponent
