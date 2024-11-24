
import { useSelector, useDispatch } from 'react-redux';


import TableRowComponent from './TableRowComponent'

import { selectRow, unselectRow } from '../../store/warehouse-store';
import { rowInformToggleTrue } from '../../store/common-store';

import true_icon from '../../assets/true-icon.png';
import false_icon from '../../assets/false-icon.png';
import CommonService from '../../services/common.services';

function TableBodyComponent() {

    const dispatch = useDispatch();
    const filtered_warehouse_data = useSelector((state) => state.warehouseSlice.filtered_warehouse_data);
    const warehouse_column_filter = useSelector(state => state.warehouseSlice.warehouse_column_filter);
    const selected_items = useSelector(state => state.warehouseSlice.selected_items);
    const user = useSelector(state => state.userSlice.user);


    const handleChange = (event) => {
        event.target.checked ?
            dispatch(selectRow(event.target.value)) :
            dispatch(unselectRow(event.target.value))
    }

    const doubleClickInform = (po_id) => {
        dispatch(rowInformToggleTrue());
        const data = { 'module': 'warehouse', 'id': po_id }
        dispatch(CommonService.getRowInform(data));
    }

    return (

        <tbody className='text-[11px] text-center ' style={{ fontFamily: 'Roboto' }}>

            {
                filtered_warehouse_data.length ? filtered_warehouse_data.map((item, index) => (
                    <TableRowComponent key={index + 1} index={index + 1} item={item}
                        handleChange={handleChange}
                        user={user}
                        warehouse_column_filter={warehouse_column_filter}
                        true_icon={true_icon}
                        false_icon={false_icon}
                        selected_items={selected_items}
                        doubleClickInform={doubleClickInform}
                    />
                )) : null
            }

        </tbody>
    )
}

export default TableBodyComponent