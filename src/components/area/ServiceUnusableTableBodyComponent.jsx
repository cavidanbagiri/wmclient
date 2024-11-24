

import React from 'react'


import ServiceUnusableTableRowComponent from './ServiceUnusableTableRowComponent.jsx'

function ServiceUnusableTableBodyComponent(props) {

  return (
    <tbody className=''>
        {props.sending_data.map((item, index) => (
            <ServiceUnusableTableRowComponent key={item.id} index={index} item={item} header_for={props.header_for} />
         ))}
    </tbody>
  )
}

export default ServiceUnusableTableBodyComponent