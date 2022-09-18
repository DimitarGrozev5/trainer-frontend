import { add } from 'date-fns';
import React, { useState } from 'react';
import { getMonthName } from '../../util/date';
import OverlayModal from '../UI-elements/OverlayModal/OverlayModal';
import styles from './Calendar.module.css';
import CalendarHeader from './CalendarHeader/CalendarHeader';
import CalendarDecadeView from './DecadeView/CalendarDecadeView';
import CalendarMonthView from './MonthView/CalendarMonthView';
import CalendarYearView from './YearView/CalendarYearView';

interface Props {
  selectedDate: Date;
  onChangeDate: (num: Date) => void;
}

type CalendarView = 'month' | 'year' | 'dacade';

const Calendar: React.FC<Props> = ({ selectedDate, onChangeDate }) => {
  // Handle YearView Modal
  const [yearModal, setYearModal] = useState(false);

  // Calendar view mode
  const [viewMode, setViewMode] = useState<CalendarView>('month');

  const [targetDate, setTargetDate] = useState(new Date());

  const changePeriod = (ammount: string) => (direction: 1 | -1) => () => {
    const a = ammount === 'dacade' ? 'years' : ammount;
    const d = ammount === 'dacade' ? direction * 10 : direction;

    const newDate: Date = add(targetDate, { [a]: d });
    setTargetDate(newDate);
  };
  const setPeriodToToday = () => {
    setTargetDate(new Date());
  };

  // When you tap on Calendar Header, open modal and set view mode to year
  const openModalHandler = () => {
    setViewMode('year');
    setYearModal(true);
  };

  let title = '';
  let headerTarget: CalendarView = 'month';
  let resetValue: string = new Date().getUTCDate().toString();
  let changePeriodHandler = changePeriod('');
  let calendar = <></>;
  switch (viewMode) {
    case 'year':
      title = targetDate.getUTCFullYear().toString();
      headerTarget = 'dacade';
      resetValue = new Date().getUTCFullYear().toString().substring(2);
      changePeriodHandler = changePeriod('years');
      calendar = (
        <CalendarYearView
          targetDate={targetDate}
          setTargetDate={(target: Date) => {
            setYearModal(false);
            setTargetDate(target);
          }}
        />
      );
      break;

    case 'dacade':
      title = `${targetDate.getUTCFullYear() - 5} - ${
        targetDate.getUTCFullYear() + 5
      }`;
      headerTarget = 'dacade';
      resetValue = new Date().getUTCFullYear().toString().substring(2);
      changePeriodHandler = changePeriod('dacade');
      calendar = (
        <CalendarDecadeView
          targetDate={targetDate}
          setTargetDate={(target: Date) => {
            setViewMode('year');
            setTargetDate(target);
          }}
        />
      );
      break;

    default:
      break;
  }

  return (
    <>
      <OverlayModal show={yearModal} onClose={setYearModal.bind(null, false)}>
        <div className={styles['calendar-container']}>
          <CalendarHeader
            title={title}
            resetValue={resetValue}
            onChnagePeriod={changePeriodHandler}
            onPeriodToToday={setPeriodToToday}
            onChangeViewMode={setViewMode.bind(null, headerTarget)}
          />
          {calendar}
        </div>
      </OverlayModal>
      <div className={styles['calendar-container']}>
        <CalendarHeader
          title={`${getMonthName(targetDate)} ${targetDate.getUTCFullYear()}`}
          resetValue={new Date().getUTCDate().toString()}
          onChnagePeriod={changePeriod('months')}
          onPeriodToToday={setPeriodToToday}
          onChangeViewMode={openModalHandler}
        />
        <CalendarMonthView
          targetDate={targetDate}
          selectedDate={selectedDate}
          setSelectedDate={onChangeDate}
        />
      </div>
    </>
  );
};

export default Calendar;
