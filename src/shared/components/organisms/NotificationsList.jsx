import React, { memo } from 'react';
import styled from 'styled-components';
import NotificationCard from './NotificationCard';
import { useTranslation } from '../../../shared/i18n/useTranslation';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
  margin-bottom: var(--spacing-lg);
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: var(--spacing-xl);
  color: ${({ theme }) => theme.colors.textLight};
  font-size: var(--font-base);
`;

const NotificationsList = memo(({ notifications, onMarkAsRead, onNavigate }) => {
  const { t, language } = useTranslation();
  
  if (!notifications || notifications.length === 0) {
    return (
      <EmptyMessage>
        {t('notifications.notFound')}
      </EmptyMessage>
    );
  }

  return (
    <ListContainer>
      {notifications.map(notification => (
        <NotificationCard
          key={`${notification.id}-${language}`}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onNavigate={onNavigate}
        />
      ))}
    </ListContainer>
  );
}, (prevProps, nextProps) => {
  // Кастомная функция сравнения для оптимизации
  return (
    prevProps.notifications.length === nextProps.notifications.length &&
    prevProps.notifications.every((notification, index) => 
      notification.id === nextProps.notifications[index]?.id &&
      notification.is_read === nextProps.notifications[index]?.is_read
    )
  );
});

export default NotificationsList; 