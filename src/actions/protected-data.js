import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_PROTECTED_DATA_REQUEST = 'FETCH_PROTECTED_DATA_REQUEST';
export const fetchProtectedDataRequest = data => ({
    type: FETCH_PROTECTED_DATA_REQUEST,
    data
});

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const fetchProtectedData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    // dispatch(fetchProtectedDataRequest());
    return fetch(`${API_BASE_URL}/api/questions`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => {
            console.log(res.body);
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
            })
        .then((data) => { 
            console.log(data[0].text);
            dispatch(fetchProtectedDataSuccess(data[0].text))
            
        }
            )
        // .then(({data}) => dispatch(fetchProtectedDataSuccess(data.current.value)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};
