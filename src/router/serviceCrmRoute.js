import ViewCRM from '@/views/crm';
import ViewCRMPersons from '@/views/crm/persons';


export default [
  {
    path: '/crm',
    name: 'crm',
    meta: { layout: 'crm' },
    component: ViewCRM,
  },
  {
    path: '/crm/persons',
    name: 'crm-persons',
    meta: { layout: 'crm' },
    component: ViewCRMPersons
  },
];
