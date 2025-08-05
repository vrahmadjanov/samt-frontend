import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CalendarIcon } from '../../assets/icons/Calendar.svg';
import { useTranslation } from '../../i18n/useTranslation';

const DateTimeContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  margin-bottom: var(--spacing-md);
  width: fit-content;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 16px;
    height: 16px;
    display: block;
  }
`;

const DateTimeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const DateText = styled.span`
  font-size: var(--font-sm);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
`;

const TimeText = styled.span`
  font-size: var(--font-sm);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
`;

const formatTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString('ru-RU', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

const formatDate = (dateTimeString, t) => {
  const date = new Date(dateTimeString);
  const day = date.getDate();
  const month = date.getMonth();
  
  const monthNames = {
    0: t('months.january'),
    1: t('months.february'),
    2: t('months.march'),
    3: t('months.april'),
    4: t('months.may'),
    5: t('months.june'),
    6: t('months.july'),
    7: t('months.august'),
    8: t('months.september'),
    9: t('months.october'),
    10: t('months.november'),
    11: t('months.december')
  };
  
  return `${day} ${monthNames[month]}`;
};

const DateTimeDisplay = ({ startTime, endTime, className }) => {
  const { t } = useTranslation();
  const startTimeFormatted = formatTime(startTime);
  const endTimeFormatted = formatTime(endTime);
  const dateFormatted = formatDate(startTime, t);

  return (
    <DateTimeContainer className={className}>
      <IconWrapper>
        <CalendarIcon />
      </IconWrapper>
      <DateTimeInfo>
        <DateText>{dateFormatted}</DateText>
        <TimeText>
          {startTimeFormatted} - {endTimeFormatted}
        </TimeText>
      </DateTimeInfo>
    </DateTimeContainer>
  );
};

export default DateTimeDisplay; 