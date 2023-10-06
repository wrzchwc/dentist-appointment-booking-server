import { Routes } from '@angular/router';
import { AppointmentBookingComponent } from './appointment-booking/appointment-booking.component';
import { ServicesResolver } from '../shared/resolvers/services.resolver';
import { AppointmentQuestionsResolver } from './appointment-questions.resolver';

export const APPOINTMENT_BOOKING_ROUTES: Routes = [
    {
        path: '',
        component: AppointmentBookingComponent,
        title: 'Rezerwacja wizyty',
        resolve: { services: ServicesResolver, appointmentQuestions: AppointmentQuestionsResolver },
    },
];
