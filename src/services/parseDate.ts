import moment from 'moment';

const parseDate = (dateString: string) : Date => {
    // Extract just the YYYY-MM-DD portion
    const datePart = dateString.split('T')[0];
    return moment(datePart).toDate();
}

export default parseDate;