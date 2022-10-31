import { createSlice } from "@reduxjs/toolkit";
import { IDataType } from "../../constant/interface";

export const initialState: IDataType[] = [
	{
		key: '0',
		firstName: 'Edward',
		secondName: 'King',
		lastName: 'Source',
	},
	{
		key: '1',
		firstName: 'Ray',
		secondName: 'King',
		lastName: 'Source',
	},
	{
		key: '2',
		firstName: 'Nitoshi',
		secondName: 'King',
		lastName: 'Source',
	}
];

export const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		ADD_STATE: (state, action ) => {
			const newState = [...state, action.payload];
			return newState
		},
		ADD_MAS_STATE: (state, action) => {
			const newState = [...state, ...action.payload];
			return newState
		},
		EDIT_STATE: ( state, action ) => {
			const editState: IDataType[] = [];
			state.forEach((item: IDataType) => {
				editState.push(item.key === action.payload.key ? action.payload : item);
			});
			return editState
		},
		DELETE_STATE: ( state, action ) => {
			const deleteState = state.filter(item => item.key !== action.type);
			return deleteState
		}
	}
});

export const { ADD_STATE, EDIT_STATE, DELETE_STATE, ADD_MAS_STATE} = dataSlice.actions;
export default dataSlice.reducer;