import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http/index.js";


class StockService {


    // Checked
    static getcStocks = createAsyncThunk(
        '/stock',
        async () => {
            let data = {};
            await $api.get(`/stock/fetch`)
                .then((response) => {
                    console.log('coming stock is : ', response);
                    data = response.data;
                })
                .catch((err) => {
                    console.log('fetch stock Error happen : ', err);
                })
            return data;
        }
    )

    // Checked
    static filterStockData = createAsyncThunk(
        '/stock/filter',
        async (filter_query) => {
            let data = {};
            let query = '?';
            for (let [key, value] of Object.entries(filter_query)) {
                if (value !== '') {
                    query += `${key}=${value}&`;
                }
            }
            await $api.get(`/stock/filter/${query}`)
                .then((response) => {
                    data = response.data;
                }).catch((err) => {
                    console.log('fetch warehouse data Error happen : ', err);
                });
            return data;
        }
    )

    // Checked
    static getById = createAsyncThunk(
        '/stock/:id',
        async (id) => {
            let data = {};
            await $api.get(`/stock/${id}`).
                then((response) => {
                    data = response.data;
                })
                .catch((err) => {
                    console.log('Get Row Id Error : ', err);
                })
            return data;
        }
    )

    // Checked
    static getDataByIds = createAsyncThunk(
        '/stock/datas',
        async (ids) => {
            let data = {};
            await $api.post(`/stock/datas`, ids).
                then((response) => {
                    data = response.data;
                })
                .catch((err) => {
                    console.log('Get Row Id Error : ', err);
                })
            return data;
        }
    )

    // Checked
    static provideStock = createAsyncThunk(
        '/stock/provide',
        async (provide_data) => {
            let data = {};
            await $api.post(`/stock/provide`, provide_data).
                then((response) => {
                    data.status = response.status;
                    data.msg = response.data.msg;
                    data.data = response.data.data;
                })
                .catch((err) => {
                    data.status = err.response.status;
                    data.data = err.response.data;
                    data.msg = err.response.data;
                })
            return data;
        }
    )


    static updateStock = createAsyncThunk(
        '/stock/update',
        async (updated_data) => {
            let data = {};
            await $api.post(`/stock/update`, updated_data).
                then((response) => {
                    data.status = response.status;
                    data.msg = response.data.msg;
                    data.data = response.data.data;
                })
                .catch((err) => {
                    data.status = err.response.status;
                    data.msg = err.response.data;
                    data.data = err.response.data;
                })
            return data;
        }
    )

    // Checked
    static returnToWarehouse = createAsyncThunk(
        '/stock/return',
        async (updated_data) => {
            let data = {};
            await $api.post(`/stock/return`, updated_data).
                then((response) => {
                    data.status = response.status;
                    data.msg = response.data.msg;
                    data.data = response.data.data;
                })
                .catch((err) => {
                    data.status = err.response.status;
                    data.msg = err.response.data;
                    data.data = err.response.data;
                })
            return data;
        }
    )

    static setUnusableMaterial = createAsyncThunk(
        '/stock/setunusablematerial',
        async (sending_data) => {
            let data = {};
            await $api.post(`/stock/setunusablematerial`, sending_data).
                then((response) => {
                    data.status = response.status;
                    data.msg = response.data.msg;
                    data.data = response.data.data;
                })
                .catch((err) => {
                    data.status = err.response.status;
                    data.msg = err.response.data;
                    data.data = err.response.data;
                })
            return data;
        }
    )

    static setServiceMaterial = createAsyncThunk(
        '/stock/setservicematerial',
        async (sending_data) => {
            let data = {};
            await $api.post(`/stock/setservicematerial`, sending_data).
                then((response) => {
                    data.status = response.status;
                    data.msg = response.data.msg;
                    data.data = response.data.data;
                })
                .catch((err) => {
                    data.status = err.response.status;
                    data.msg = err.response.data;
                    data.data = err.response.data;
                })
            return data;
        }
    )

}

export default StockService;