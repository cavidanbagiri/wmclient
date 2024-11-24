import React from 'react'

import { Link } from 'react-router-dom';

import inventory_icon from '../../assets/inventory_icon.png';
import create_icon from '../../assets/create_icon.png';
import stock_icon from '../../assets/stock_icon.png';
import area from '../../assets/area.webp';
import profile from '../../assets/profile.png';

function MenuSideComponent() {
  return (
    <div className='flex flex-row w-full p-3 mt-4'>

      <Link to="/create" className='flex flex-col justify-around bg-white shadow-md items-center p-3 border rounded-xl w-1/4 mx-4 cursor-pointer hover:shadow-xl duration-300'>
        <span className='text-black text-[26px] my-1' style={{ fontWeight: 600 }}>
          Malzeme Girisi
        </span>
        <img src={create_icon} className='w-20 h-20 p-3' alt="" />
        <hr className='my-2 text-black w-full' />
        <span className='w-full text-end text-[13px] text-gray-400' style={{ fontWeight: 400 }}>
          Malzeme eklemek sayfasina git 
        </span>
      </Link>


      <Link to="/warehouse" style={{ fontWeight: 600, }} className='flex flex-col justify-around bg-white shadow-md items-center p-3 border rounded-xl w-1/4 mx-4 cursor-pointer hover:shadow-xl duration-300'>
        <span className='text-black text-[26px] my-1'>
          Ambar Sayfasi
        </span>
        <img src={inventory_icon} className='w-20 h-20 p-2' alt="" />
        <hr className='my-2 text-black w-full' />
        <span className='w-full text-end text-[13px] text-gray-400' style={{ fontWeight: 400 }}>
          Mevcut kalem sayisi: 145
        </span>
      </Link>

      <Link to="/stock" style={{ fontWeight: 600, }} className='flex flex-col justify-around bg-white shadow-md items-center p-3 border rounded-xl w-1/4 mx-4 cursor-pointer hover:shadow-xl duration-300'>
        <span className='text-black text-[26px]  my-1'>
          Stok Sayfasi
        </span>
        <img src={stock_icon} className='w-20 h-20 p-2' alt="" />
        <hr className='my-2 text-black w-full' />
        <span className='w-full text-end text-[13px] text-gray-400' style={{ fontWeight: 400 }}>
          Mevcut kalem sayisi: 145
        </span>
      </Link>

      <Link to="/area" style={{ fontWeight: 600, }} className='flex flex-col justify-around bg-white shadow-md items-center p-3 border rounded-xl w-1/4 mx-4 cursor-pointer hover:shadow-xl duration-300'>
        <span className='text-black text-[26px]  my-1'>
          Sahaya Cikilan
        </span>
        <img src={area} className='w-20 h-20 p-1' alt="" />
        <hr className='my-2 text-black w-full' />
        <span className='w-full text-end text-[13px] text-gray-400' style={{ fontWeight: 400 }}>
          Mevcut kalem sayisi: 145
        </span>
      </Link>

      <Link to="/profile" style={{ fontWeight: 600, }} className='flex flex-col justify-around bg-white shadow-md items-center p-3 border rounded-xl w-1/4 mx-4 cursor-pointer hover:shadow-xl duration-300'>
        <span className='text-black text-[26px]  my-1'>
          Kullanici Sayfasi
        </span>
        <img src={profile} className='w-20 h-20 p-2' alt="" />
        <hr className='my-2 text-black w-full' />
        <span className='w-full text-end text-[13px] text-gray-400 my-1' style={{ fontWeight: 400 }}>
          Foto guncellemek icin sayfaya git
        </span>
      </Link>


    </div>
  )
}

export default MenuSideComponent