import axios from 'axios';
import { replaceUrlPattern } from '@/requestManager';

const GET_EDUCATIONS_URL = '/educations';
const GET_EDUCATION_ITEM_URL = '/educations/${id}';


export const getEducationsRequest = () => axios.get(
  GET_EDUCATIONS_URL
);

export const getEducationItemRequest = ({ params }) => axios.get(
  replaceUrlPattern(GET_EDUCATION_ITEM_URL, params)
);
