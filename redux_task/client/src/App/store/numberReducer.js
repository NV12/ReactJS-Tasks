const initialState = {
    counter: 0
}

const numberReducer = (state = initialState, action) => {
    console.log("Inside numberReducer");
    // console.log("action.type", action.type);
    switch (action.type) {

        /*  Note: We can't add async code in reducers, it doesn't work */

        case 'RANDOM_NUMBER': {
            return {
                counter: action.value
            }
        }

        default: return state;
    }
}

export default numberReducer;