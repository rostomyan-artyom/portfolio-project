import ViewCRM from '@/views/crm';
import ViewCRMPersons from '@/views/crm/persons';
import ViewCRMPersonItem from '@/views/crm/personItem';


export default [
  {
    path: '/crm',
    name: 'crm',
    meta: { layout: 'crm', },
    component: ViewCRM,
  },
  {
    path: '/crm/persons',
    name: 'crm-persons',
    meta: { layout: 'crm', },
    component: ViewCRMPersons
  },
  {
    path: '/crm/persons/:id',
    name: 'crm-person-item',
    meta: { layout: 'crm', },
    component: ViewCRMPersonItem,
  }
];
