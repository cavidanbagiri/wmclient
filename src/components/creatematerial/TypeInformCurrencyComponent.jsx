import React from 'react'

import { CURRENCIES } from '../../constants/values';

import { useSelector } from 'react-redux';

import TypeInformComponent from './TypeInformComponent';



function TypeInformCurrencyComponent(props) {

    const type_data = useSelector((state) => state.createTableSlice.type_data);

    return (
        <div className='flex justify-between items-center my-3'>

            <TypeInformComponent type_data={type_data} />

            <div className='flex flex-col items-end'>
                <div className='px-4 text-sm flex items-center'>
                    <span style={{ fontWeight: 500 }} className='text-xs text-gray-400'>Para Birimi</span>
                    <select
                        className=' mx-2 text-xs border-2 border-orange-400 text-orange-400 font-bold outline-none rounded-md'
                        defaultValue={'rub'} name="" id="" onChange={(e) => {
                            props.setCurrency(e.target.value);
                        }}>

                        {
                            CURRENCIES.map((each, index) => (
                                <option key={index} value={each}>{each}</option>
                            ))
                        }

                    </select>
                </div>
            </div>

        </div>
    )
}

export default TypeInformCurrencyComponent