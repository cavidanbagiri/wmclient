

import { createSlice } from '@reduxjs/toolkit';
import AreaService from '../services/area-service';
const initialState = {

    filtered_area_data: [],
    filtered_area_data_pending: false,

    unusable_materials: [],
    unusable_materials_pending: false,

    service_materials: [],
    service_materials_pending: false,

    selected_items: [],

    po_data: {},
    po_data_pending: false,

    unusable_to_stock:{
        message_box: false,
        error_message: '',
        pending: false,
        color_cond: 'bg-green-500',
    },

    service_to_stock:{
        message_box: false,
        error_message: '',
        pending: false,
        color_cond: 'bg-green-500',
    },

    order_update: {
        order_update_toggle: false,
        order_update_message_box: false,
        order_update_error_message: '',
        order_update_pending: false,
        order_update_color_cond: 'bg-green-500',
    },

    order_return: {
        order_return_toggle: false,
        order_return_message_box: false,
        order_return_error_message: '',
        order_return_pending: false,
        order_return_color_cond: 'bg-green-500',
    },

    area_column_filter: {
        card_number: true,
        username: true,
        material_code: false,
        material_description: false,
        material_name: true,
        qty: true,
        unit: true,
        type: false,
        group_name: false,
        serial_number: false,
        material_id: false,
        deliver_date: true,
        provideType: true,
        po: false,
        project_name: true,
    },

}

export const areaSlice = createSlice({
    name: 'areaSlice',
    initialState,
    reducers: {

        // Selected Row Section
        selectRow: (state, action) => {state.selected_items.push(action.payload);},
        unselectRow: (state, action) => {state.selected_items = state.selected_items.filter((item)=>item!==action.payload)},
        clearSelected: (state) => {state.selected_items = [];},

        setAreaColumnFilter: (state, action) => { state.area_column_filter[action.payload.key] = action.payload.value; },
        
        // Order Update Section
        setOrderSelectionUpdateToggleTrue: (state) => {state.order_update.order_update_toggle = true;},
        setOrderSelectionUpdateToggleFalse: (state) => {state.order_update.order_update_toggle = false;},
        setOrderUpdateMessageBoxTrue: (state) => {state.order_update.order_update_message_box = true;},
        setOrderUpdateMessageBoxFalse: (state) => {state.order_update.order_update_message_box = false;},
        setOrderUpdateErrorMessage: (state, action) => {state.order_update.order_update_error_message = action.payload.message;},

        // Order Return To Warehouse Functions
        setOrderSelectionReturnToggleTrue: (state) => {state.order_return.order_return_toggle = true;},
        setOrderSelectionReturnToggleFalse: (state) => {state.order_return.order_return_toggle = false;},
        setOrderReturnMessageBoxFalse: (state) => {state.order_return.order_return_message_box = false;},
        setOrderReturnMessageBoxTrue: (state) => {state.order_return.order_return_message_box = true;},
        setOrderReturnErrorMessage: (state, action) => {state.order_return.order_return_error_message = action.payload.message;},
        setOrderReturnColorCond: (state, action) => {state.order_return.order_return_color_cond = action.payload.color;},


        setServiceToStockMessageBoxFalse: (state) => {state.service_to_stock.message_box = false;},
        setUnusableToStockMessageBoxFalse: (state) => {state.unusable_to_stock.message_box = false;},
        

    },
    extraReducers: (builder) => {

        // Fetch Areas Data
        builder.addCase(AreaService.fetchAreas.pending, (state) => { state.filtered_area_data_pending = true })
        builder.addCase(AreaService.fetchAreas.fulfilled, (state, action) => {
            state.filtered_area_data_pending = false
            if (action.payload.status === 200) {
                state.filtered_area_data = action.payload.data
            }
        })


        // Filter Area Data
        builder.addCase(AreaService.filterAreaData.pending, (state) => { state.filtered_area_data_pending = true })
        builder.addCase(AreaService.filterAreaData.fulfilled, (state, action) => {
            console.log('action payload is : ', action.payload)
            state.filtered_area_data_pending = false
            if (action.payload.status === 200) {
                state.filtered_area_data = action.payload.data
            }
        })


        // Get Stock By Id
        builder.addCase(AreaService.getById.pending, (state)=>{state.po_data_pending = true;})
        builder.addCase(AreaService.getById.fulfilled, (state, action)=>{
            state.po_data_pending = false
            if(action.payload!==null){
                state.po_data = action.payload;
            }
        })


        // Update Selected Row
        builder.addCase(AreaService.updateArea.pending, (state)=>{state.order_update.order_update_pending = true;})
        builder.addCase(AreaService.updateArea.fulfilled, (state, action)=>{
            if(action.payload.status === 201){
                state.order_update.order_update_message_box = true;
                state.order_update.order_update_error_message = action.payload.msg;
                state.order_update.order_update_pending = false;
                state.order_update.order_update_color_cond = 'bg-green-500'
                state.order_update.order_update_toggle = false
                state.filtered_area_data.map((item)=>{
                    if(item.id === action.payload.data.id){
                        item['card_number'] = action.payload.data['card_number']
                        item['username'] = action.payload.data['username']
                    }
                })
            }
            else if(action.payload.status === 500){
                state.order_update.order_update_message_box = true;
                state.order_update.order_update_error_message = action.payload.msg;
                state.order_update.order_update_pending = false
                state.order_update.order_update_color_cond = 'bg-red-500'
            }
            else{
                console.log('Internal Server Error');
            }
        })


        // Return Area Section
        builder.addCase(AreaService.returnToStock.pending, (state)=>{state.order_return.order_return_pending = true})
        builder.addCase(AreaService.returnToStock.fulfilled, (state, action)=>{
            if(action.payload.status === 201){
                state.order_return.order_return_message_box = true;
                state.order_return.order_return_error_message = action.payload.msg;
                state.order_return.order_return_pending = false
                state.order_return.order_return_color_cond = 'bg-green-500'
                state.order_return.order_return_toggle = false;
                state.filtered_area_data.map((item)=>{
                    if(item.id === action.payload.data.id){
                        item['quantity'] = action.payload.data.quantity
                    }
                })

            }
            else if(action.payload.status === 500){
                state.order_return.order_return_message_box = true;
                state.order_return.order_return_error_message = action.payload.msg;
                state.order_return.order_return_pending = false
                state.order_return.order_return_color_cond = 'bg-red-500'
            }
            else{
                console.log('Internal Server Error');
            }
        })


        // Get Unusable Materials
        builder.addCase(AreaService.getUnusableMaterials.pending, (state)=>{state.unusable_materials_pending = true})
        builder.addCase(AreaService.getUnusableMaterials.fulfilled, (state, action)=>{
            state.unusable_materials_pending = false
            if(action.payload.status === 200){
                state.unusable_materials = action.payload.data
            }
        })

        builder.addCase(AreaService.getServiceMaterials.pending, (state)=>{state.service_materials_pending = true})
        builder.addCase(AreaService.getServiceMaterials.fulfilled, (state, action)=>{
            state.service_materials_pending = false
            if(action.payload.status === 200){
                state.service_materials = action.payload.data
            }
        })


        // Unusable To Stock
        builder.addCase(AreaService.unusableReturnToStock.pending, (state)=>{state.unusable_to_stock.pending = true})
        builder.addCase(AreaService.unusableReturnToStock.fulfilled, (state, action)=>{
            if(action.payload.status === 201){
                state.unusable_to_stock.message_box = true;
                state.unusable_to_stock.error_message = action.payload.msg;
                state.unusable_to_stock.pending = false
                state.unusable_to_stock.color_cond = 'bg-green-500'
                state.unusable_materials.map((item)=>{
                    if(item.id === action.payload.data.id){
                        item['quantity'] = action.payload.data.quantity
                    }
                })
            }
            else if(action.payload.status === 400){
                state.unusable_to_stock.message_box = true;
                state.unusable_to_stock.error_message = action.payload.msg;
                state.unusable_to_stock.pending = false
                state.unusable_to_stock.color_cond = 'bg-red-500'
            }
            else{
                console.log('Internal Server Error');
            }
        })

        // Service To Stock
        builder.addCase(AreaService.serviceReturnToStock.pending, (state)=>{state.service_to_stock.pending = true})
        builder.addCase(AreaService.serviceReturnToStock.fulfilled, (state, action)=>{
            if(action.payload.status === 201){
                state.service_to_stock.message_box = true;
                state.service_to_stock.error_message = action.payload.msg;
                state.service_to_stock.pending = false
                state.service_to_stock.color_cond = 'bg-green-500'
                state.service_materials.map((item)=>{
                    if(item.id === action.payload.data.id){
                        item['quantity'] = action.payload.data.quantity
                    }
                })
            }
            else if(action.payload.status === 400){
                state.service_to_stock.message_box = true;
                state.service_to_stock.error_message = action.payload.msg;
                state.service_to_stock.pending = false
                state.service_to_stock.color_cond = 'bg-red-500'
            }
            else{
                console.log('Internal Server Error');
            }
        })

    }
})



export const { 
    setAreaColumnFilter,
    selectRow, unselectRow, clearSelected,
    setOrderSelectionUpdateToggleTrue, setOrderSelectionUpdateToggleFalse, setOrderUpdateMessageBoxTrue,setOrderUpdateMessageBoxFalse, setOrderUpdateErrorMessage,
    setOrderSelectionReturnToggleTrue, setOrderSelectionReturnToggleFalse, setOrderReturnMessageBoxTrue, setOrderReturnMessageBoxFalse, setOrderReturnErrorMessage,
    setServiceToStockMessageBoxFalse, setUnusableToStockMessageBoxFalse
 } = areaSlice.actions

export default areaSlice.reducer

