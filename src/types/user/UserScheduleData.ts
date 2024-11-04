import { Shift } from "../schedule/Schedule";

interface UserScheduleData {
    shifts: Shift[];
    workHours: {
      total: number;
      remaining: number;
    };
    notifications?: Array<{
      message: string;
      type: string;
    }>;
  }

export default UserScheduleData;