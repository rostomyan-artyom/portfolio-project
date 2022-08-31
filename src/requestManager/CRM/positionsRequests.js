import axios from 'axios';

const GET_POSITIONS_URL = '/positions';

export const getPositionsRequest = () => axios.get(
  GET_POSITIONS_URL
);
