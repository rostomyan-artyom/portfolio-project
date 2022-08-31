import axios from 'axios';
import { replaceUrlPattern } from '@/requestManager';

const GET_PERSONS_URL = '/persons';
const GET_PERSON_ITEM_URL = '/persons/{id}';
const CREATE_PERSON_URL = '/persons';
const EDIT_PERSON_URL = '/persons/{id}';
const DELETE_PERSON_ITEM_URL = '/persons/{id}';

export const getPersonsRequest = () => axios.get(
  GET_PERSONS_URL
);

export const getPersonRequest = ({ params }) => axios.get(
  replaceUrlPattern(GET_PERSON_ITEM_URL, params),
);

export const createPersonRequest = ( personData ) => axios.post(
  CREATE_PERSON_URL, personData,
);

export const editPersonRequest = ({ params }, personData) => axios.put(
  replaceUrlPattern(EDIT_PERSON_URL, params), personData,
);

export const deletePersonRequest = ({ params }) => axios.delete(
  replaceUrlPattern(DELETE_PERSON_ITEM_URL, params),
);
