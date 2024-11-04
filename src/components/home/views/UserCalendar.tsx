import { useMemo, useCallback } from 'react';
import { parseDate } from '@/services';
import { Shift } from '@/types';
import BaseCalendar from '@/components/common/BaseCalendar';
import moment from 'moment';

interface UserCalendarProps {
  date: Date;
  shifts: Shift[];
}

const UserCalendar = ({ shifts, date }: UserCalendarProps) => {
  const events = useMemo(() => {
    const events = shifts.map((shift) => {
      return {
        title: shift.user.name,
        start: parseDate(shift.date),
        end: parseDate(shift.date),
        allDay: true
      };
    }).flat();
    return [...events];
  }, [shifts]);


  const dayPropGetter = useCallback((date: Date) => {
    const dateStr = moment(date).format('YYYY-MM-DD');
    const isCallShift = shifts.some(shift => 
      shift.date === dateStr && 
      shift.shiftType.name === "On-Call" // TODO: figure out how to use the enum
      // shift.shiftType.name === ShiftTypeEnum.OnCall
    );

    if (isCallShift) {
      return {
        style: {
          backgroundColor: '#f3e5f5',
          border: '1px solid #9c27b0'
        }
      };
    }
    return {};
  }, [shifts]);

  return (
    <BaseCalendar
      events={events}
      date={date}
      dayPropGetter={dayPropGetter}
    />
  );
};

export default UserCalendar;