import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";


class AdminService {


    // Checked Backend for async await operation
    static createCompany = createAsyncThunk(
        '/common/companies/add',
        async (company_data) => {
            try {
                let data = {};
                await $api.post('/common/companies/add', company_data)
                    .then((response) => {
                        data.status = response.status
                        data.data = response.data
                    })
                    .catch((err) => {
                        data.status = err.response.status;
                        data.data = err.response.data;
                    })
                return data;
            }
            catch (err) {
                let data = {};
                data.status = err.response.status;
                data.data = err.response.data;
                return data;
            }
        }
    )

    // Checked Backend for async await operation
    static fetchCompanies = createAsyncThunk(
        '/common/companies',
        async () => {
            let data = {};
            await $api.get('/common/companies')
                .then((response) => {
                    data.status = response.status
                    data.data = response.data;
                })
                .catch((err) => {
                    console.log('fetch companies error : ', err);
                })
            return data;
        }
    )


    // Checked
    static createOrdered = createAsyncThunk(
        '/common/ordereds/add',
        async (ordered_data) => {
            try {
                let data = {};
                await $api.post('/common/ordereds/add', ordered_data)
                    .then((response) => {
                        data.status = response.status
                        data.data = response.data
                    })
                    .catch((err) => {
                        data.status = err.response.status;
                        data.data = err.response.data;
                    })
                return data;
            }
            catch (err) {
                let data = {};
                data.status = err.response.status;
                data.data = err.response.data;
                return data;
            }
        }
    )

    // Checked
    static fetchOrdereds = createAsyncThunk(
        '/common/ordereds',
        async () => {
            console.log('admin ');
            let data = {};
            await $api.get('/common/ordereds')
                .then((response) => {
                    data.status = response.status
                    data.data = response.data;
                })
                .catch((err) => {
                    console.log('fetch ordereds error : ', err);
                })
            return data;
        }
    )


    // Checked
    static createUser = createAsyncThunk(
        '/users/create',
        async (user_data) => {
            try {
                let data = {};
                await $api.post('/users/create', user_data)
                    .then((response) => {
                        data.status = response.status
                        data.data = response.data
                    })
                    .catch((err) => {
                        data.status = err.response.status;
                        data.data = err.response.data;
                    })
                return data;
            }
            catch (err) {
                let data = {};
                data.status = err.response.status;
                data.data = err.response.data;
                return data;
            }
        }
    )

    static fetchUsers = createAsyncThunk(
        '/users',
        async () => {
            let data = {};
            await $api.get('/users')
                .then((response) => {
                    data.status = response.status
                    data.data = response.data;
                })
                .catch((err) => {
                    console.log('fetch users error : ', err);
                })
            return data;
        }
    )


    // Checked Backend for async await operation
    static createGroup = createAsyncThunk(
        '/common/groups/add',
        async (group_data) => {
            try {
                let data = {};
                await $api.post('/common/groups/add', group_data)
                    .then((response) => {
                        data.status = response.status
                        data.data = response.data
                    })
                    .catch((err) => {
                        data.status = err.response.status;
                        data.data = err.response.data;
                    })
                return data
            }
            catch (err) {
                let data = {};
                data.status = err.response.status;
                data.data = err.response.data;
                return data;
            }
        }
    )

    // Checked Backend for async await operation
    static fetchGroups = createAsyncThunk(
        '/common/groups',
        async () => {
            let data = {};
            await $api.get('/common/groups')
                .then((response) => {
                    data.status = response.status
                    data.data = response.data;
                })
                .catch((err) => {
                    console.log('fetch groups error : ', err);
                })
            return data;
        }
    )


    // Checked
    static createProject = createAsyncThunk(
        '/common/projects/add',
        async (project_data) => {
            try {
                let data = {};
                await $api.post('/common/projects/add', project_data)
                    .then((response) => {
                        data.status = response.status
                        data.data = response.data
                    })
                    .catch((err) => {
                        data.status = err.response.status;
                        data.data = err.response.data;
                    })
                return data;
            }
            catch (err) {
                let data = {};
                data.status = err.response.status;
                data.data = err.response.data;
                return data;
            }
        }
    )

    // Checked
    static fetchProjects = createAsyncThunk(
        '/common/projects',
        async () => {
            let data = {};
            await $api.get('/common/projects')
                .then((response) => {
                    data.status = response.status
                    data.data = response.data;
                })
                .catch((err) => {
                    console.log('fetch projects error : ', err);
                })
            return data;
        }
    )


    // Checked
    static fetchUserStatus = createAsyncThunk(
        '/users/fetchuserstatus',
        async () => {
            let data = null;
            await $api.get('/users/fetchuserstatus')
                .then((response) => {
                    data = response.data;
                })
                .catch((err) => {
                    console.log('fetch projects error : ', err);
                })
            return data;
        }
    )

    
    // Checked
    static createMaterialCode = createAsyncThunk(
        '/common/materialcodes/add',
        async (group_data) => {
            try {
                let data = {};
                await $api.post('/common/materialcodes/add', group_data)
                    .then((response) => {
                        data.status = response.status
                        data.data = response.data
                    })
                    .catch((err) => {
                        data.status = err.response.status;
                        data.data = err.response.data;
                    })
                return data;
            }
            catch (err) {
                let data = {};
                data.status = err.response.status;
                data.data = err.response.data;
                return data;
            }
        }
    )

    // Checked
    static fetchMaterialCodes = createAsyncThunk(
        '/common/materialcodes',
        async () => {
            let data = {};
            await $api.get('/common/materialcodes')
                .then((response) => {
                    data.status = response.status
                    data.data = response.data;
                })
                .catch((err) => {
                    console.log('fetch groups error : ', err);
                })
            return data;
        }
    )

    // Checked
    static filterMaterialCodes = createAsyncThunk(
        '/common/materialcodes/filter',
        async (filtered_query) => {
            let query = '?value=' + filtered_query;
            let data = {};
            await $api.get(`/common/materialcodes/filter${query}`)
                .then((response) => {
                    data.status = response.status
                    data.data = response.data;
                })
                .catch((err) => {
                    data.status = err.response.status;
                    data.data = err.response.data;
                })
            return data;
        }
    )

}

export default AdminService;