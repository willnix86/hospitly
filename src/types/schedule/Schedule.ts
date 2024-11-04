import { User } from '../user/User';

// Enum representing the different types of shifts (On-Call, Vacation, etc.)
const enum ShiftTypeEnum {
    DayShift = 'Day Shift',
    NightShift = 'Night Shift',
    OnCall = 'On-Call',
    Vacation = 'Off (Vacation)',
    Admin = 'Off (Admin Day)',
    Rest = 'Off (Rest)',
    Weekend = 'Off (Weekend)',
    Available = 'Available'  // When the user has no specific shift
}

// Interface representing a ShiftType, matching the ShiftTypes table in the DB.
interface ShiftType {
    id?: number;
    name: string;        // Name of the shift type (e.g., "Day Shift", "Night Shift")
    startTime: string;   // Standard start time for this shift type
    endTime: string;     // Standard end time for this shift type
}

// Interface representing a Shift, reflecting the Shifts table in the DB.
interface Shift {
    id?: number;
    user: User;          // User assigned to this shift
    date: string;        // Date of the shift in 'YYYY-MM-DD' format
    shiftType: ShiftType; // Type of the shift (On-Call, Vacation, etc.)
    startTime: string;   // Start time of the shift
    endTime: string;     // End time of the shift
}

interface CallScheduleData {
    month: string // 'YYYY-MM' format,
    callShifts: Shift[], // includes user name
    vacationDays: Shift[],
    adminDays: Shift[]
  }  

// Schedule interface: Maps each user to a dictionary of shifts by date.
// Each user has shifts on different dates, and on each date, they may have multiple shifts.
interface Schedule {
    [userName: string]: {
        shifts: Shift[];  // Maps each date to an array of shifts for that user
    };
}

export type { ShiftTypeEnum, ShiftType, Shift, Schedule, CallScheduleData };