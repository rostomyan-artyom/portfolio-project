import axios from 'axios';
import { replaceUrlPattern } from '@/requestManager';

const GET_POSITIONS_URL = '/positions';


export const getPositionsRequest = () => axios.get(
  replaceUrlPattern(GET_POSITIONS_URL)
);
