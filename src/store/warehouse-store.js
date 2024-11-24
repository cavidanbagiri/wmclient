
import { createSlice } from "@reduxjs/toolkit";

import WarehouseService from "../services/warehouse-service";

const initialState = {
    // warehouse_data: [],
    filtered_warehouse_data: [],
    filtered_warehouse_data_pending: false,

    selected_items: [],

    fetch_selected_items: null,
    fetch_selected_items_pending: false,

    po_data: {},
    po_data_pending: false,

    certificate_and_passport: {
        message_box: false,
        error_message: '',
        pending: false,
        color_cond: 'bg-green-500',
    },


    upload_certificate_and_passport: {
        message_box: false,
        error_message: '',
        pending: false,
        color_cond: 'bg-green-500',
    },

    certificate_and_passport_data: [],
    certificate_and_passport_data_pending: false,

    warehouse_column_filter:{
        date: true,
        company: true,
        document: true,
        material_code: false,
        material_description: false,
        material_name: true,
        type: true,
        qty: true,
        leftover: true,
        unit: true,
        price: false,
        currency: false,
        ordered: false,
        po: false,
        certificate: true,
        passport: true,
        project_name: false,
    },

    order_update:{
        order_update_toggle: false,
        order_update_message_box: false,
        order_update_error_message: '',
        order_update_pending: false,
        order_update_color_cond: 'bg-green-500',
        status: 0
    },

    addstock :{
        addstock_toggle: false,
        addstock_message_box: false,
        addstock_error_message: '',
        addstock_pending: false,
        addstock_color_cond: 'bg-green-500',
        status: 0
    },

}

export const warehouseSlice = createSlice({
    name: 'warehouseSlice',
    initialState,
    reducers:{

        // Work With Selection Rows
        selectRow: (state, action) => {state.selected_items.push(action.payload);},
        unselectRow: (state, action) => {state.selected_items = state.selected_items.filter((item)=>item!==action.payload);},
        clearSelected: (state) => {state.selected_items = []},


        // Update Section
        setOrderSelectionUpdateToggleTrue: (state) => {state.order_update.order_update_toggle = true;},
        setOrderSelectionUpdateToggleFalse: (state) => {state.order_update.order_update_toggle = false;},
        setOrderUpdateMessageBoxFalse: (state) => {state.order_update.order_update_message_box = false;},
        setOrderUpdateMessageBoxTrue: (state) => {state.order_update.order_update_message_box = true;},
        setOrderUpdateStatus: (state) => {state.order_update.status = 0;},
        setOrderUpdateErrorMessage: (state, action) => {state.order_update.order_update_error_message = action.payload.message;},
        setOrderUpdateColorCond: (state, action) => {state.order_update.order_update_color_cond = action.payload.color;},

        // Add Stock
        addStockToggleTrue: (state) => {state.addstock.addstock_toggle = true;},
        addStockToggleFalse: (state) => {state.addstock.addstock_toggle = false;},
        setAddStockMessageBoxTrue: (state) => {state.addstock.addstock_message_box = true;},
        setAddStockMessageBoxFalse: (state) => {state.addstock.addstock_message_box = false;},
        setAddStockStatus: (state) => {state.addstock.status = 0;},
        setAddStockMessageBoxMessage: (state, action) => {state.addstock.addstock_error_message = action.payload;},
        setAddStockColorCond: (state, action) => {state.addstock.addstock_color_cond = action.payload.color;},

        // Warehouse Filter
        setWarehouseColumnFilter: (state, action) => {state.warehouse_column_filter[action.payload.key] = action.payload.value;},


        updatefetchSelectedItems: (state, action) => {
            const item = state.fetch_selected_items.find((item)=>item.id === action.payload.id);
            item['entered_amount'] = action.payload.entered_amount;
            item['serial_number'] = action.payload.serial_number;
            item['material_id'] = action.payload.material_id;
            item['warehouse_id'] = action.payload.id
        },


        // Set Certificate and Passport Message Box False
        setCertificateAndPassportMessageBoxFalse: (state) => {state.certificate_and_passport.message_box = false;},
        setUploadCertificateAndPassportMessageBoxFalse: (state) => {state.upload_certificate_and_passport.message_box = false;}

    },
    extraReducers: (builder) => {


        // -------------------------------------------------------------- Fetch Data Section
        builder.addCase(WarehouseService.fetchWarehouseData.pending, (state)=>{
            state.filtered_warehouse_data_pending = true;
        })
        builder.addCase(WarehouseService.fetchWarehouseData.fulfilled, (state, action)=>{
            state.filtered_warehouse_data_pending = false;
            if(action.payload!==null){
                state.filtered_warehouse_data = action.payload;
            }
        })
        

        // -------------------------------------------------------------- Filter Data Section
        builder.addCase(WarehouseService.filterWarehouseData.pending, (state)=>{
            state.filtered_warehouse_data_pending = true;
        })
        builder.addCase(WarehouseService.filterWarehouseData.fulfilled, (state, action)=>{
            state.filtered_warehouse_data_pending = false;
            if(action.payload!==null){
                state.filtered_warehouse_data = action.payload;
            }
        })


        // -------------------------------------------------------------- Get Certificates Or Passports Section
        builder.addCase(WarehouseService.fetchCertificatesOrPassports.pending, (state)=>{state.certificate_and_passport_data_pending = true;})
        builder.addCase(WarehouseService.fetchCertificatesOrPassports.fulfilled, (state, action)=>{
            state.certificate_and_passport_data_pending = false;
            if(action.payload.status === 200){
                state.certificate_and_passport_data = action.payload.data;
            }
        })


        // -------------------------------------------------------------- Get PO By Id Section
        builder.addCase(WarehouseService.getPOById.pending, (state)=>{state.po_data_pending = true;})
        builder.addCase(WarehouseService.getPOById.fulfilled, (state, action)=>{
            state.po_data_pending = false;
            console.log('action payload is ', action.payload);
            if(action.payload!==null){
                state.po_data = action.payload;
            }
        })


        // -------------------------------------------------------------- Update Data Section
        builder.addCase(WarehouseService.updatePO.pending, (state)=>{
            state.order_update.order_update_pending = true;
        })
        builder.addCase(WarehouseService.updatePO.fulfilled, (state, action)=>{
            state.order_update.order_update_pending = false;
            console.log('coming errir is : ', action.payload);
            if(action.payload.status === 201){
                state.order_update.order_update_message_box = true;
                state.order_update.order_update_error_message = action.payload.msg;
                state.order_update.order_update_color_cond = 'bg-green-500';
                state.order_update.order_update_toggle = false;
                state.order_update.status = 201;
                state.filtered_warehouse_data.map((item)=>{
                    if(item.id === action.payload.data.id){
                        // for(let[key, value] of Object.entries(item)){
                        for(let[key, value] of Object.entries(action.payload.data)){
                            item[key] = action.payload.data[key];
                        }
                    }
                })
            }
            else {
                state.order_update.order_update_message_box = true;
                state.order_update.order_update_error_message = action.payload.msg;
                state.order_update.order_update_color_cond = 'bg-red-500';
                state.order_update.status = 500;
            }
        })


        // -------------------------------------------------------------- Update Row Certificate and passport 
        builder.addCase(WarehouseService.updateCertOrPassportById.pending, (state, action)=>{
            state.certificate_and_passport.pending = true;
        })
        builder.addCase(WarehouseService.updateCertOrPassportById.fulfilled, (state, action)=>{
            state.certificate_and_passport.pending = false;
            if(action.payload.status === 201){
                const item = state.filtered_warehouse_data.find((item)=>item.id===action.payload.data.id);
                item[action.payload.data.key] = action.payload.data.value
                state.certificate_and_passport.color_cond = 'bg-green-500';
                state.certificate_and_passport.message_box = true;
                state.certificate_and_passport.error_message = action.payload.msg;
            }
            else if(action.payload.status === 500){
                state.certificate_and_passport.color_cond = 'bg-red-500';
                state.certificate_and_passport.message_box = true;
                state.certificate_and_passport.error_message = action.payload.data;
            }
            else{
                console.log('Internal Server Error : ');
            }
        })
        
        
        // -------------------------------------------------------------- Update Row Certificate and passport 
        builder.addCase(WarehouseService.handleUploadClick.pending, (state, action)=>{
            state.upload_certificate_and_passport.pending = true;
        })
        builder.addCase(WarehouseService.handleUploadClick.fulfilled, (state, action)=>{
            state.upload_certificate_and_passport.pending = false;
            if(action.payload.status === 201){
                state.upload_certificate_and_passport.color_cond = 'bg-green-500';
                state.upload_certificate_and_passport.message_box = true;
                state.upload_certificate_and_passport.error_message = action.payload.msg;
            }
            else if(action.payload.status === 500){
                state.upload_certificate_and_passport.color_cond = 'bg-red-500';
                state.upload_certificate_and_passport.message_box = true;
                state.upload_certificate_and_passport.error_message = action.payload.data;
            }
            else{
                console.log('Internal Server Error : ');
            }
        })

        // -------------------------------------------------------------- Add Stock
        builder.addCase(WarehouseService.fetchSelectedItemsById.pending, (state)=>{state.fetch_selected_items_pending = true;})
        builder.addCase(WarehouseService.fetchSelectedItemsById.fulfilled, (state, action)=>{
            state.fetch_selected_items_pending = false;
            if(action.payload!==null){
                state.fetch_selected_items = action.payload;
            }
        })
        builder.addCase(WarehouseService.receiveToStock.pending, (state)=>{state.addstock.addstock_pending = true;})
        builder.addCase(WarehouseService.receiveToStock.fulfilled, (state, action)=>{
            state.addstock.addstock_pending = false;
            if(action.payload.status === 201){
                state.addstock.addstock_message_box = true;
                state.addstock.addstock_color_cond = 'bg-green-500';
                state.addstock.addstock_error_message = action.payload.msg;
                state.addstock.status = 201;
                state.addstock.addstock_toggle = false;
                action.payload.data.map((item)=>{
                    state.filtered_warehouse_data.map((data)=>{
                        if(data.id === item.id){
                            data.leftover = item.leftover
                        }
                    })
                })

            }
            else{
                console.log('Internal Server Error : bt my ');
                state.addstock.addstock_message_box = true;
                state.addstock.addstock_color_cond = 'bg-red-500';
                state.addstock.addstock_error_message = action.payload.msg;
                state.addstock.status = 500;
            }
        })


    }
})


export const {
    selectRow, unselectRow, clearSelected,
    setOrderSelectionUpdateToggleTrue, setOrderSelectionUpdateToggleFalse,
    setOrderUpdateMessageBoxFalse, setOrderUpdateMessageBoxTrue, setOrderUpdateStatus,
    setOrderUpdateErrorMessage,setOrderUpdateColorCond, 
    setWarehouseColumnFilter,
    addStockToggleTrue, addStockToggleFalse, setAddStockMessageBoxFalse,
    setAddStockMessageBoxMessage, setAddStockMessageBoxTrue, setAddStockColorCond, setAddStockStatus,
    updatefetchSelectedItems,
    setCertificateAndPassportMessageBoxFalse, setUploadCertificateAndPassportMessageBoxFalse
} = warehouseSlice.actions;


export default warehouseSlice.reducer;