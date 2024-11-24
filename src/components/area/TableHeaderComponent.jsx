
import { TbSelect } from "react-icons/tb";
import { useSelector } from "react-redux";

function CreateTableNavbarHeaderComponent() {

  const user_status = useSelector(state => state.userSlice.user_status);
  const area_column_filter = useSelector(state => state.areaSlice.area_column_filter);

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
          area_column_filter.deliver_date &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            <div className="">
              Tarih
            </div>
          </th>
        }
        { /* Material code */
          area_column_filter.material_code &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            <div className="">
              Malzeme Kodu
            </div>
          </th>
        }
        { /* Material description */
          area_column_filter.material_description &&
          <th scope="col" className="px-6 py-1 text-center border  min-w-24 font-medium ">
            <div className="">
              Aciklama
            </div>
          </th>
        }
        { /* Material Name */
          area_column_filter.material_name &&
          <th scope="col" className="px-6 py-1 text-center border min-w-96 font-medium">
            <div className="">
              Malzeme Ismi
            </div>
          </th>
        }

        { /* Type */
          area_column_filter.type &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            <div className="">
              Tipi
            </div>
          </th>
        }


        { /* Amount */
          area_column_filter.qty &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            <div className="">
              Say
            </div>
          </th>
        }
        { /* Unit */
          area_column_filter.unit &&
          <th scope="col" className="px-6 py-1 text-center border  font-medium ">
            <div className="">
              Birim
            </div>
          </th>
        }

        { /* Serial Number */
          area_column_filter.serial_number &&
          <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
            Seri Numara
          </th>
        }

        { /* Material ID */
          area_column_filter.material_id &&
          <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
            Malzeme ID Kodu
          </th>
        }

        { /* Card Number */
          area_column_filter.card_number &&
          <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
            Sicil Numara
          </th>
        }

        { /* Username */
          area_column_filter.username &&
          <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
            Alici Ismi
          </th>
        }

        { /* Group name */
          area_column_filter.group_name &&
          <th scope="col" className="px-6 py-1 text-center border min-w-40 font-medium ">
            Grup Ismi
          </th>
        }

        { /* Group name */
          area_column_filter.provideType &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            Temin Tipi
          </th>
        }

        { /* Group name */
          area_column_filter.po &&
          <th scope="col" className="px-6 py-1 text-center border min-w-40 font-medium ">
            STF No
          </th>
        }

        { /* project name */
          area_column_filter.project_name &&
          <th scope="col" className="px-6 py-1 text-center border min-w-40 font-medium ">
            Proje
          </th>
        }

      </tr>
    </thead>
  )
}

export default CreateTableNavbarHeaderComponent