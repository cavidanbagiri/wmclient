import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {
    setAddStockColorCond,
    setAddStockMessageBoxMessage,
    setAddStockMessageBoxTrue,
    updatefetchSelectedItems
} from "../../store/warehouse-store.js";



function AddStockEachComponent(props) {

    const dispatch = useDispatch();

    const [amount, setAmount] = useState(-1);
    const [serial_number, setSerialNumber] = useState('');
    const [material_id, setMaterialId] = useState('');

    useEffect(()=>{
        if(amount < 0){
            setAmount(props.item.leftover)
        }
        else{
            let data = {
                id: props.item.id,
                qty: props.item.leftover,
                entered_amount: amount,
                serial_number: serial_number,
                material_id: material_id,
            }
            dispatch(updatefetchSelectedItems(data))
        }
    },)

    return (

        <div className='flex flex-col border p-2 my-2'>
            <div className='flex mt-2'>
                <span className='w-1/3'>Dokuman Numarasi </span>
                <div className='relative w-full'>
                    <span>{props.item.document}</span>
                </div>
            </div>
            <div className='flex mt-2'>
                <span className='w-1/3'>Malzeme Ismi </span>
                <div className='relative w-full'>
                    <span>{props.item.material_name}</span>
                </div>
            </div>
            <div className='flex mt-2'>
                <span className='w-1/3'>Sayisi </span>
                <div className='relative w-full font-bold'>
                    <span>{props.item.quantity}</span>
                </div>
            </div>
            <div className='flex mt-2'>
                <span className='w-1/3'>Kalan</span>
                <div className='relative w-full font-bold'>
                    <span>{props.item.leftover}</span>
                </div>
            </div>
            <div className='flex mt-2'>
                <span className='w-1/3'>Eklemek Istenen Sayi </span>
                <div className='relative w-full'>
                    <input className='border p-2 rounded-lg'
                           type="number" value={amount} placeholder="Stock Amount" onChange={(e) => {
                        if (e.target.value > props.item.leftover || e.target.value < 0) {
                            dispatch(setAddStockMessageBoxTrue());
                            dispatch(setAddStockMessageBoxMessage('Girilen miktar, mevcut kalan miktar ile esit ya da kucuk olmali!'));
                            dispatch(setAddStockColorCond({color:'bg-red-500'}));
                        } else {
                            setAmount(e.target.value);
                        }
                    }}/>
                </div>
            </div>
            <div className='flex mt-2'>
                <span className='w-1/3'>Seri Numarasi</span>
                <div className='relative w-full'>
                    <input className='border p-2 rounded-lg'
                           type="text" value={serial_number} placeholder="Seri Numarasi" onChange={(e) => {
                        setSerialNumber(e.target.value)
                    }}/>
                </div>
            </div>
            <div className='flex mt-2'>
                <span className='w-1/3'>Malzeme ID Kodu</span>
                <div className='relative w-full'>
                    <input className='border p-2 rounded-lg'
                           type="text" value={material_id} placeholder="Malzeme ID Kodu" onChange={(e) => {
                        setMaterialId(e.target.value)
                    }}/>
                </div>
            </div>
        </div>

    )
}

export default AddStockEachComponent