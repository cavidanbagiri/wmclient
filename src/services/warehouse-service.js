import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";


class WarehouseService {

    // Checked
    static fetchWarehouseData = createAsyncThunk(
        '/warehouse/fetch',
        async() => {
            let data = {};
            await $api.get(`/warehouse/fetch`)
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('fetch warehouse data Error happen : ', err);
            });
            return data;
        }
    );

    // Checked
    static filterWarehouseData = createAsyncThunk(
        '/warehouse/filter',
        async(filter_query) => {
            let data = {};
            let query = '?';
            for(let [key, value] of Object.entries(filter_query)){
                if(value!==''){
                    query+=`${key}=${value}&`;
                }
            }
            await $api.get(`/warehouse/filter/${query}`)
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('fetch warehouse data Error happen : ', err);
            });
            return data;
        }
    )

    // Checked
    static getPOById = createAsyncThunk(
        '/warehouse/po/:id',
        async(id) => {
            let data = {};
            await $api.get(`/warehouse/${id}`).
            then((response)=>{
                data = response.data;
            })
            .catch((err)=>{
                console.log('Get Row Id Error : ', err);
            })
            return data;
        }
    )

    // Checked
    static updatePO = createAsyncThunk(
        '/warehouse/update',
        async(updated_data) => {
            let data = {};
            await $api.post(`/warehouse/update`, updated_data).
            then((response)=>{
                data.data = response.data.data;
                data.status = 201;
                data.msg = response.data.msg;
            })
            .catch((err)=>{
                data.status = err.response.status;
                data.data = err.response.data.msg;
                data.msg = err.response.data.msg;
            })
            return data;
        }
    )

    // Checked
    static updateCertOrPassportById = createAsyncThunk(
        '/warehouse/updatecertorpassportbyid',
        async(updated_data) => {
            let data = {};
            await $api.post(`/warehouse/updatecertorpassportbyid`, updated_data)
                .then((response) => {
                    data.data = response.data.data;
                    data.status = response.status;
                    data.msg = response.data.msg;
                }).catch((err)=>{
                    data.status = err.response.status;
                    data.data = err.response.data;
                    data.msg = err.response.data;
                })
            return data;
        }
    )

    // Checked
    static fetchSelectedItemsById = createAsyncThunk(
        '/warehouse/fetchselecteditems',
        async(selected_ids) => {
            let data = null;
            await $api.post(`/warehouse/fetchselecteditems`, selected_ids)
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('fetch selected ids error : ', err);
            })
            return data;
        }
    )

    // Checked
    static receiveToStock = createAsyncThunk(
        '/warehouse/provide',
        async(selected_items) => {
            let data = {};
            await $api.post(`/warehouse/provide`, selected_items)
                .then((respond)=>{
                    data.status = respond.status;
                    data.msg = respond.data.message;
                    data.data = respond.data.data;
                }).catch((err)=>{
                    data.status = err.response.status;
                    data.msg = err.response.data.message;
                    data.data = err.response.data.message;
                });
            return data;
        }
    )

    // Checked
    static handleUploadClick = createAsyncThunk(
        '/warehouse/uploadcertificateorpassport/warehouse_id',
        async(sending_data) => {
            let data = {};
            await $api.post(`/warehouse/uploadcertificateorpassport/${sending_data.id}`, sending_data.file)
                .then((respond)=>{
                    data.status = respond.status;
                    data.msg = respond.data.msg;
                    data.data = respond.data.data;
                }).catch((err)=>{
                    data.status = err.response.status;
                    data.msg = err.response.data;
                    data.data = err.response.data;
                });
            return data;
        }
    )

    // Checked
    static fetchCertificatesOrPassports = createAsyncThunk(
        '/warehouse/fetchcertificatesorpassport',
        async(warehouseId) => {
            let data = {};
            await $api.get(`/warehouse/fetchcertificatesorpassport/${warehouseId}`)
                .then((respond)=>{
                    data.status = respond.status;
                    data.data = respond.data;
                }).catch((err)=>{
                    data.status = err.response.status;
                    data.msg = err.response.data;
                });
            return data;
        }
    )

}

export default WarehouseService;