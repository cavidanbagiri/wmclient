
import moment from 'moment';


import Checkbox from '@mui/material/Checkbox';
import { BsThreeDotsVertical } from "react-icons/bs";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import '../../css/dropdown.css';

import CertificateComponent from "./CertificateComponent.jsx";
import PassportComponent from "./PassportComponent.jsx";


function TableRowComponent(props) {

    const dispatch = useDispatch();

    const selected_items = useSelector(state => state.warehouseSlice.selected_items);

    const [certificate, setCertificate] = useState(false);
    const [passport, setPassport] = useState(false);

    const [cert_opposite, setCertOpposite] = useState(false);
    const [passport_opposite, setPassportOpposite] = useState(false);

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if(selected_items.length === 0){
            setChecked(false);
        }
    }, [selected_items]);

    

    function handleEscape(e) {
        if (e.key === 'Escape') {
            setCertOpposite(false);
            setPassportOpposite(false);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEscape, true);
    }, [])


    return (
        <tr 
            onDoubleClick={()=>{
                props.doubleClickInform(props.item.id)
            }}
            className={`relative border-b hover:bg-gray-100  cursor-pointer `}>
            <td className='py-1'>
                {props.index}
            </td>
            <td className='py-1'>
                <Checkbox value={props.item.id} color="warning" size="small" onChange={props.handleChange}
                          onClick={(event)=>{
                              event.target.checked ? setChecked(true) : setChecked(false);
                          }}
                          checked={checked} />
            </td>
            {props.warehouse_column_filter.date &&
                <td className={` text-center `} >
                    {moment(props.item.created_at).format("YYYY.MM.DD")}
                </td>
            }
            {props.warehouse_column_filter.company &&
                <td className={` text-start  px-1`}>
                    {props.item.company.company_name}
                </td>
            }
            {
                props.warehouse_column_filter.document &&
                <td>
                    {props.item.document === '' ? '-' : props.item.document}
                </td>
            }
            {
                props.warehouse_column_filter.material_code &&
                <td className='text-center px-1'>
                    {props.item.material_code.material_code}
                </td>
            }
            {
                props.warehouse_column_filter.material_description &&
                <td className='text-center px-1'>
                    {props.item.material_code.material_description}
                </td>
            }
            {
                props.warehouse_column_filter.material_name &&
                <td className='text-start px-1 min-w-[440px]' >
                    <span className='max_two_line_table_row' alt={props.item.material_name}>
                        {props.item.material_name}
                    </span>
                </td>
            }
            {
                props.warehouse_column_filter.type &&
                <td className='text-center px-1'>
                    {props.item.material_type.name.charAt(0).toUpperCase()+props.item.material_type.name.slice(1)}
                </td>
            }
            {
                props.warehouse_column_filter.qty &&
                <td>
                    {props.item.quantity}
                </td>
            }
            {
                props.warehouse_column_filter.leftover &&
                <td>
                    {props.item.leftover}
                </td>
            }
            {
                props.warehouse_column_filter.unit &&
                <td className=''>
                    {props.item.unit.charAt(0).toUpperCase() + props.item.unit.slice(1)}
                </td>
            }
            {(props.user.user_status === '10000' || props.user.user_status === '10001' || props.user.user_status === '10002') &&
                <>
                    {
                        props.warehouse_column_filter.price &&
                        <td>
                            {props.item.price}
                        </td>
                    }
                    {
                        props.warehouse_column_filter.currency &&
                        <td>
                            {props.item.currency.toUpperCase()}
                        </td>
                    }
                </>

            }
            {
                props.warehouse_column_filter.ordered &&
                <td className='pl-1 text-center'>
                    {props.item.ordered.first_name.charAt(0).toUpperCase() + props.item.ordered.first_name.slice(1) + ' ' + props.item.ordered.last_name.charAt(0).toUpperCase() + props.item.ordered.last_name.slice(1)}
                </td>
            }
            {
                props.warehouse_column_filter.po &&
                <td>
                    {props.item.po === '' ? '-' : props.item.po}
                </td>
            }
            {
                // Certificate
                props.warehouse_column_filter.certificate &&
                <td className=''
                    onMouseEnter={()=>{
                        setCertificate(true);
                    }}
                    onMouseLeave={()=>{
                        setCertificate(false);
                    }}
                >
                    <div className='relative flex items-center justify-between'>
                        {/* Certificate Icon */}
                        {
                            props.item.certificate ?
                                <div className='flex items-center justify-center w-full'>
                                    <img className='w-5 h-5' src={props.true_icon} alt=""/>
                                </div>
                                :
                                <div className='flex items-center justify-center w-full'>
                                    <img className='w-5 h-5' src={props.false_icon} alt=""/>
                                </div>
                        }
                        {/* Show Certificate Component */}
                        {
                            certificate && <BsThreeDotsVertical className={`text-lg`}
                            onClick={()=>{
                                setCertOpposite(!cert_opposite);
                            }}
                            />
                        }
                        {
                            cert_opposite && <CertificateComponent item={props.item} setCertOpposite={setCertOpposite}/>
                        }
                    </div>
                </td>
            }
            {
                //Passport
                props.warehouse_column_filter.passport &&
                <td className='relative'
                    onMouseEnter={()=>{
                        setPassport(true);
                    }}
                    onMouseLeave={()=>{
                        setPassport(false);
                    }}>
                    <div className='relative flex items-center justify-between'>
                        {
                            props.item.passport ?
                                <div className='flex items-center justify-center w-full'>
                                    <img className='w-5 h-5' src={props.true_icon} alt=""/>
                                </div>
                                :
                                <div className='flex items-center justify-center w-full'>
                                    <img className='w-5 h-5' src={props.false_icon} alt=""/>
                                </div>
                        }
                        {
                            passport && <BsThreeDotsVertical className={`text-lg`}
                                                             onClick={()=>{
                                                                 setPassportOpposite(!passport_opposite);
                                                             }}
                            />
                        }
                        {
                            passport_opposite &&
                                <PassportComponent item={props.item} setPassportOpposite={setPassportOpposite}/>
                        }
                    </div>
                </td>
            }
            {
                props.warehouse_column_filter.project_name &&
                <td>
                    {props.item.project.project_name}
                </td>
            }
        </tr>
    )
}

export default TableRowComponent