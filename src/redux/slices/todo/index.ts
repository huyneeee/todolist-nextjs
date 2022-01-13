import { createSlice } from "@reduxjs/toolkit";

interface Todo {
    id: number;
    name: string;
}

const initialState: Todo = [
    {
        id: 1,
        name: "Cooking",
    },
    {
        id: 2,
        name: "Play Soccer",
    },
    {
        id: 3,
        name: "Listen to Music",
    },
];

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            return (state = [...state, action.payload]);
        },
        removeTodo: (state, action) => {
            const _state = state.filter((ele) => ele.id != action.payload);
            return (state = _state);
        },
        editTodo: (state, action) => {
            const _state = [...state];
            const findIndexTodo = _state.findIndex((ele) => {
                if (ele.id === action.payload.id) {
                    return ele;
                }
            });
            _state.splice(findIndexTodo, 1, action.payload);
            return (state = _state);
        },
    },
});

export const { addTodo, removeTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
