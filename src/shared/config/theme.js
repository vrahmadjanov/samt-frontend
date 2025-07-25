export const theme = {
  colors: {
    primary: '#3b82f6', // основной синий
    primaryHover: '#2563eb',
    background: '#f9fafb',
    backgroundGradient: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
    white: '#fff',
    text: '#1f2937',
    textSecondary: '#4b5563',
    border: '#d1d5db',
    error: '#ef4444',
    disabled: '#9ca3af',
    label: '#444',
    overlay: 'rgba(31, 41, 55, 0.35)',
  },
  radii: {
    md: '8px',
    lg: '16px',
    round: '50%',
  },
  font: {
    base: '14px',
    title: '22px',
    header: '2rem',
    headerMobile: '1.2rem',
    weightBold: 700,
    weightNormal: 400,
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '40px',
  },
  gap: {
    md: '16px',
    lg: '24px',
  },
  shadow: '0 8px 16px rgba(0, 0, 0, 0.06)',
  maxWidthContainer: '1200px', // Оптимально для десктопа (1140-1200px)
  minWidthContainer: '320px', // Минимальная ширина для мобильных
  headerHeight: '64px',
  headerHeightMobile: '48px',
  footerHeight: '56px',
  zIndex: {
    header: 100,
    sidebar: 110,
    overlay: 120,
    modal: 200,
  },
  breakpoints: {
    mobile: '600px',
    tablet: '900px',
    desktop: '1200px',
  },
  transition: {
    fast: '0.2s cubic-bezier(.4,0,.2,1)',
    normal: '0.35s cubic-bezier(.4,0,.2,1)',
  },
}; 