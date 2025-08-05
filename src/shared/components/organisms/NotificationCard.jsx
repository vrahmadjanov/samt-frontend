import React, { memo } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { Card, CardTopRow, CardInfo, CardFooter } from '../atoms/Card';
import Button from '../atoms/Button';
import DateTimeDisplay from '../atoms/DateTimeDisplay';
import InfoBadge from '../molecules/InfoBadge';
import Badges from '../atoms/Badges';
import MessageIconComponent from '../atoms/MessageIcon';
import { ReactComponent as ReadIcon } from '../../assets/icons/Read.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/Trash.svg';



const NotificationTitle = styled.div`
  font-size: var(--font-lg);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: var(--spacing-xs);
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
`;

const ReadButton = styled.button`
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0;
  cursor: pointer;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transition.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.hover.surface};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 20px;
    height: 20px;
    display: block;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const DeleteButton = styled.button`
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0;
  cursor: pointer;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transition.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.hover.surface};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 20px;
    height: 20px;
    display: block;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;



const NotificationCard = memo(({ notification, onMarkAsRead, onNavigate, onDelete }) => {
  const { t } = useTranslation();

  const handleMarkAsRead = () => {
    if (!notification.is_read) {
      onMarkAsRead([notification.id]);
    }
  };

  const handleNavigate = () => {
    if (notification.url) {
      onNavigate(notification.url);
    }
  };

  const handleDelete = () => {
    if (window.confirm(t('notifications.confirmDelete'))) {
      onDelete(notification.id);
    }
  };

  return (
    <Card>
      <CardTopRow>
        <MessageIconComponent />
        <CardInfo>
          <NotificationTitle>{notification.title}</NotificationTitle>
          <Badges>
            <InfoBadge style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
              {notification.notification_type?.name || t('notifications.unknownType')}
            </InfoBadge>
          </Badges>
          <DateTimeDisplay 
            startTime={notification.created_at}
            endTime={null}
            showTime={true}
          />
        </CardInfo>
      </CardTopRow>
      
      <CardFooter>
        <DeleteButton onClick={handleDelete} title={t('notifications.delete')}>
          <TrashIcon />
        </DeleteButton>
        {!notification.is_read && (
          <ReadButton onClick={handleMarkAsRead} title={t('notifications.markAsRead')}>
            <ReadIcon />
          </ReadButton>
        )}
        {notification.url && (
          <Button onClick={handleNavigate}>
            {t('notifications.view')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}, (prevProps, nextProps) => {
  // Кастомная функция сравнения для оптимизации
  return (
    prevProps.notification.id === nextProps.notification.id &&
    prevProps.notification.is_read === nextProps.notification.is_read
  );
});

export default NotificationCard; 