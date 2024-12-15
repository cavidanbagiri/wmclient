
import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";

class AreaService {

    // Checked
    static fetchAreas = createAsyncThunk(
        '/areas/fetch',
        async () => {
            let data = {};
            await $api.get(`/areas/fetch`)
                .then((response) => {
                    data.status = response.status;
                    data.data = response.data;
                })
                .catch((err) => {
                    data = err.data;
                });

            return data;
        }
    )

    // Checked
    static filterAreaData = createAsyncThunk(
        '/areas/filter',
        async (filter_query) => {
            let data = {};
            let query = '?';
            for (let [key, value] of Object.entries(filter_query)) {
                if (value !== '') {
                    query += `${key}=${value}&`;
                }
            }
            await $api.get(`/areas/filter/${query}`)
                .then((response) => {
                    data.status = response.status;
                    data.data = response.data;
                }).catch((err) => {
                    console.log('fetch warehouse data Error happen : ', err);
                });
                console.log('coming data is : ', data);
            return data;
        }
    )

    // Checked
    static getById = createAsyncThunk(
        '/areas/:data_id',
        async (id) => {
            let data = {};
            await $api.get(`/areas/${id}`).
                then((response) => {
                    data.status = response.status;
                    data.data = response.data;
                })
                .catch((err) => {
                    data.status = err.response.status;
                    data.data = err.response.data;
                })
            return data;
        }
    )

    // Checked
    static updateArea = createAsyncThunk(
        '/areas/update',
        async (updated_data) => {
            let data = {};
            await $api.post(`/areas/update`, updated_data).
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
    static returnToStock = createAsyncThunk(
        '/areas/return',
        async (return_data) => {
            let data = {};
            await $api.post(`/areas/return`, return_data).
                then((response) => {
                    data.status = response.status;
                    data.msg = response.data.msg;
                    data.data = response.data.data;
                })
                .catch((err) => {
                    data.status = err.response.status;
                    data.msg = err.response.data.msg;
                    data.data = err.response.data.msg;
                })
            return data;
        }
    )

    // Checked
    static getUnusableMaterials = createAsyncThunk(
        '/areas/fetchunusablematerials',
        async () => {
            let data = {};
            await $api.get('/areas/fetchunusablematerials').
                then((response) => {
                    data.status = response.status;
                    data.msg = response.data.msg;
                    data.data = response.data;
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
    static getServiceMaterials = createAsyncThunk(
            '/areas/fetchservicematerials',
            async () => {
                let data = {};
                await $api.get('/areas/fetchservicematerials').
                then((response) => {
                    data.status = response.status;
                    data.data = response.data;
                })
                .catch((err) => {
                    data.status = err.response.status;
                    data.data = err.response.data;
                })
            return data;
        }
    )

    // Checked
    static unusableReturnToStock = createAsyncThunk(
        '/areas/unusabletostock',
        async (sending_data) => {
            let data = {};
            await $api.post(`/areas/unusabletostock`, sending_data).
                then((response) => {
                    data.status = response.status;
                    data.msg = response.data.msg;
                    data.data = response.data.data;
                })
                .catch((err) => {
                    data.status = err.response.status;
                    data.msg = err.response.data.msg;
                    data.data = err.response.data.msg;
                })
                console.log('unusable stock is : ', data);
            return data;
        }
    )

    // Checked
    static serviceReturnToStock = createAsyncThunk(
        '/areas/servicetostock',
        async (sending_data) => {
            let data = {};
            await $api.post(`/areas/servicetostock`, sending_data).
                then((response) => {
                    data.msg = response.data.msg;
                    data.data = response.data.data;
                    data.status = response.status;
                })
                .catch((err) => {
                    data.status = err.response.status;
                    data.msg = err.response.data.msg;
                    data.data = err.response.data.msg;
                })
            return data;
        }
    )

}

export default AreaService