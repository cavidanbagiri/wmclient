import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux';

import AdminModal from '../../layouts/AdminModal';
import ButtonComponent from './ButtonComponent';
import MessageBox from '../../layouts/MessageBox';

import { USER_MESSAGES } from '../../constants/values';


// import { setShowErrorTrue, setShowErrorFalse } from '../store/message_box-store';

import { setShowErrorFalse, setShowErrorTrue } from '../../store/message_box-store';
import { addTableCheck, delRow, setShowMessageFalse } from '../../store/create_table-store';

function ButtonInformationComponent(props) {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.userSlice.user);

    const table = useSelector((state) => state.createTableSlice.table);


    const [add_company, setAddCompany] = useState(false);
    const [add_ordered, setAddOrdered] = useState(false);
    const [add_group, setAddGroup] = useState(false);
    const [add_material_code, setAddMaterialCode] = useState(false);


    function addCompany() {
        if (user.is_admin || user.status_code === '1000' || user.status_code === '10000' || user.status_code === '10001')
            setAddCompany(true);
        else {
            props.setMessage(USER_MESSAGES.AUTHORIZATION_ERROR);
            dispatch(setShowErrorTrue());
            setTimeout(() => {
                dispatch(setShowErrorFalse());
            }, 2000)
        }
    }
    function addOrdered() {
        if (user.is_admin || user.status_code === '1000' || user.status_code === '10000' || user.status_code === '10001')
            setAddOrdered(true);
        else {
            props.setMessage(USER_MESSAGES.AUTHORIZATION_ERROR);
            dispatch(setShowErrorTrue());
            setTimeout(() => {
                dispatch(setShowErrorFalse());
            }, 2000)
        }
    }
    function addGroup() {
        if (user.is_admin || user.status_code === '1000' || user.status_code === '10000' || user.status_code === '10001')
            setAddGroup(true);
        else {
            props.setMessage(USER_MESSAGES.AUTHORIZATION_ERROR);
            dispatch(setShowErrorTrue());
            setTimeout(() => {
                dispatch(setShowErrorFalse());
            }, 2000)
        }
    }
    function addMaterialCode() {
        if (user.is_admin || user.status_code === '1000' || user.status_code === '10000' || user.status_code === '10001')
            setAddMaterialCode(true);
        else {
            props.setMessage(USER_MESSAGES.AUTHORIZATION_ERROR);
            dispatch(setShowErrorTrue());
            setTimeout(() => {
                dispatch(setShowErrorFalse());
            }, 2000)
        }
    }
    function delRows() {
        if (table.length > 1) {
            dispatch(delRow());
        }
        else {
            props.setMessage('En az bir satir olmalidir');
            dispatch(setShowErrorTrue());
            setTimeout(() => {
                dispatch(setShowErrorFalse());
            }, 2000)
        }
    }
    function addRows() {
         dispatch(addTableCheck());
    }
    function closeModal() {
        if (add_company === true) { setAddCompany(false) }
        if (add_ordered === true) { setAddOrdered(false) }
        if (add_group === true) { setAddGroup(false) }
        if (add_material_code === true) { setAddMaterialCode(false) }
    }

    return (

        <>

            { // Checked
                add_company && <AdminModal title={'Firma Ekle'} closeModal={closeModal} show_component={'company'} />
            }

            { // Checked
                add_ordered && <AdminModal title={'Siparisci Ekle'} closeModal={closeModal} show_component={'ordered'} />
            }

            { // Checked
                add_group && <AdminModal title={'Grup Ekle'} closeModal={closeModal} show_component={'group'} />
            }

            { // Checked
                add_material_code && <AdminModal title={'Malzeme Kodu Ekle'} closeModal={closeModal} show_component={'material_code'} />
            }

            <div className='flex flex-row justify-between items-center px-4'>
                <span style={{ fontWeight: 700 }} className='py-2 px-1 rounded-lg text-[32px] text-start my-2'>Tablo Kontrol</span>
                <div className='text-xs' style={{ fontWeight: 500 }}>

                    <ButtonComponent executeFunc={addCompany} title='Yeni Firma Ekle' />
                    <ButtonComponent executeFunc={addOrdered} title='Yeni Siparisci Ekle' />
                    <ButtonComponent executeFunc={addGroup} title='Yeni Group Ekle' />
                    <ButtonComponent executeFunc={addMaterialCode} title='Malzeme Kodu Ekle' />
                    <ButtonComponent executeFunc={addRows} title='Yeni Satir Ekle' />
                    <ButtonComponent executeFunc={delRows} title='Satiri Sil' />

                </div>
            </div>

        </>


    )
}

export default ButtonInformationComponent