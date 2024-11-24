
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setOrderProvideMessageBoxFalse, setOrderSelectionProvideToggleFalse, setOrderProvideStatus, clearRow } from '../../store/stock-store';

import OrderProvideTableHeaderComponent from './OrderProvideTableHeaderComponent';
import OrderProvideTableRowComponent from './OrderProvideTableRowComponent';
import MessageBox from "../../layouts/MessageBox";
import CustomLoadingButton from '../common/CustomLoadingButton'
import DropDownComponent from "../common/DropdownComponent";
import SpinnerComponent from '../common/SpinnerComponent.jsx';

import { AnimatePresence, motion } from 'framer-motion';

import StockService from "../../services/stock-service";

import { filterGroup } from "../../store/common-store";

function OrderInformationComponent() {

  const dispatch = useDispatch();

  // const selected_items = useSelector(state => state.stockSlice.selected_items);
  const order_provide = useSelector(state => state.stockSlice.order_provide);
  const filtered_groups = useSelector(state => state.commonSlice.filtered_groups);

  const [show_message_box, setShowMessageBox] = useState(false);
  const [show_message_box_message, setShowMessageBoxMessage] = useState('');

  const [username, setUsername] = useState('');
  const [card_number, setCardNumber] = useState('');

  const [group_dropdown, setGroupDropdown] = useState(false);
  const [group, setGroup] = useState({
    group_name: '',
    group_id: '',
  });

  const listenFunc = (value, second_val) => {
    setGroup((each) => ({
      ...each,
      group_id: value,
      group_name: second_val
    }));
    setGroupDropdown(false)
  }

  const filterChange = (event, comp) => {
    if (comp === 'group_name') {
      dispatch(filterGroup(event.target.value));
    }
  }

  const submitFunc = () => {
    const sending_data = {};
    if (group.group_id === '') {
      setShowMessageBox(true);
      setShowMessageBoxMessage('Grup secilmesi gerekiyor');
      return
    }
    else if (username.length < 5) {
      setShowMessageBox(true);
      setShowMessageBoxMessage('Isim Soyisim kismi en az 5 karakter icermelidir');
      return
    }
    else if (card_number.length < 4) {
      setShowMessageBox(true);
      setShowMessageBoxMessage('Sicil numara en az 4 karakter olmalidir');
      return
    }
    sending_data.data = order_provide.order_provide_entering_data;
    sending_data.username = username;
    sending_data.card_number = card_number;
    sending_data.groupId = group.group_id;
    dispatch(StockService.provideStock(sending_data));

  }

  useEffect(() => {
    if (order_provide.order_provide_message_box) {
      setTimeout(() => {
        dispatch(setOrderProvideMessageBoxFalse())
      }, 2000);
    }
  }, [order_provide.order_provide_message_box]);

  useEffect(() => {
    if (show_message_box) {
      setTimeout(() => {
        setShowMessageBox(false);
      }, 2000)
    }
  }, [show_message_box])

  useEffect(() => {
    if (order_provide.status === 201) {
      setTimeout(() => {
        dispatch(setOrderProvideStatus());
        dispatch(setOrderSelectionProvideToggleFalse());
      }, 1999)
    }
  }, [order_provide.status]);


  // When This Componennt is open, query will send to backend for taking all data from database

  return (

    <AnimatePresence>

      <motion.div exit={{ opacity: 0, x: -1000, }} initial={{ opacity: 0, x: 1000, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
        className='flex flex-row justify-end z-20 fixed top-0 right-0 w-full h-full bg-black bg-opacity-30 '>

        {
          show_message_box && <MessageBox message={show_message_box_message} color={'bg-red-500'} />
        }

        {
          order_provide.order_provide_message_box &&
          <MessageBox message={order_provide.order_provide_error_message} color={order_provide.order_provide_color_cond} />
        }

        <div className='w-full h-full bg-white flex flex-col'>
          {/* Title and Close Section */}
          <div className='flex flex-row justify-end w-full ' >
            {/* Title Section */}
            <div className='flex flex-col justify-center p-4 w-full '>
              <span className="text-3xl text-center">
                Order Provide
              </span>
            </div>
            {/* Close Component Section */}
            <div className='flex justify-end p-5 text-end'>
              <span
                onClick={() => {
                  dispatch(setOrderSelectionProvideToggleFalse());
                  dispatch(clearRow());
                }}
                className='p-2 hover:bg-gray-100 hover:cursor-pointer rounded-lg'>
                <IoMdClose className='text-2xl' />
              </span>
            </div>

          </div>

          <div className="flex flex-row justify-between items-center">
            <div className="flex w-full my-2 ">
              {/* Name and Surname */}
              <div className="mx-3">
                <p>Isim Soyisim</p>
                <input onChange={(e) => setUsername(e.target.value)}
                  type="text" className="border bg-gray-100 p-2  rounded-md outline-none" placeholder="Username" />
              </div>
              {/* Card Number */}
              <div className="mx-3">
                <p>Sicil Numara</p>
                <input onChange={(e) => setCardNumber(e.target.value)}
                  type="text" className="border bg-gray-100 p-2  rounded-md outline-none" placeholder="Card Number" />
              </div>

              {/* Group Name */}
              <div className="mx-3">
                <p>Grup Ismi</p>
                {
                  group_dropdown
                    ?
                    <DropDownComponent
                      data={filtered_groups}
                      text_name={'group_name'}
                      input_name={'Group Name'}
                      listenFunc={listenFunc}
                      filterChange={filterChange}
                    />
                    :
                    <button onClick={() => {
                      if (group_dropdown) {
                        setGroupDropdown(false)
                      }
                      else {
                        setGroupDropdown(true)
                      }
                    }}
                      className='text-sm bg-white border border-gray-300  rounded-lg  p-2 w-36 text-ellipsis overflow-hidden text-nowrap outline-none hover:border-orange-300 '
                    >
                      {group.group_id === '' ? 'Groups' : group.group_name}
                    </button>
                }
              </div>

            </div>
            <div>

              {/* Submit Button */}
              {
                !order_provide.order_provide_pending ?

                  <button onClick={submitFunc}
                    className="bg-green-500 text-white px-5 py-3 rounded-lg duration-300 hover:bg-green-400">
                    Onayla
                  </button>
                  : <CustomLoadingButton />
              }

            </div>
          </div>

          {/* Table Section */}
          <table className='w-full'>
            <OrderProvideTableHeaderComponent />

            {
              order_provide.order_provide_data.map((item, index) => (
                <OrderProvideTableRowComponent key={index + 1} index={index + 1} item={item} />
              ))
            }
          </table>
          {
            order_provide.order_provide_data_pending && <div className="flex justify-center items-center h-96 w-full"><SpinnerComponent /></div>
          }

        </div>
      </motion.div>

    </AnimatePresence>

  )
}

export default OrderInformationComponent