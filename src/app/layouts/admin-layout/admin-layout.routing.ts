import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TimerComponent } from 'src/app/pages/timer/timer.component';
import { FaqComponent } from 'src/app/pages/faq/faq.component';
import { SponserComponent } from 'src/app/pages/sponser/sponser.component';
import { MarketComponent } from 'src/app/pages/market/market.component';
import { HoldingComponent } from 'src/app/pages/holding/holding.component';
import { TransacComponent } from 'src/app/pages/transac/transac.component';
import { NewsComponent } from 'src/app/pages/news/news.component';
import { LeaderboardComponent } from 'src/app/pages/leaderboard/leaderboard.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'faq',           component: FaqComponent },
    { path: 'sponsor',           component: SponserComponent },
    { path: 'market',           component: MarketComponent },
    { path: 'bonus',           component: TimerComponent },
    { path: 'holding',           component: HoldingComponent },
    { path: 'transac',           component: TransacComponent },
    { path: 'news',           component: NewsComponent },
    { path: 'leaderboard',           component: LeaderboardComponent },
];
