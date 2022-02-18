export const GET_CLIENT_DATA = "GET_CLIENT_DATA";

const initalState = {
    isLoading: true,
    data: {}
};

const initialReducer = (state = initalState, action) => {
    switch(action.type) {
        case GET_CLIENT_DATA:
        return {
            ...state,
            data: {...action.payload},
            isLoading: false,
            //admin_id: process.env.REACT_APP_ADMIN_ID
        };
        default:
        return state;
    }
}

export default initialReducer;