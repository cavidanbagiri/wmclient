
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import AdminService from "../services/admin-service";

const initialState = {

    ordered: {
        ordereds: [],
        message: '',
        pending: false,
        status: -1,
    },

    company: {
        companies: [],
        message: '',
        pending: false,
        status: -1,
    },

    group: {
        groups: [],
        message: '',
        pending: false,
        status: -1,
    },

    project: {
        projects: [],
        message: '',
        pending: false,
        status: -1,
    },

    user: {
        users: [],
        message: '',
        pending: false,
        status: -1,
    },

    material_code: {
        material_codes: [],
        message: '',
        pending: false,
        status: -1,
        created_data: null,
    },


    user_status: []

}

export const adminSlice = createSlice({

    name: 'adminSlice',
    initialState,
    reducers: {


        // Ordered
        setCreateOrderedStatusInitial(state) {
            state.ordered.status = -1;
        },
        setCreateOrderedStatusError(state) {
            state.ordered.status = 0;
        },
        setCreateOrderedMessage(state, action) {
            state.ordered.message = action.payload;
        },


        // User
        setCreateUserStatusInitial(state) {
            state.user.status = -1;
        },
        setCreateUserStatusError(state) {
            state.user.status = 0;
        },
        setCreateUserMessage(state, action) {
            state.user.message = action.payload;
        },


        // Group
        setCreateGroupStatusInitial(state) {
            state.group.status = -1;
        },
        setCreateGroupStatusError(state) {
            state.group.status = 0;
        },
        setCreateGroupMessage(state, action) {
            state.group.message = action.payload;
        },


        // Project
        setCreateProjectStatusInitial(state) {
            state.project.status = -1;
        },
        setCreateProjectStatusError(state) {
            state.project.status = 0;
        },
        setCreateProjectMessage(state, action) {
            state.project.message = action.payload;
        },


        // Company
        setCreateCompanyStatusInitial(state) {
            state.company.status = -1;
        },
        setCreateCompanyStatusError(state) {
            state.company.status = 0;
        },
        setCreateCompanyMessage(state, action) {
            state.company.message = action.payload;
        },


        // Material Code
        setCreateMaterialCodeStatusInitial(state) {
            state.material_code.status = -1;
        },
        setCreateMaterialCodeStatusError(state) {
            state.material_code.status = 0;
        },
        setCreateMaterialCodeMessage(state, action) {
            state.material_code.message = action.payload;
        },


    },
    extraReducers: (builder) => {


        // Create Ordered
        builder.addCase(AdminService.createOrdered.pending, (state, action) => { state.ordered.pending = true; })
        builder.addCase(AdminService.createOrdered.fulfilled, (state, action) => {
            state.ordered.pending = false;
            if (action.payload.status === 201) {
                state.ordered.status = 1;
                state.ordered.message = 'Siparisci Olusturuldu';
            }
            else if (action.payload.status === 409) {
                state.ordered.status = 0;
                state.ordered.message = action.payload.data.message;
            }
            else {
                state.ordered.status = 0;
                state.ordered.message = 'Siparisci Olusturulamadi';
            }
        })
        builder.addCase(AdminService.fetchOrdereds.fulfilled, (state, action) => {
            if (action.payload.status === 200) {
                state.ordered.ordereds = action.payload.data;
            }
        })


        // Create User
        builder.addCase(AdminService.createUser.pending, (state, action) => { state.user.pending = true; })
        builder.addCase(AdminService.createUser.fulfilled, (state, action) => {
            state.user.pending = false;
            if (action.payload.status === 201) {
                state.user.status = 1;
                state.user.message = 'Kullanici Basariyla Olusturuldu';
            }
            else if (action.payload.status === 409) {
                state.user.status = 0;
                state.user.message = action.payload.data.message;
            }
            else {
                state.user.status = 0;
                state.user.message = 'Kullanici Olusturulamadi';
            }
        })
        builder.addCase(AdminService.fetchUsers.fulfilled, (state, action) => {
            if (action.payload.status === 200) {
                state.user.users = action.payload.data;
            }
        })


        // Create Company
        builder.addCase(AdminService.createCompany.pending, (state, action) => { state.company.pending = true; })
        builder.addCase(AdminService.createCompany.fulfilled, (state, action) => {
            state.company.pending = false;
            if (action.payload.status === 201) {
                state.company.status = 1;
                state.company.message = 'Yeni Firma Basariyla Olusturuldu';
            }
            else if (action.payload.status === 409) {
                state.company.status = 0;
                state.company.message = action.payload.data.message;
            }
            else {
                state.company.status = 0;
                state.company.message = 'Firma Olusturulamadi';
            }
        })
        builder.addCase(AdminService.fetchCompanies.fulfilled, (state, action) => {
            if (action.payload.status === 200) {
                state.company.companies = action.payload.data;
            }
        })


        // Create Group
        builder.addCase(AdminService.createGroup.pending, (state, action) => { state.group.pending = true; })
        builder.addCase(AdminService.createGroup.fulfilled, (state, action) => {
            state.group.pending = false;
            state.create_group_message_cond = true;
            if (action.payload.status === 201) {
                state.group.status = 1;
                state.group.message = 'Yeni Grup Basariyla Olusturuldu';
            }
            else if (action.payload.status === 409) {
                state.group.status = 0;
                state.group.message = action.payload.data.message;
            }
            else {
                state.group.status = 0;
                state.group.message = 'Grup Olusturulamadi';
            }
        })
        builder.addCase(AdminService.fetchGroups.fulfilled, (state, action) => {
            if (action.payload.status === 200) {
                state.group.groups = action.payload.data;
            }
        })


        // Create Project
        builder.addCase(AdminService.createProject.pending, (state, action) => { state.project.pending = true; })
        builder.addCase(AdminService.createProject.fulfilled, (state, action) => {
            state.project.pending = false;
            console.log('action payload is ', action.payload);
            if (action.payload.status === 201) {
                state.project.status = 1;
                state.project.message = 'Yeni Proje Basariyla Olusturuldu';
            }
            else if (action.payload.status === 409) {
                state.project.status = 0;
                state.project.message = action.payload.data.message;
            }
            else {
                state.project.status = 0;
                state.project.message = action.payload.data.message;
            }
        })
        builder.addCase(AdminService.fetchProjects.fulfilled, (state, action) => {
            if (action.payload.status === 200) {
                state.project.projects = action.payload.data;
            }
        })


        // Fetch User Status 
        builder.addCase(AdminService.fetchUserStatus.fulfilled, (state, action) => {
            if (action.payload !== null) {
                state.user_status = action.payload;
            }
        })



        // Create Material
        builder.addCase(AdminService.createMaterialCode.pending, (state, action) => { state.material_code.pending = true; })
        builder.addCase(AdminService.createMaterialCode.fulfilled, (state, action) => {
            state.material_code.pending = false;
            if (action.payload.status === 201) {
                state.material_code.status = 1;
                state.material_code.message = 'Malzeme Kodu Basariyla Olusturuldu';
                state.material_code.created_data = action.payload.data
            }
            else if (action.payload.status === 409) {
                state.material_code.status = 0;
                state.material_code.message = action.payload.data.message;
            }
            else {
                state.material_code.status = 0;
                state.material_code.message = 'Malzeme Kodu Olusturulamadi';
            }
        })
        builder.addCase(AdminService.fetchMaterialCodes.fulfilled, (state, action) => {
            if (action.payload.status === 200) {
                state.material_code.material_codes = action.payload.data;
            }
        })

    }

})

export const { setCreateCompanyMessageFalse,

    setCreateOrderedStatusInitial,
    setCreateOrderedStatusError,
    setCreateOrderedMessage,


    setCreateUserStatusInitial,
    setCreateUserStatusError,
    setCreateUserMessage,

    setCreateGroupStatusInitial,
    setCreateGroupStatusError,
    setCreateGroupMessage,

    setCreateProjectStatusInitial,
    setCreateProjectStatusError,
    setCreateProjectMessage,

    setCreateCompanyStatusInitial,
    setCreateCompanyStatusError,
    setCreateCompanyMessage,

    setCreateMaterialCodeStatusInitial,
    setCreateMaterialCodeStatusError,
    setCreateMaterialCodeMessage,

} = adminSlice.actions;

export default adminSlice.reducer;