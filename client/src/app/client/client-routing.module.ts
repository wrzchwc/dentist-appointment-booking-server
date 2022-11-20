import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientAppointmentsComponent } from './client-appointments/client-appointments.component';

const routes: Routes = [
    { path: 'appointments', component: ClientAppointmentsComponent, title: 'Moje wizyty' },
    { path: '', component: ClientComponent, title: 'Panel klienta' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientRoutingModule {}
