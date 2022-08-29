import axios from 'axios';
import { replaceUrlPattern } from '@/requestManager';

const GET_PERSONS_URL = '/persons';


export const getPersonsRequest = () => axios.get(
  replaceUrlPattern(GET_PERSONS_URL)
);
