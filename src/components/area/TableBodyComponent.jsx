
import { useSelector, useDispatch } from 'react-redux';

import TableRowComponent from './TableRowComponent'

import { selectRow, unselectRow } from '../../store/area-store';

function TableBodyComponent() {

    const dispatch = useDispatch();
    const filtered_area_data = useSelector((state) => state.areaSlice.filtered_area_data);
    const area_column_filter = useSelector(state => state.areaSlice.area_column_filter);
    const user_status = useSelector(state => state.userSlice.user_status);


    const handleChange = (event) => {
        
        console.log('filtered area data : ', filtered_area_data);

        event.target.checked ?
            dispatch(selectRow(event.target.value)) :
            dispatch(unselectRow(event.target.value))
    }

    return (

        <tbody className='text-[11px] text-center' style={{ fontFamily: 'Roboto' }}>

            {
                filtered_area_data.map((item, index) => (

                    
                    item?.stock?.warehouse_materials  ? 
                    

                    <TableRowComponent key={index + 1} index={index + 1} item={item}
                        user_status={user_status}
                        area_column_filter={area_column_filter}
                        handleChange={handleChange}
                    />
                    : ''
                ))
            }

        </tbody>
    )
}

export default TableBodyComponent