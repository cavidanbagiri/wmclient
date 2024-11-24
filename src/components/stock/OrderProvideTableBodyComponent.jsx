
import { useSelector, useDispatch } from 'react-redux';

import OrderProvideTableRowComponent from './OrderProvideTableRowComponent';

function OrderProvideTableBodyComponent() {

    const order_provide = useSelector(state => state.stockSlice.order_provide);
    
    return (

        <tbody className='text-xs text-center' style={{ fontFamily: 'Roboto' }}>

            {
                order_provide.map((item, index) => (
                    <OrderProvideTableRowComponent key={index + 1} index={index + 1} item={item} />
                ))
            }

        </tbody>
    )
}

export default OrderProvideTableBodyComponent