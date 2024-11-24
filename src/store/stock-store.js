
import { createSlice } from "@reduxjs/toolkit";

import StockService from "../services/stock-service.js";

const initialState = {

    po_data: {},
    po_data_pending: false,

    filter_stock_data: [],
    filter_stock_data_pending: [],

    selected_items: [],

    stock_column_filter:{
        date: true,
        company: false,
        document: false,
        material_code: false,
        material_description: false,
        material_name: true,
        type: false,
        qty: true,
        stock: true,
        serial_number: true,
        material_id: true,
        unit: true,
        price: false,
        currency: false,
        ordered: true,
        group: true,
        po: false,
        project_name: true,
    },


    order_provide: {
        order_provide_toggle: false,
        order_provide_data: [],
        order_provide_entering_data: [],
        order_provide_message_box: false,
        order_provide_error_message: '',
        order_provide_pending: false,
        order_provide_color_cond: 'bg-green-500',
        order_provide_data_pending: [],
        status: 0
    },

    order_update: {
        order_update_toggle: false,
        order_update_message_box: false,
        order_update_error_message: '',
        order_update_pending: false,
        order_update_color_cond: 'bg-green-500',
        status: 0
    },

    order_return: {
        order_return_toggle: false,
        order_return_message_box: false,
        order_return_error_message: '',
        order_return_pending: false,
        order_return_color_cond: 'bg-green-500',
        status: 0
    },

    material_unusable: {
        toggle: false,
        message_box: false,
        error_message: '',
        pending: false,
        color_cond: 'bg-green-500',
    },

    material_service: {
        toggle: false,
        message_box: false,
        error_message: '',
        pending: false,
        color_cond: 'bg-green-500',
    }

}

export const stockSlice = createSlice({
    name: "warehouse",
    initialState,
    reducers:{

        // Column Filter Section
        setStockColumnFilter: (state, action) => {state.stock_column_filter[action.payload.key] = action.payload.value;},

        // Selected Row Section
        selectRow: (state, action) => {state.selected_items.push(action.payload);},
        unselectRow: (state, action) => {state.selected_items = state.selected_items.filter((item)=>item!==action.payload)},
        clearSelected: (state) => {state.selected_items = [];},


        // Order Update Functions
        setOrderSelectionUpdateToggleTrue: (state) => {state.order_update.order_update_toggle = true;},
        setOrderSelectionUpdateToggleFalse: (state) => {state.order_update.order_update_toggle = false;},
        setOrderUpdateMessageBoxFalse: (state) => {state.order_update.order_update_message_box = false;},
        setOrderUpdateMessageBoxTrue: (state) => {state.order_update.order_update_message_box = true;},
        setOrderUpdateErrorMessage: (state, action) => {state.order_update.order_update_error_message = action.payload.message;},
        
        // Order Return To Warehouse Functions
        setOrderSelectionReturnToggleTrue: (state) => {state.order_return.order_return_toggle = true;},
        setOrderSelectionReturnToggleFalse: (state) => {state.order_return.order_return_toggle = false;},
        setOrderReturnMessageBoxFalse: (state) => {state.order_return.order_return_message_box = false;},
        setOrderReturnMessageBoxTrue: (state) => {state.order_return.order_return_message_box = true;},
        setorderReturnStatus: (state) => {state.order_return.status = 0;},
        setOrderReturnErrorMessage: (state, action) => {state.order_return.order_return_error_message = action.payload.message;},
        setOrderReturnColorCond: (state, action) => {state.order_return.order_return_color_cond = action.payload.color;},

        // Material Unusable Functions
        setOrderSelectionMaterialUnusableToggleTrue: (state) => {state.material_unusable.toggle = true;},
        setOrderSelectionMaterialUnusableToggleFalse: (state) => {state.material_unusable.toggle = false;},
        setOrderMaterialUnusableMessageBoxFalse: (state) => {state.material_unusable.message_box = false;},
        setOrderMaterialUnusableMessageBoxTrue: (state) => {state.material_unusable.message_box = true;},
        setOrderMaterialUnusableErrorMessage: (state, action) => {state.material_unusable.error_message = action.payload.message;},
        setOrderMaterialUnusableColorCond: (state, action) => {state.material_unusable.color_cond = action.payload.color;},
        

        // Material Service Functions
        setOrderSelectionMaterialServiceToggleTrue: (state) => {state.material_service.toggle = true;},
        setOrderSelectionMaterialServiceToggleFalse: (state) => {state.material_service.toggle = false;},
        setOrderMaterialServiceMessageBoxFalse: (state) => {state.material_service.message_box = false;},
        setOrderMaterialServiceMessageBoxTrue: (state) => {state.material_service.message_box = true;},
        setOrderMaterialServiceErrorMessage: (state, action) => {state.material_service.error_message = action.payload.message;},
        setOrderMaterialServiceColorCond: (state, action) => {state.material_service.color_cond = action.payload.color;},
        


        // Order Provide Section
        setOrderSelectionProvideToggleTrue: (state) => {state.order_provide.order_provide_toggle = true;},
        setOrderSelectionProvideToggleFalse: (state) => {state.order_provide.order_provide_toggle = false;},
        setOrderProvideMessageBoxFalse: (state) => {state.order_provide.order_provide_message_box = false;},
        setOrderProvideMessageBoxTrue: (state) => {state.order_provide.order_provide_message_box = true;},
        setOrderProvideStatus: (state) => {state.order_provide.status = 0;},
        setOrderProvideErrorMessage: (state, action) => {state.order_provide.order_provide_error_message = action.payload.message;},

        updateRow: (state, actions) => {
            let updated_row = state.order_provide.order_provide_entering_data.find((row) => row.id === actions.payload.id);
            updated_row[actions.payload.name] = actions.payload.value;

            if (actions.payload.second_name) {
                updated_row[actions.payload.second_name] = actions.payload.second_val;
            }
        },

        addRow: (state, actions) => {
            if (state.order_provide.order_provide_entering_data.length === 0) {
                state.order_provide.order_provide_entering_data.push(actions.payload.row);
            }
            else {
                let cond = true;
                for (let i of state.order_provide.order_provide_entering_data) {
                    if (i.id === actions.payload.row.id) {
                        cond = false;
                        break;
                    }
                }
                if (cond) {
                    state.order_provide.order_provide_entering_data.push(actions.payload.row);
                }
            }
        },
        clearRow: (state) => {
            state.order_provide.order_provide_entering_data = [];
            state.order_provide.order_provide_data = [];
        },

        delRow: (state) => {
            state.order_provide.order_provide_entering_data.pop();
        },
    
    },

    extraReducers:(builder)=>{

        // Get all stocks
        builder.addCase(StockService.getcStocks.pending, (state, action)=>{
            state.filter_stock_data_pending = true;
        })
        builder.addCase(StockService.getcStocks.fulfilled, (state, action)=>{
            state.filter_stock_data_pending = false;
            if(action.payload!==null){
                state.filter_stock_data = action.payload;
                console.log('action payload ', state.filter_stock_data);
            }
        })

        // Filter stocks
        builder.addCase(StockService.filterStockData.pending, (state, action)=>{
            state.filter_stock_data_pending = true;
        })
        builder.addCase(StockService.filterStockData.fulfilled, (state, action)=>{
            state.filter_stock_data_pending = false;
            if(action.payload!==null){
                state.filter_stock_data = action.payload;
            }
        })

        // Get Stock By Id
        builder.addCase(StockService.getById.pending, (state, action)=>{state.po_data_pending = true;})
        builder.addCase(StockService.getById.fulfilled, (state, action)=>{
            state.po_data_pending = false;
            if(action.payload!==null){
                state.po_data = action.payload;
            }
        })

        // Get all datas for providing to area
        builder.addCase(StockService.getDataByIds.pending, (state)=>{state.order_provide.order_provide_data_pending = true;})
        builder.addCase(StockService.getDataByIds.fulfilled, (state, action)=>{
            state.order_provide.order_provide_data_pending = false;
            if(action.payload!==null){
                state.order_provide.order_provide_data = action.payload;
            }else{
                state.order_provide.order_provide_data = [];
            }
        })

        // Provide Stock Section Checked
        builder.addCase(StockService.provideStock.pending, (state)=>{state.order_provide.order_provide_pending = true;})
        builder.addCase(StockService.provideStock.fulfilled, (state, action)=>{
            state.order_provide.order_provide_pending = false;
            if(action.payload.status === 201){
                state.order_provide.order_provide_message_box = true;
                state.order_provide.order_provide_error_message = action.payload.msg;
                state.order_provide.order_provide_color_cond = 'bg-green-500';
                state.order_provide.status = 201;
                state.order_provide.order_provide_data = [];
                state.order_provide.order_provide_entering_data = [];
                action.payload.data.map((item)=>{
                    state.filter_stock_data.map((data)=>{
                        if(data.id === item.id){
                            data.stock = item.stock
                        }
                    })
                })

            }
            else{
                state.order_provide.order_provide_message_box = true;
                state.order_provide.order_provide_error_message = action.payload.msg;
                state.order_provide.order_provide_color_cond = 'bg-red-500';
                state.order_provide.status = 500;
                state.order_provide.order_provide_data = [];
                state.order_provide.order_provide_entering_data = [];
            }
        })

        // Update Stock Section
        builder.addCase(StockService.updateStock.pending, (state)=>{state.order_update.order_update_pending = true;})
        builder.addCase(StockService.updateStock.fulfilled, (state, action)=>{
            if(action.payload.status === 201){
                state.order_update.order_update_message_box = true;
                state.order_update.order_update_error_message = action.payload.msg;
                state.order_update.order_update_pending = false;
                state.order_update.order_update_color_cond = 'bg-green-500';
                state.order_update.order_update_toggle = false
                state.order_update.status = 201;
                state.filter_stock_data.map((item)=>{
                    if(item.id === action.payload.data.id){
                        for(let[key, value] of Object.entries(item)){
                            item[key] = action.payload.data[key];
                        }
                    }
                })
            }
            else if(action.payload.status === 500){
                state.order_update.order_update_message_box = true;
                state.order_update.order_update_error_message = action.payload.msg;
                state.order_update.order_update_pending = false
                state.order_update.order_update_color_cond = 'bg-red-500'
                state.order_update.status = 500
            }
            else{
                console.log('Internal Server Error');
            }
        })

        // Return Stock Section
        builder.addCase(StockService.returnToWarehouse.pending, (state)=>{state.order_return.order_return_pending = true})
        builder.addCase(StockService.returnToWarehouse.fulfilled, (state, action)=>{
            if(action.payload.status === 201){
                state.order_return.order_return_message_box = true;
                state.order_return.order_return_error_message = action.payload.msg;
                state.order_return.order_return_pending = false
                state.order_return.order_return_color_cond = 'bg-green-500'
                state.order_return.order_return_toggle = false
                state.order_return.status = 201
                if(action.payload.data.operation !== 'delete'){     
                    state.filter_stock_data.map((item)=>{
                        if(item.id === action.payload.data.id){
                            item['qty'] = action.payload.data['qty'];
                            item['stock'] = action.payload.data['stock'];
                        }
                    })
                }
                else{
                    state.filter_stock_data = state.filter_stock_data.filter((item)=>{return item.id !== action.payload.data.id})   
                    state.selected_items = [];
                }                
            }
            else if(action.payload.status === 500){
                state.order_return.order_return_message_box = true;
                state.order_return.order_return_error_message = action.payload.msg;
                state.order_return.order_return_pending = false
                state.order_return.order_return_color_cond = 'bg-red-500'
                state.order_return.status = 500
            }
            else{
                console.log('Internal Server Error');
            }
        })

        // Set unusable Section
        builder.addCase(StockService.setUnusableMaterial.pending, (state)=>{state.material_unusable.pending = true})
        builder.addCase(StockService.setUnusableMaterial.fulfilled, (state, action)=>{
            if(action.payload.status === 201){
                state.material_unusable.message_box = true;
                state.material_unusable.error_message = action.payload.msg;
                state.material_unusable.pending = false
                state.material_unusable.color_cond = 'bg-green-500'
                state.filter_stock_data.map((item)=>{
                    if(item.id === action.payload.data.id){
                        item['stock'] = Number(action.payload.data['stock']);
                    }
                })
            }
            else if(action.payload.status === 500){
                state.material_unusable.message_box = true;
                state.material_unusable.error_message = action.payload.msg;
                state.material_unusable.pending = false
                state.material_unusable.color_cond = 'bg-red-500'
            }
            else{
                console.log('Internal Server Error');
            }
        })

        // Set service Section
        builder.addCase(StockService.setServiceMaterial.pending, (state)=>{state.material_service.pending = true})
        builder.addCase(StockService.setServiceMaterial.fulfilled, (state, action)=>{
            if(action.payload.status === 201){
                state.material_service.message_box = true;
                state.material_service.error_message = action.payload.msg;
                state.material_service.pending = false
                state.material_service.color_cond = 'bg-green-500'
                state.filter_stock_data.map((item)=>{
                    if(item.id === action.payload.data.id){
                        item['stock'] = Number(action.payload.data['stock']);
                    }
                })
            }
            else if(action.payload.status === 500){
                state.material_service.message_box = true;
                state.material_service.error_message = action.payload.msg;
                state.material_service.pending = false
                state.material_service.color_cond = 'bg-red-500'
            }
            else{
                console.log('Internal Server Error');
            }
        })

    }
})

// eslint-disable-next-line no-empty-pattern
export const {
    setStockColumnFilter,
    selectRow, unselectRow, clearSelected,
    setOrderSelectionUpdateToggleTrue, setOrderSelectionUpdateToggleFalse, setOrderUpdateMessageBoxTrue,setOrderUpdateMessageBoxFalse, setOrderUpdateErrorMessage,
    setOrderSelectionReturnToggleTrue, setOrderSelectionReturnToggleFalse, setOrderReturnMessageBoxTrue,setOrderReturnMessageBoxFalse, setOrderReturnErrorMessage, setOrderReturnColorCond, setorderReturnStatus,
    setOrderSelectionProvideToggleTrue, setOrderSelectionProvideToggleFalse, setOrderProvideMessageBoxTrue,setOrderProvideMessageBoxFalse, setOrderProvideErrorMessage, setOrderProvideStatus,
    setOrderSelectionMaterialUnusableToggleTrue, setOrderSelectionMaterialUnusableToggleFalse, setOrderMaterialUnusableMessageBoxTrue,setOrderMaterialUnusableMessageBoxFalse, setOrderMaterialUnusableErrorMessage, setOrderMaterialUnusableColorCond,
    setOrderSelectionMaterialServiceToggleTrue, setOrderSelectionMaterialServiceToggleFalse, setOrderMaterialServiceMessageBoxTrue,setOrderMaterialServiceMessageBoxFalse, setOrderMaterialServiceErrorMessage, setOrderMaterialServiceColorCond,
    updateRow, addRow, delRow, clearRow
} = stockSlice.actions;


export default stockSlice.reducer;