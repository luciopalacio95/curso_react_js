import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        github: 'johndoe',
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jan.smith@gmail.com',
        github: 'janesmith',
    },
    {
        id: '3',
        name: 'David Clark',
        email: 'david.clark@gmail.com',
        github: 'davidclark',
    },
    {
        id: '4',
        name: 'Mike Johnson',
        email: 'mike.johnson@gmail.com',
        github: 'mikejohnson',
    },
    {
        id: '5',
        name: 'Alice Brown',
        email: 'alice.browm@yahoo.com.ar',
        github: 'midudev',
    },
]

export type UserId = string;

export interface User {
    name: string;
    email: string;
    github: string;
}

export interface UserWithId extends User{
    id: UserId;
}

const initialState: UserWithId[] = (() =>{
    const persistanceState = localStorage.getItem("__redux__state__");
    return persistanceState ? JSON.parse(persistanceState).users : DEFAULT_STATE;
})();
// iife inmediately invoked function expression

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
            state.push({id, ...action.payload})
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload;
            return state.filter((user) => user.id !== id);
        },
        rollBackUser: (state, action: PayloadAction<UserWithId>) => {
            const isUserAlreadyDefined = state.some(user => user.id === action.payload.id);
            if(!isUserAlreadyDefined){
                state.push(action.payload)

            }
        }
    }
});

export default usersSlice.reducer;

export const {addNewUser, deleteUserById, rollBackUser} = usersSlice.actions