
import { useSelector } from "react-redux";

function OrderProvideTableHeaderComponent() {

    return (
        <thead style={{ fontFamily: 'IBM Plex Sans' }} className="text-black bg-gray-100 border font-medium text-sm" >
            <tr>
                <th scope="col" className="px-2 py-3 text-center border">
                    S/S
                </th>

                { /* Material name */
                    <th scope="col" className="px-6 py-1 text-center border  min-w-60 font-medium ">
                        <div className="">
                            Malzeme Ismi
                        </div>
                    </th>
                }
                { /* Type */
                    <th scope="col" className="px-6 py-1 text-center border font-medium ">
                        <div className="">
                            Tipi
                        </div>
                    </th>
                }

                { /* Stock */
                    <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                        Stok
                    </th>
                }
                { /* Unit */
                    <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                        Birim
                    </th>
                }
                { /* Serial No */
                    <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                        Seri Numara
                    </th>
                }
                { /* Material ID */
                    <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                        Malzeme ID Kodu
                    </th>
                }

                { /* Amount */
                    <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                        Miktar
                    </th>
                }
                { /* Serial No */
                    <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                        Serial No Gir
                    </th>
                }
                { /* Material ID */
                    <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                        Malzeme ID Kodu Gir
                    </th>
                }
                { /* Material ID */
                    <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                        Temin Tipi
                    </th>
                }

            </tr>
        </thead>
    )
}

export default OrderProvideTableHeaderComponent