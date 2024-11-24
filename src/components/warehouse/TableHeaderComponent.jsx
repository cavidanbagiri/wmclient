
import React, { useState } from 'react';
import { TbSelect } from "react-icons/tb";
import { useSelector } from "react-redux";

function CreateTableNavbarHeaderComponent() {

  const user = useSelector(state => state.userSlice.user);
  const warehouse_column_filter = useSelector(state => state.warehouseSlice.warehouse_column_filter);

  const [material_name_size, setMaterialNameSize] = useState(256);



  return (
    <thead style={{ fontFamily: 'IBM Plex Sans' }} className="text-black bg-gray-100 border font-medium text-[11px]" >
      <tr>
        <th scope="col" className="px-2 py-3 text-center border">
          S/S
        </th>
        <th scope="col" className="flex items-center justify-center px-2 py-2 text-center border">
          <TbSelect />
        </th>

        { /* Date */
          warehouse_column_filter.date &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            <div className="">
              Tarih
            </div>
          </th>
        }

        { /* Company Name */
          warehouse_column_filter.company &&
          <th scope="col" className="px-6 py-1 text-center border font-medium min-w-40">
            <div className="">
              Firma
            </div>
          </th>
        }
        { /* Document */
          warehouse_column_filter.document &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            <div className="">
              Dokuman
            </div>
          </th>
        }
        { /* Material code */
          warehouse_column_filter.material_code &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            <div className="">
              Malzeme Kodu
            </div>
          </th>
        }
        { /* Material description */
          warehouse_column_filter.material_description &&
          <th scope="col" className="px-6 py-1 text-center border  min-w-24 font-medium ">
            <div className="">
              Malzeme Aciklamasi
            </div>
          </th>
        }
        { /* Material name */
          warehouse_column_filter.material_name &&
          <th scope="col" className={`px-6 py-1 text-center border min-w-[${material_name_size}px] font-medium`} 
            // onMouseDown={(e)=>{
            //   console.log('e target is : ', e);
            //   setMaterialNameSize(200);
            // }}
            onTouchStart={(e)=>{
              console.log('touck e target is : ', e);
              }
            }
          >
            <div className="">
              Malzeme Ismi
            </div>
          </th>
        }
        { /* Type */
          warehouse_column_filter.type &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            <div className="">
              Tipi
            </div>
          </th>
        }
        { /* Qty */
          warehouse_column_filter.qty &&
          <th scope="col" className="px-6 py-1 text-center border  font-medium ">
            Sayi
          </th>
        }
        { /* Qty */
          warehouse_column_filter.leftover &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            Kalan
          </th>
        }
        { /* Unit */
          warehouse_column_filter.unit &&
          <th scope="col" className="px-6 py-1 text-center border  font-medium ">
            Birim
          </th>
        }
        {
          (user.user_status === '10000' || user.user_status === '10001' || user.user_status === '10002') &&
          <>
            {
              warehouse_column_filter.price &&
              <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                Fiyat
              </th>
            }
            {warehouse_column_filter.currency &&
              <th scope="col" className="px-6 py-1 text-center border font-medium  w-28">
                Birim
              </th>
            }
          </>
        }
        { /* Ordered */
          warehouse_column_filter.ordered &&
          <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
            Siparisci
          </th>
        }
        { /* PO */
          warehouse_column_filter.po &&
          <th scope="col" className="px-6 py-1 text-center border font-medium">
            STF No
          </th>
        }

        { /* Certificate */
          warehouse_column_filter.certificate &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            Sertifika
          </th>
        }

        { /* Passport */
          warehouse_column_filter.passport &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            Pasaport
          </th>
        }

        { /* Project Name */
          warehouse_column_filter.project_name &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            Proje
          </th>
        }
        

      </tr>
    </thead>
  )
}

export default CreateTableNavbarHeaderComponent