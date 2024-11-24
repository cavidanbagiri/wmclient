
import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";

class CommonService {

    // Checked Backend for async await operation
    static fetchCompanies = createAsyncThunk(
        '/common/companies',
        async() => {
            let data = {};
            await $api.get('/common/companies')
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('fetch companies Error happen : ', err);
            });
            return data;
        }
    );

    // Checked Backend for async await operation
    static filterCompanies = createAsyncThunk(
        '/common/companies/filter',
        async(values) => {
            let data = {};
            await $api.get('/common/companies/filter/?company_name='+values)
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('fetch companies Error happen : ', err);
            });
            return data;
        }
    );

    // Checked Backend for async await operation
    static fetchProjects = createAsyncThunk(
        '/common/projects/',
        async() => {
            let data = {};
            await $api.get('/common/projects')
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('fetch projects Error happen : ', err);
            });
            return data;
        }
    );

    // Checked Backend for async await operation
    static fetchOrdereds = createAsyncThunk(
        '/common/ordereds/',
        async() => {
            let data = {};
            await $api.get('/common/ordereds')
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('fetch users Error happen : ', err);
            });
            return data;
        }
    );

    // Checked Backend for async await operation
    static filterOrdereds = createAsyncThunk(
        '/common/ordereds/filter',
        async(value) => {
            let data = {};
            await $api.get(`/common/ordereds/filter/?ordered=${value}`)
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('fetch users Error happen : ', err);
            });
            return data;
        }
    );

    // Checked Backend for async await operation
    static fetchGroups = createAsyncThunk(
        '/common/groups/',
        async() => {
            let data = {};
            await $api.get('/common/groups')
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                data = null;
            });
            return data;
        }
    )

    static getTypeCount = createAsyncThunk(
        '/warehouse/typecount',
        async(projectId) => {
            let data = {};
            await $api.get(`/warehouse/typecount/${projectId}`)
            .then((response)=>{
                data = response.data
            }).catch((err)=>{
                console.log('Error Happen Type Count : ', err);
            })
            return data;
        }
    )

    
    static fetchMaterialTypes = createAsyncThunk(
        '/common/materialtypes/',
        async() => {
            let data = {};
            await $api.get('/common/materialtypes')
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                data = null;
            });
            return data;
        }
    )


    static getRowInform = createAsyncThunk(
        'rowinform/module/id',
        async(coming_data) => {
            let data = {};
            await $api.get(`/rowinform/${coming_data.module}/${coming_data.id}`)
            .then((response) => {
                data.status = response.status;
                data.data = response.data;
            }).catch((err) => {
                data.status = err.response.status;
                data.data = err.response.data;
            });
            return data;
        }
    )

    static getTopCompanies = createAsyncThunk(
        'fetchtopcompanies/',
        async() => {
            let data = {};
            await $api.get('/topcompanies')
            .then((response) => {
                data.status = response.status;
                data.data = response.data;
            }).catch((err) => {
                data.status = err.response.status;
                data.data = err.response.data;
            });
            return data;
        }
    )


    static getStockAnalyz = createAsyncThunk(
        '/stockanalyz/',
        async(projectId) => {
            let data = {};
            await $api.get(`/stockanalyz/${projectId}`)
            .then((response) => {
                data.status = response.status;
                data.data = response.data;
            }).catch((err) => {
                data.status = err.response.status;
                data.data = err.response.data;
            });
            return data;
        }
    )

    static getGroupChartAnalyz = createAsyncThunk(
        'groupchartanalyz/',
        async(projectId) => {
            let data = {};
            await $api.get(`/groupchartanalyz/${projectId}`)
            .then((response) => {
                data.status = response.status;
                data.data = response.data;
            }).catch((err) => {
                data.status = err.response.status;
                data.data = err.response.data;
            });
            return data;
        }
    )

}

export default CommonService;