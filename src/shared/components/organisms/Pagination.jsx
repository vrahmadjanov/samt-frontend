import React, { memo } from 'react';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
  justify-content: center;
  align-items: center;
  margin: var(--spacing-lg) 0;
`;

const PagesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-sm);
  justify-content: center;
  align-items: center;
`;

const PageButton = styled.button`
  background: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.gray[200]};
  color: ${({ $active, theme }) => $active ? theme.colors.white : theme.colors.text};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 8px 14px;
  font-size: var(--font-base);
  font-weight: 500;
  cursor: pointer;
  min-width: 36px;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover || theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Pagination = memo(({ page, totalPages, onPage }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 2) {
      pages.push(i);
    } else if (
      (i === page - 3 && page > 4) ||
      (i === page + 3 && page < totalPages - 3)
    ) {
      pages.push('...');
    }
  }

  return (
    <PaginationWrapper>
      <PagesRow>
        {pages.map((p, idx) =>
          p === '...'
            ? <span key={`ellipsis-${idx}`} style={{ minWidth: 24, textAlign: 'center' }}>...</span>
            : <PageButton key={`page-${p}`} $active={p === page} onClick={() => onPage(p)}>{p}</PageButton>
        )}
      </PagesRow>
    </PaginationWrapper>
  );
}, (prevProps, nextProps) => {
  // Кастомная функция сравнения для оптимизации
  return (
    prevProps.page === nextProps.page &&
    prevProps.totalPages === nextProps.totalPages
  );
});

export default Pagination; 