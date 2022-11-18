/*eslint no-unused-vars: 0*/
import { Injectable } from '@angular/core';
import { WeekDay } from '@angular/common';

type DaysToWorkday = 3 | 1;

@Injectable({
    providedIn: 'root',
})
export class DateService {
    constructor() {}

    getCurrentWorkdayDate() {
        const date = this.getCurrentDate();

        if (this.isBeforeWorkingTime(date)) {
            return new Date(date.setHours(9, 0, 0, 0));
        } else if (this.isWorkingTime(date)) {
            return date;
        }

        return this.getNextWorkday(date);
    }

    getCurrentDate() {
        return new Date();
    }

    isWorkingTime(date: Date) {
        return date.getHours() >= 9 && date.getHours() < 17;
    }

    getNextWorkday(date: Date): Date {
        const nextWeekday = new Date(new Date(date).setDate(date.getDate() + this.daysToNextWorkday(date)));
        return new Date(nextWeekday.setHours(9, 0, 0, 0));
    }

    private daysToNextWorkday(date: Date): DaysToWorkday {
        return this.isDay(WeekDay.Friday, date) ? 3 : 1;
    }

    getPreviousWorkday(date: Date): Date {
        const copy = new Date(date);
        const offsetReversed = new Date(copy.setDate(copy.getDate() - this.daysToPreviousWorkday(date)));
        const current = this.getCurrentWorkdayDate();
        return offsetReversed.getDate() === current.getDate() ? current : offsetReversed;
    }

    private daysToPreviousWorkday(date: Date): DaysToWorkday {
        return this.isDay(WeekDay.Monday, date) ? 3 : 1;
    }

    private isDay(day: WeekDay, date: Date): boolean {
        return date.getDay() === day;
    }

    isBeforeWorkingTime(date: Date): boolean {
        return date.getHours() < 9;
    }
}