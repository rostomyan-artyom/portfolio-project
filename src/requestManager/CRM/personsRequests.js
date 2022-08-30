import axios from 'axios';
import { replaceUrlPattern } from '@/requestManager';

const GET_PERSONS_URL = '/persons';
const DELETE_PERSON_ITEM_URL = '/persons/{id}';

export const getPersonsRequest = () => axios.get(
  replaceUrlPattern(GET_PERSONS_URL),
);

export const deletePersonByIdRequest = ({ params }) => axios.delete(
  replaceUrlPattern(DELETE_PERSON_ITEM_URL, params),
);
