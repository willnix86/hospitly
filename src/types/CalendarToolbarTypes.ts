export const enum CalendarNavigationAction {
    PREV = 'PREV',
    NEXT = 'NEXT',
    TODAY = 'TODAY',
}

export interface CalendarToolbarProps {
    date: Date;
    onNavigate: (action: CalendarNavigationAction) => void;
}
  