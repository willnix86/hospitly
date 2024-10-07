import User from "../user/User";
import Vacation from "../user/Vacation";
import AdminDay from "../user/AdminDay";

interface Schedule {
    month: string;
    year: string;
    onCall: Record<string, User[]>;  // Object where keys are dates (strings) and values are arrays of resident names
    vacations: Vacation[];
    adminDays: AdminDay[];
}

export default Schedule;