
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRow, addRow, clearRow } from "../../store/stock-store";

function OrderProvideTableHeaderComponent(props) {

    const dispatch = useDispatch();

    const order_provide = useSelector(state => state.stockSlice.order_provide);

    const [row, setRow] = useState({
        id: props.item.id,
        ss: props.index,
        amount: 0,
        serial_number: props.item.material_id,
        material_id: props.item.serial_number,
        providerType: 'Consumption'
    });

    
    useEffect(() => {
        dispatch(addRow({row: row}))
    }, [row.amount])

    return (
        <thead style={{ fontFamily: 'IBM Plex Sans' }} className="text-black bg-white border font-medium text-sm" >
            <tr>
                <th scope="col" className="px-2 py-3 text-center border">
                    {props.index}
                </th>

                { /* Material name */
                    <th scope="col" className="px-6 py-1 text-center border  min-w-60 font-medium ">
                        <div className="">
                            {props.item.WarehouseModel?.material_name}
                        </div>
                    </th>
                }
                { /* Type */
                    <th scope="col" className="px-6 py-1 text-center border font-medium ">
                        <div className="">
                            {props.item.WarehouseModel?.type}
                        </div>
                    </th>
                }

                { /* Stock */
                    <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                        {props.item.stock}
                    </th>
                }
                { /* Unit */
                    <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                        {props.item.WarehouseModel?.unit}
                    </th>
                }
                { /* Serial No */
                    <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                        {props.item.serial_number}
                    </th>
                }
                { /* Material ID */
                    <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                        {props.item.material_id}
                    </th>
                }


                { /* Amount */
                    <th scope="col" className="p-1 text-center border font-medium min-w-32">
                        <input onChange={
                            (event) => {
                                if (event.target.value > props.item.stock || event.target.value < 0) {
                                    showMessageBoxMessageHandle('provide', 'Lutfen Gecerli Bir Miktar Giriniz');
                                }                                
                                else {
                                    setRow((each) => ({
                                        ...each,
                                        amount: event.target.value
                                    }))
                                    dispatch(updateRow({ id: row.id, ss: row.ss, name: 'amount', value: event.target.value }));
                                }
                            }}
                            type="number" value={row.amount} className="border bg-gray-100 p-2 w-full rounded-md outline-none" placeholder="Amount" />
                    </th>
                }

                { /* Serial number */
                    <th scope="col" className="p-1 text-center border font-medium min-w-32">
                        <input onChange={(event) => {
                            setRow((each) => ({
                                ...each,
                                serial_number: event.target.value
                            }))
                            dispatch(updateRow({ id:row.id, ss: row.ss, name: 'serial_number', value: event.target.value }));
                        }}
                            type="text" value={row.serial_number} className="border bg-gray-100 p-2 w-full rounded-md outline-none" placeholder="Serial number" />
                    </th>
                }

                { /* Material id */
                    <th scope="col" className="p-1 text-center border font-medium min-w-32">
                        <input onChange={(event) => {
                            setRow((each) => ({
                                ...each,
                                material_id: event.target.value
                            }))
                            dispatch(updateRow({id:row.id, ss: row.ss, name: 'material_id', value: event.target.value }));
                        }}
                            type="text" value={row.material_id} className="border bg-gray-100 p-2 w-full rounded-md outline-none" placeholder="Material ID" />
                    </th>
                }

                { /* proivder type */
                    <th scope="col" className="p-1 text-center border font-medium min-w-32">

                        <select onChange={(event) => {
                            setRow((each) => ({
                                ...each,
                                providerType: event.target.value
                            }))
                            dispatch(updateRow({ id: row.id, ss: row.ss, name: 'providerType', value: event.target.value }));
                        }}
                            type="text" value={row.providerType} className="border bg-gray-100 p-2 w-full rounded-md outline-none">
                            <option value="Consumption">Consumption</option>
                            <option value="Debit">Debit</option>
                        </select>

                    </th>
                  
                }

            </tr>
        </thead>
    )
}

export default OrderProvideTableHeaderComponent
