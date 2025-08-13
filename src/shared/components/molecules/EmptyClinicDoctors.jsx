import React, { memo } from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import { ReactComponent as NotFoundIcon } from '../../assets/icons/NotFound.svg';
import EmptyState from '../atoms/EmptyState';

const EmptyClinicDoctors = memo(() => {
  const { t } = useTranslation();
  return (
    <EmptyState
      icon={<NotFoundIcon />}
      title={t('clinics.doctorsNotFound') || 'Врачи данной клиники не найдены'}
    />
  );
});

export default EmptyClinicDoctors;


