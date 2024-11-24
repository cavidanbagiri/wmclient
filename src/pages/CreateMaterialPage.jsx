
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { setShowMessageFalse } from '../store/create_table-store';
import { setShowErrorTrue, setShowErrorFalse } from '../store/message_box-store';


import CreateTableService from '../services/create_table-service';
import CommonService from '../services/common.services';

import TableHeaderComponent from '../components/creatematerial/TableHeaderComponent'
import TableBodyComponent from '../components/creatematerial/TableBodyComponent'
import DropDownComponent from '../components/common/DropdownComponent';
import MessageBox from '../layouts/MessageBox.jsx';


import { USER_MESSAGES } from '../constants/values';

import TableInformationComponent from '../components/creatematerial/TableInformationComponent.jsx';
import PageTitleComponent from '../components/creatematerial/PageTitleComponent.jsx';
import ButtonInformationComponent from '../components/creatematerial/ButtonInformationComponent.jsx';
import TypeInformCurrencyComponent from '../components/creatematerial/TypeInformCurrencyComponent.jsx';
import RefreshOrderedCompaniesComponent from '../components/creatematerial/RefreshOrderedCompaniesComponent.jsx';

function CreateMaterialPage() {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.userSlice.user);

  const companies = useSelector((state) => state.commonSlice.companies);
  const ordereds = useSelector((state) => state.commonSlice.ordereds);
  const table = useSelector((state) => state.createTableSlice.table);

  const show_message_box = useSelector((state) => state.messageBoxSlice.toggle_message);
  const show_message = useSelector((state) => state.createTableSlice.show_message);
  const show_message_text = useSelector((state) => state.createTableSlice.show_message_text);
  const show_message_color = useSelector((state) => state.createTableSlice.show_message_color);


  const [total_price, setTotalPrice] = useState(0.00);

  const [message, setMessage] = useState('');

  const [isCompanyDropDown, setIsCompanyDropDown] = useState(false);
  const [isUserDropDown, setIsUserDropDown] = useState(false);
  const [doc_num, setDocNum] = useState('');
  const [currency, setCurrency] = useState('rub');


  const [company, setCompany] = useState({
    company_id: '',
    company_name: ''
  })

  const [ordered, setOrdered] = useState({
    ordered_id: '',
    ordered_name: '',
  })

  function postFunc() {
    if (user.is_admin || user.status_code === '1000' || user.status_code === '10000' || user.status_code === '10001') {
      let cond = true;
      if (company.company_name === '') {
        setMessage(`Firma ismi secilmesi zorunludur`);
        cond = false;
      }
      else if (ordered.ordered_name === '') {
        setMessage(`Siparisci ismi secilmesi zorunludur`);
        cond = false;
      }
      if (table.length === 0) {
        setMessage('Setir sayisi bos olamaz');
        cond = false;
      }
      else {
        for (let i of table) {
          if (i.material_name === "") {
            setMessage(`In ${i.ss} Setir, Malzeme ismi girilmesi zorunludur`);
            cond = false;
            break;
          }
          else if (i.qty <= 0) {
            setMessage(`In ${i.ss} Setir, Malzeme miktari 0 veya negatif olamaz`);
            cond = false;
            break;
          }
          else if (i.material_code_id === '') {
            setMessage(`In ${i.ss} Setir, Malzeme kodu secilmesi zorunludur`);
            cond = false;
            break;
          }
        }
      }
      if (cond) {
        // const default_data = { company_id: company.company_id, ordered_id: ordered.ordered_id, document: doc_num, currency: currency };
        // let common_data = {
        //   default_data: default_data,
        //   table_data: table
        // }
        let sending_data = table.map(item => ({
          ...item,
          company_id: Number(company.company_id),
          ordered_id: Number(ordered.ordered_id),
          document: doc_num,
          currency: currency
        }));

        console.log('object', sending_data);
        dispatch(CreateTableService.receiveWarehouse(sending_data));

      }
      else {
        dispatch(setShowErrorTrue());
        setTimeout(() => {
          dispatch(setShowErrorFalse());
        }, 2000)
      }

    }
    else {
      setMessage(USER_MESSAGES.AUTHORIZATION_ERROR);
      dispatch(setShowErrorTrue());
      setTimeout(() => {
        dispatch(setShowErrorFalse());
      }, 2000)
    }


  }

  const listenCompany = (val, second_val) => {
    setCompany((each) => ({
      ...each,
      company_id: val,
      company_name: second_val
    }));
    setIsCompanyDropDown(!isCompanyDropDown)
  }

  const listenUser = (val, second_val) => {
    setOrdered((each) => ({
      ...each,
      ordered_id: val,
      ordered_name: second_val
    }))
    setIsUserDropDown(!isUserDropDown);
  }

  const filterChange = (event, comp) => {
    if (comp === 'username') {
      dispatch(CommonService.filterOrdereds(event.target.value));
    }
    else if (comp === 'company_name') {
      dispatch(CommonService.filterCompanies(event.target.value));
    }
  }

  function handleEscape(e) {
    if (e.key === 'Escape') {
      setIsCompanyDropDown(false);
      setIsUserDropDown(false)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(setShowMessageFalse());
    }, 2000)
  }, [show_message])

  useEffect(() => {
    let price = 0;
    for (let i of table) {
      price += Number(i.price) * Number(i.quantity);
    }
    setTotalPrice(price);
  },[table]);

  useEffect(() => { document.addEventListener('keydown', handleEscape, true); }, [])

  return (

    <div style={{ fontFamily: 'IBM Plex Sans' }} className='flex flex-col '>

      {
        show_message_box && <MessageBox message={message} color={'bg-red-500'} />
      }

      {
        show_message && <MessageBox message={show_message_text} color={show_message_color} />
      }

      <div style={{ fontFamily: 'IBM Plex Sans' }} className='flex flex-col justify-between'>


        <PageTitleComponent postFunc={postFunc} />

        <ButtonInformationComponent setMessage={setMessage} />

        <TypeInformCurrencyComponent setCurrency={setCurrency} />


        {/* Table Information */}
        <TableInformationComponent table={table} total_price={total_price} />

        {/* Default Table Information */}
        <div className='flex items-center justify-between mb-3 px-5'>

          {/* Doc, Company, Ordered Dropdown */}
          <div className='flex items-center'>

            {/* Doc Number Side */}
            <div className='mr-6'>
              <p className='text-xs text-gray-400 pl-1'>Dokuman Numarasi</p>
              <input className=' text-xs bg-white border border-gray-300 rounded-lg w-36 p-2 outline-none text-center' type="text" placeholder='Dokuman Numarasi' onChange={(e) => {
                setDocNum(e.target.value);
              }} />
            </div>

            {/* Company Side */}
            <div className='relative mr-6'>
              <p className='text-xs text-gray-400 pl-1'>Firma</p>
              <button className='text-xs bg-white border border-gray-300  rounded-lg  p-2 w-48 text-ellipsis overflow-hidden text-nowrap outline-none' onClick={() => {
                setIsCompanyDropDown(!isCompanyDropDown)
              }}>
                {company.company_id === '' ? 'Firma Sec' : company.company_name}
              </button>
              {
                isCompanyDropDown && <DropDownComponent
                  data={companies}
                  text_name={'company_name'}
                  input_name={'Firma Ismi'}
                  listenFunc={listenCompany}
                  filterChange={filterChange}
                />
              }
            </div>

            {/* Ordered Side */}
            <div className='relative'>
              <p className='text-xs text-gray-400 pl-1'>Siparisci</p>
              <button className='text-xs bg-white border border-gray-300 rounded-lg p-2 w-48 text-ellipsis overflow-hidden text-nowrap outline-none hover:border-orange-300 ' onClick={() => {
                setIsUserDropDown(!isUserDropDown)
              }}>
                {ordered.ordered_id === '' ? 'Siparisci Sec' : ordered.ordered_name}
              </button>
              {
                isUserDropDown && <DropDownComponent
                  data={ordereds}
                  text_name={'username'}
                  input_name={'Siparisci Ismi'}
                  listenFunc={listenUser}
                  filterChange={filterChange}
                />
              }
            </div>

          </div>

          <RefreshOrderedCompaniesComponent />


        </div>


      </div>

      <table>
        <TableHeaderComponent />
        <TableBodyComponent />
      </table>

    </div>
  )
}

export default CreateMaterialPage
