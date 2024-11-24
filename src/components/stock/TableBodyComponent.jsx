
import { useSelector, useDispatch } from 'react-redux';

import TableRowComponent from './TableRowComponent'

import {selectRow, unselectRow} from '../../store/stock-store';

import {rowInformToggleTrue} from '../../store/common-store';

import CommonService from '../../services/common.services';

function TableBodyComponent() {

    const dispatch = useDispatch();
    const filter_stock_data = useSelector((state) => state.stockSlice.filter_stock_data);
    const stock_column_filter = useSelector(state => state.stockSlice.stock_column_filter);
    const user = useSelector(state => state.userSlice.user);


    const handleChange = (event) => {
        event.target.checked ?
            dispatch(selectRow(event.target.value)) :
            dispatch(unselectRow(event.target.value))
    }

    const doubleClickInform = (po_id) => {
        dispatch(rowInformToggleTrue());
        const data = { 'module': 'stock', 'id': po_id }
        dispatch(CommonService.getRowInform(data));
    }

    return (

        <tbody className='text-[11px] text-center' style={{ fontFamily: 'Roboto' }}>

            {
                filter_stock_data.map((item, index) => (
                    <TableRowComponent key={index + 1} index={index + 1} item={item}
                                       handleChange={handleChange}
                                       user={user}
                                       stock_column_filter={stock_column_filter}
                                       //true_icon={true_icon}
                                       //false_icon={false_icon}
                                       //selected_items={selected_items}
                                       doubleClickInform = {doubleClickInform}
                    />
                ))
            }

        </tbody>
    )
}

export default TableBodyComponent