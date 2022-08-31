export const PERSON_SCHEME = {
  avatar: {
    type: 'image',
    label: 'Аватарка',
    inputAlias: 'inputList',
  },
  fullName: {
    type: 'linkToProfile',
    label: 'Полное имя',
    inputAlias: 'inputList',
  },
  dateOfBirth: {
    type: 'date',
    format: 'DD.MM.YYYY',
    dateOfBirth: true,
    label: 'Дата рождения',
    inputAlias: 'dateOfBirth',
  },
  gender: {
    type: 'string',
    label: 'Пол',
    inputAlias: 'genderTypes',
  },
  post: {
    type: 'string',
    label: 'Должность',
    inputAlias: 'selectsList',
  },
  education: {
    type: 'string',
    inputType: 'string',
    label: 'Образование',
    inputAlias: 'selectsList',
  },
  createdAt: {
    type: 'date',
    format: 'DD.MM.YYYY HH:mm',
    label: 'Дата создания',
    inputAlias: 'createdAt',
  },
}
