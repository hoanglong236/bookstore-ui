import { NullLayout } from '~/layouts';
import { AdminHomePage, SellerHomePage, CustomerHomePage } from '~/pages';

const publicRoutes = [
  { path: '/', component: CustomerHomePage },
  { path: '/@:nickname', component: SellerHomePage },
  { path: '/seller', component: SellerHomePage },
  { path: '/admin', component: AdminHomePage, layout: NullLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
