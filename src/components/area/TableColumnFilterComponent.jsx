
import { useSelector, useDispatch } from 'react-redux';

import Switch from '@mui/material/Switch';
import {setAreaColumnFilter} from "../../store/area-store.js";


function TableColumnFilterComponent() {

    const dispatch = useDispatch();

    const area_column_filter = useSelector(state => state.areaSlice.area_column_filter);

    return (
       <div
           className='flex flex-col absolute top-10 h-96 w-96 z-10 rounded-lg shadow-2xl bg-white p-2 border overflow-y-scroll '>
            <span style={{fontFamily: 'Saira Condensed'}} className=' px-2 w-full my-1 text-2xl'>Filtrlenmis Sutunlar</span>
           <ul style={{fontFamily: 'IBM Plex Sans'}}
               className='text-black font-medium'>
               {
                   Object.entries(area_column_filter).map(([key, value], index) => (
                        <li className='hover:cursor-pointer my-1 text-[15px]' key={index}>
                            <Switch color='warning'
                                checked={value}
                                onChange={(event)=>{
                                    dispatch(setAreaColumnFilter({key: key, value: event.target.checked}));
                                }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </li>
                   ))
               }
           </ul>

       </div>
    )
}

export default TableColumnFilterComponent