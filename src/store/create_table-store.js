
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CreateTableService from "../services/create_table-service";


const initialState = {

    table: [],
    table_check: [{}],

    show_load: false,
    show_message: false,
    show_message_text: '',
    show_message_color: 'bg-green-500',

    type_data: {
        Project: 0,
        Fixture: 0,
        Consumable: 0
    }

}

export const createTableSlice = createSlice({

    name: 'createTableSlice',
    initialState,
    reducers: {

        // This function for iterate table size time component and send new component data to main table
        addTableCheck: (state) => {
            state.table_check.push({});
        },

        addRow: (state, actions) => {
            if (state.table.length === 0) {
                state.table.push(actions.payload.row);
                state.type_data.Consumable += 1;
            }
            else {
                let cond = true;
                for (let i of state.table) {
                    if (i.ss === actions.payload.row.ss) {
                        cond = false;
                        break;
                    }
                }
                if (cond) {
                    state.table.push(actions.payload.row);
                    state.type_data.Consumable += 1;
                }
            }
        },

        delRow: (state) => {
            state.table_check.pop();
            state.table.pop();
        },

        updateRow: (state, actions) => {
            let updated_row = state.table.find((row) => row.ss === actions.payload.ss);
            updated_row[actions.payload.name] = actions.payload.value;

            if (actions.payload.name === 'type') {
                state.type_data.Consumable = 0;
                state.type_data.Project = 0;
                state.type_data.Fixture = 0;
                for (let i of state.table) {
                    if (i.type === 'Consumable') {
                        state.type_data.Consumable += 1;
                    }
                    if (i.type === 'Project') {
                        state.type_data.Project += 1;
                    }
                    if (i.type === 'Fixture') {
                        state.type_data.Fixture += 1;
                    }
                }
            }

            if (actions.payload.second_name) {
                updated_row[actions.payload.second_name] = actions.payload.second_val;
            }
        },

        setShowMessageFalse: (state, action) => {
            state.show_message = false;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(CreateTableService.receiveWarehouse.pending, (state, action) => {
            state.show_load = true;
        })
        builder.addCase(CreateTableService.receiveWarehouse.fulfilled, (state, action) => {
            state.show_load = false;
            if (action.payload.status === 201) {
                state.table = [];
                state.table_check = [];
                state.show_message = true;
                state.show_message_text = action.payload.data;
                state.show_message_color = 'bg-green-500';
            }
            else {
                state.show_message_color = 'bg-red-500',
                state.show_message = true;
                state.show_message_text = action.payload.data;
            }
        })
    }
});


export const { addTableCheck, addRow, delRow, updateRow, setShowMessageFalse } = createTableSlice.actions;

export default createTableSlice.reducer;