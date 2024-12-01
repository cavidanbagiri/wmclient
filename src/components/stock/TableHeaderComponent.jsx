
import { TbSelect } from "react-icons/tb";
import { useSelector } from "react-redux";

function CreateTableNavbarHeaderComponent() {

  const user = useSelector(state => state.userSlice.user);
  const stock_column_filter = useSelector(state => state.stockSlice.stock_column_filter);

  return (
    <thead style={{ fontFamily: 'IBM Plex Sans' }} className="text-black bg-gray-100 border font-medium text-xs" >
      <tr>
        <th scope="col" className="px-2 py-3 text-center border">
          S/S
        </th>
        <th scope="col" className="flex items-center justify-center px-2 py-2 text-center border">
          <TbSelect />
        </th>

        { /* Date */
          stock_column_filter.date &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            <div className="">
              Tarih
            </div>
          </th>
        }

        { /* Company Name */
          stock_column_filter.company &&
          <th scope="col" className="px-6 py-1 text-center border font-medium min-w-40">
            <div className="">
              Firma
            </div>
          </th>
        }
        { /* Document */
          stock_column_filter.document &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            <div className="">
              Dokuman No
            </div>
          </th>
        }
        { /* Material code */
          stock_column_filter.material_code &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            <div className="">
              Material Kodu
            </div>
          </th>
        }
        { /* Material description */
          stock_column_filter.material_description &&
          <th scope="col" className="px-6 py-1 text-center border  min-w-24 font-medium ">
            <div className="">
              Aciklama
            </div>
          </th>
        }
        { /* Material name */
          stock_column_filter.material_name &&
          <th scope="col" className="px-6 py-1 text-center border  min-w-60 font-medium ">
            <div className="">
              Malzeme Ismi
            </div>
          </th>
        }
        { /* Type */
          stock_column_filter.type &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            <div className="">
              Tipi
            </div>
          </th>
        }
        { /* Qty */
          // stock_column_filter.qty &&
          // <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
          //   Sayi
          // </th>
        }
        { /* Qty */
          stock_column_filter.stock &&
          <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
            Stok
          </th>
        }
        { /* Unit */
          stock_column_filter.unit &&
          <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
            Birim
          </th>
        }
        {
          (user.user_status === '10000' || user.user_status === '10001' || user.user_status === '10002') &&
          <>
            {
              stock_column_filter.price &&
              <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                Fiyat
              </th>
            }
            {stock_column_filter.currency &&
              <th scope="col" className="px-6 py-1 text-center border font-medium  w-28">
                Para Birimi
              </th>
            }
          </>
        }
        { /* Ordered */
          stock_column_filter.serial_number &&
          <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
            Seri Numarasi
          </th>
        }
        { /* Ordered */
          stock_column_filter.material_id &&
          <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
            Malzeme ID Kodu
          </th>
        }
        { /* Ordered */
          stock_column_filter.ordered &&
          <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
            Siparisci
          </th>
        }
        
        {/* { 
          stock_column_filter.group &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            Grup
          </th>
        } */}
        
        { /* PO */
          stock_column_filter.po &&
          <th scope="col" className="px-6 py-1 text-center border font-medium w-28">
            STF No
          </th>
        }

        { /* Project Name */
          stock_column_filter.project_name &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            Proje
          </th>
        }


      </tr>
    </thead>
  )
}

export default CreateTableNavbarHeaderComponent