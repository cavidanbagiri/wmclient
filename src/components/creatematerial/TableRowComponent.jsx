
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import MaterialCodeDropdownComponent from '../common/MaterialCodeDropdownComponent'

import { addRow, updateRow } from '../../store/create_table-store';

import AdminService from '../../services/admin-service';

import {UNIT_VALUES} from '../../constants/values';

function TableRowComponent(props) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.userSlice.user);
    const material_types = useSelector(state => state.commonSlice.material_types);
    const [show_material_code, setShowMaterialCode] = useState(false);

    const [row, setRow] = useState({
        ss: props.index,
        date: '13-05-2024',
        //project_id: user.project_id,
        //company_name: '',
        document: '',
        material_code_id: '',
        material_code: '',
        description: '',
        material_name: '',
        material_type_id: 1,
        quantity: 0,
        unit: 'Pcs',
        price: 0,
        total: 0,
        currency: 'Rub',
        //orderedId: '',
        //ordered_name: '',
        po: '',
        certificate: false,
        passport: false
    });

    const filterChange = (event) => {
        dispatch(AdminService.filterMaterialCodes(event.target.value));
    }

    const listenFunc = (id, code, name) => {
        setRow((each) => ({
            ...each,
            description: name,
        }))
        setRow((each) => ({
            ...each,
            material_code: code,
        }))
        setRow((each) => ({
            ...each,
            material_code_id: id,
        }))
        dispatch(updateRow({ ss: row.ss, name: 'description', value: name }))
        dispatch(updateRow({ ss: row.ss, name: 'material_code', value: code }))
        dispatch(updateRow({ ss: row.ss, name: 'material_code_id', value: id }))
        setShowMaterialCode(false);
    }

    useEffect(() => {
        dispatch(addRow({ row: row }));
    })

    return (
        <tr className=' relative border-b '>
            <td className='py-4'>
                {row.ss}
            </td>
            <td className='py-1 relative'>
                {
                    row.material_code === '' ?
                        <button onClick={() => setShowMaterialCode(!show_material_code)}
                            className='bg-gray-100 p-3 rounded-lg hover:cursor-pointer hover:bg-gray-200'>
                            Malzeme Kodu Sec
                        </button>
                        :
                        row.material_code
                }
                {
                    show_material_code &&
                    <MaterialCodeDropdownComponent data={props.data} filterChange={filterChange} listenFunc={listenFunc}
                    />
                }
            </td>
            <td>
                {
                    row.description === '' 
                    ? 
                    <span>Not Selected</span>
                    :
                    row.description
                }
            </td>
            <td>
                <input className="text-xs outline-none border-none w-full h-full p-2 border-transparent focus:border-transparent focus:ring-0" type="text" placeholder="Malzeme Ismi"
                    onChange={
                        (event) => {
                            setRow((each) => ({
                                ...each,
                                material_name: event.target.value
                            }))
                            dispatch(updateRow({ ss: row.ss, name: 'material_name', value: event.target.value }))
                        }} />
            </td>
            <td>
                <select defaultValue={'Consumable'}
                    className='text-xs p-2 outline-none text-gray-500 border-none hover:cursor-pointer border-transparent focus:border-transparent focus:ring-0'
                    onChange={(event) => {
                        setRow((each) => ({
                            ...each,
                            material_type_id: event.target.value
                        }))
                        dispatch(updateRow({ ss: row.ss, name: 'material_type_id', value: event.target.value }))
                    }}>
                        {
                            material_types.map((each, index) => {
                                return (
                                    <option key={index} value={each.id}>{each.name}</option>
                                )
                            })
                        }
                    {/* <option value="Consumable">Sarf</option>
                    <option value="Project">Demirbas</option>
                    <option value="Fixture">It Malzeme</option>
                    <option value="Safety">Idari Isler</option> */}
                </select>
            </td>
            <td>
                <input className="text-xs outline-none w-full h-full p-2 text-center border-none border-transparent focus:border-transparent focus:ring-0" type="number" placeholder="Miktar"
                    onChange={
                        (event) => {
                            setRow((each) => ({
                                ...each,
                                quantity: event.target.value,
                                total: row.price * event.target.value
                            }))
                            dispatch(updateRow({ ss: row.ss, name: 'quantity', value: event.target.value }))
                        }} />
            </td>
            <td className=''>
                <select value={row.unit} className='text-xs p-2 outline-none  border-none border-transparent focus:border-transparent focus:ring-0' onChange={(event) => {
                    setRow((each) => ({
                        ...each,
                        unit: event.target.value
                    }))
                    dispatch(updateRow({ ss: row.ss, name: 'unit', value: event.target.value }))
                }}>
                    {UNIT_VALUES.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                </select>
            </td>
            <td>
                <input className="text-xs outline-none w-full h-full p-2 text-center  border-none border-transparent focus:border-transparent focus:ring-0" type="number" placeholder="Fiyat"
                    onChange={
                        (event) => {
                            setRow((each) => ({
                                ...each,
                                price: event.target.value,
                                total: row.quantity * event.target.value
                            }))
                            dispatch(updateRow({ ss: row.ss, name: 'price', value: event.target.value }))
                        }} />
            </td>

            <td>
                <span>{row.total.toFixed(2)}</span>
            </td>

            <td>
                <input className="text-xs outline-none w-full h-full p-2 text-center border-none border-transparent focus:border-transparent focus:ring-0" type="text" placeholder="STF Numarasi"
                    onChange={
                        (event) => {
                            setRow((each) => ({
                                ...each,
                                po: event.target.value
                            }))
                            dispatch(updateRow({ ss: row.ss, name: 'po', value: event.target.value }))
                        }} />
            </td>

            <td>
                <input value={row.certificate} type="checkbox" className='rounded-sm'
                onChange={(event) => {
                    setRow((each) => ({
                        ...each,
                        certificate: event.target.checked
                    }))
                    dispatch(updateRow({ ss: row.ss, name: 'certificate', value: event.target.checked }))
                }} />
            </td>

            <td>
                <input value={row.passport} type="checkbox" className=' rounded-sm '
                onChange={(event) => {
                    setRow((each) => ({
                        ...each,
                        passport: event.target.checked
                    }))
                    dispatch(updateRow({ ss: row.ss, name: 'passport', value: event.target.checked }))
                }} />
            </td>

        </tr>
    )
}

export default TableRowComponent