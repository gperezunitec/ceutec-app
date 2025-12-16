import {Routes} from "@angular/router";
import {TabsPage} from "./tabs.page";

export const routes: Routes = [
  {
    path: 'tabs',
    component:TabsPage,
    children: [
      {
        path: 'home-page',
        loadComponent: () => import('./../../../home-page/home-page.page').then( m => m.HomePagePage)
      },
      {
        path: 'cards',
        loadComponent: () => import('./../../../cards/cards.page').then( m => m.CardsPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('../../../profile/pages/profile/profile.page').then(m => m.ProfilePage)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home-page',
    pathMatch: 'full',
  },
]
