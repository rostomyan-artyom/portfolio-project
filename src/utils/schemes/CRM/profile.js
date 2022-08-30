export const personScheme = {
  avatar: {
    type: 'image',
  },
  fullName: {
    type: 'linkToProfile',
  },
  age: {
    type: 'string',
  },
  gender: {
    type: 'string'
  },
  post: {
    type: 'string'
  },
  education: {
    type: 'string',
    inputType: 'string',
  },
  createdAt: {
    type: 'date',
    format: 'DD.MM.YYYY HH:mm',
  },
}
