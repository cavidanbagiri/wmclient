
import moment from 'moment';


import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function TableRowComponent(props) {

    const dispatch = useDispatch();

    const selected_items = useSelector(state => state.areaSlice.selected_items);

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if(selected_items.length === 0){
            setChecked(false);
        }
    }, [selected_items]);

    return (
        <tr
            onDoubleClick={() => {
                props.doubleClickInform(props.item.id)
            }}
            className={`relative border-b hover:bg-gray-100 cursor-pointer `}>
            <td className='py-1'>
                {props.index}
            </td>
            <td className='py-1'>
                <Checkbox value={props.item.id} color="warning" size="small" onChange={props.handleChange}
                    onClick={(event) => {
                        console.log('props item id', props.item);
                        event.target.checked ? setChecked(true) : setChecked(false);
                    }}
                    checked={checked} />
            </td>
            {props.area_column_filter.deliver_date &&
                <td className={` text-center `} >
                    {moment(props.item.deliver_date).format("YYYY.MM.DD")}
                </td>
            }
            {
                props.area_column_filter.material_code &&
                <td className='text-center px-1'>
                    {props.item.material_code}
                </td>
            }
            {
                props.area_column_filter.material_description &&
                <td className='text-center px-1'>
                    {props.item.material_description}
                </td>
            }
            {
                props.area_column_filter.material_name &&
                <td className='text-start px-1 '>
                    <span className='max_two_line_table_row'>
                        {props.item.material_name }
                    </span>
                </td>
            }
            {
                props.area_column_filter.type &&
                <td className='text-center px-1'>
                    {props.item.type}
                </td>
            }
            {
                props.area_column_filter.qty &&
                <td>
                    {props.item.qty}
                </td>
            }

            {
                props.area_column_filter.unit &&
                <td className=''>
                    {props.item.unit.charAt(0).toUpperCase() + props.item.unit.slice(1)}
                </td>
            }

            {
                props.area_column_filter.serial_number &&
                <td>
                    {props.item.serial_number.trim().length === 0 ? '-' : props.item.serial_number.trim()}
                </td>
            }

            {
                props.area_column_filter.material_id &&
                <td>
                    {props.item.material_id.trim().length === 0 ? '-' : props.item.material_id.trim()}
                </td>
            }

            {
                props.area_column_filter.card_number &&
                <td className='pl-1 text-center'>
                    {props.item.card_number}
                </td>
            }

            {
                props.area_column_filter.username &&
                <td className='pl-1 text-center'>
                    {props.item.username.charAt(0).toUpperCase() + props.item.username.slice(1)}
                </td>
            }

            {
                props.area_column_filter.group_name &&
                <td className='pl-1 text-center'>
                    {props.item.group_name.charAt(0).toUpperCase() + props.item.group_name.slice(1)}
                </td>
            }

            {
                props.area_column_filter.provideType &&
                <td className='pl-1 text-center'>
                    {props.item.providerType.charAt(0).toUpperCase() + props.item.providerType.slice(1)}
                </td>
            }

            {
                props.area_column_filter.po &&
                <td className='pl-1 text-center'>
                    {props.item.po}
                </td>
            }

{
                props.area_column_filter.project_name &&
                <td className='pl-1 text-center'>
                    {props.item.abbrevation_name}
                </td>
            }

        </tr>
    )
}

export default TableRowComponent