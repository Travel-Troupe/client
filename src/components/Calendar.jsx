import React, {useState} from 'react'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

const CalendarRange = () => {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });
  return (
    <Calendar
      value={selectedDayRange}
      onChange={setSelectedDayRange}
      shouldHighlightWeekends
    />
  );
};

export default CalendarRange;

/*
export function Calendar(props) {
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [selectedRangeDate, setSelectedRangeDate] = useState('')

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
      setSelectedRangeDate(`${ FormattedStartDate }-${FormattedEndDate}`)
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      setSelectedRangeDate(`${ FormattedStartDate}`)
    }
    props.setdateRange(selectedRangeDate)
  }

  const minDate = new Date(); // Today
  const maxDate = new Date(2029, 6, 3);
  const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';

  const FormattedStartDate = moment(startDate).format('DD/MM/YYYY');
  const FormattedEndDate = moment(endDate).format('DD/MM/YYYY');
  return (
    <View style={styles.calendar}>
      <CalendarPicker
        startFromMonday={true}
        allowRangeSelection={true}
        minDate={minDate}
        maxDate={maxDate}
        todayBackgroundColor="#FF8C42"
        selectedDayColor="#79BFA4"
        selectedDayTextColor="#FFFFFF"
        initialDate={minDate}
        onDateChange={onDateChange}
        weekdays={['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM']}
        months={['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre']}
        previousTitle="<"
        nextTitle=">"
        width={350}
      />
    </View>
);
}

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 5,
  },
});

*/