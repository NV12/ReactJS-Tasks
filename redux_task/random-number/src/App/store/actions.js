import axios from 'axios';

export const RANDOM_NUMBER = 'RANDOM_NUMBER';


export const saveRandomNumber = (res) => {
    return {
        type: RANDOM_NUMBER,
        value: res.data.ans
    };
};

export const randomNumber = () => {
    return dispatch => {
        axios.get('http://localhost:3000/randomNumber')
                .then(res => {
                    console.log("res: ", res);
                    dispatch(saveRandomNumber(res));                    
                })
                .catch(err => {
                    console.log("err", err);
                })
    };
};