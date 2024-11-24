
import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";
import { IoCloudyNightOutline } from "react-icons/io5";


class CreateTableService {

    static receiveWarehouse = createAsyncThunk(
        '/warehouse/create/',
        async(common_data)=>{
            let data = {};
            await $api.post('/warehouse/create', common_data)
            .then((response) => {
                console.log('coming response us ', response);
                data.status = response.status
                data.data = response.data.message
            }).catch((err) => {
                console.log('coming err response us ', response);
                data.status = err.response.status
                data.data = err.response.data
            });
            return data;
        }
    )

}

export default CreateTableService;