import axios from 'axios';
import {FETCH_USER} from './types';

// fetch user return an async function that dispatch a type and a payload
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/auth/user');
  dispatch({type: FETCH_USER, payload: res.data});
}

export const handleStripeToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data});
}
