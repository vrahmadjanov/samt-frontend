export const theme = {
  colors: {
    // Основные цвета
    primary: '#2563eb',
    secondary: '#6B7280',
    accent: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    
    // Текст
    text: '#1F2937',
    textLight: '#6B7280',
    textInverse: '#FFFFFF',
    textMuted: '#9CA3AF',
    
    // Фоновые цвета для создания многослойности
    background: '#FAFAFA', // Основной фон приложения (слегка серый)
    backgroundSecondary: '#F8F9FA', // Вторичный фон
    backgroundTertiary: '#F5F6F7', // Третичный фон
    
    // Слои интерфейса (от самого светлого к более темному)
    surface: '#FFFFFF', // Основная поверхность (карточки, контент)
    surfaceElevated: '#FEFEFE', // Приподнятая поверхность
    surfaceRaised: '#FDFDFD', // Высоко приподнятая поверхность
    
    // Компоненты интерфейса - делаем белыми
    header: '#FFFFFF', // Шапка - белая
    sidebar: '#FFFFFF', // Боковое меню - белое
    card: '#FFFFFF', // Карточки
    cardHover: '#F8F9FA', // Карточки при наведении
    
    // Границы для создания разделения
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    borderSubtle: '#F9FAFB', // Очень светлая граница
    borderStrong: '#D1D5DB', // Более темная граница
    
    // Градиенты
    backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    surfaceGradient: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)',
    
    // Наложения
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.1)',
    overlaySubtle: 'rgba(0, 0, 0, 0.05)',
    
    // Базовые цвета
    white: '#FFFFFF',
    black: '#000000',
    
    // Расширенная палитра серых для создания глубины
    gray: {
      25: '#FCFCFD', // Самый светлый оттенок
      50: '#F9FAFB',
      100: '#F3F4F6',
      150: '#F0F1F3', // Дополнительный оттенок
      200: '#E5E7EB',
      250: '#E1E3E6', // Дополнительный оттенок
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    
    // Цвета для состояний
    hover: {
      primary: '#1D4ED8',
      secondary: '#4B5563',
      surface: '#F8F9FA',
    },
    
    active: {
      primary: '#1E40AF',
      secondary: '#374151',
      surface: '#F3F4F6',
    },
    
    focus: {
      primary: '#3B82F6',
      secondary: '#6B7280',
    },
  },
  font: {
    family: {
      primary: "'Montserrat', sans-serif",
      secondary: "'Montserrat', sans-serif",
      mono: "'source-code-pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace",
    },
    weight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    sizes: {
      mobile: {
        xs: '16px',
        sm: '18px',
        base: '20px',
        lg: '22px',
        xl: '26px',
        title: '32px',
        header: '2.1rem',
      },
      tablet: {
        xs: '13px',
        sm: '15px',
        base: '16px',
        lg: '20px',
        xl: '24px',
        title: '28px',
        header: '1.5rem',
      },
      desktop: {
        xs: '14px',
        sm: '16px',
        base: '18px',
        lg: '22px',
        xl: '26px',
        title: '32px',
        header: '2rem',
      },
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    responsive: {
      mobile: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        xxl: '32px',
      },
      tablet: {
        xs: '6px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '40px',
      },
      desktop: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '40px',
        xxl: '48px',
      },
    },
  },
  gap: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    responsive: {
      mobile: { sm: '8px', md: '12px', lg: '16px', },
      tablet: { sm: '12px', md: '16px', lg: '24px', },
      desktop: { sm: '16px', md: '24px', lg: '32px', },
    },
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    round: '50%',
  },
  shadow: {
    // Улучшенные тени для создания глубины
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
    // Специальные тени для компонентов
    header: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    sidebar: '2px 0 8px -2px rgba(0, 0, 0, 0.06)',
    card: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    cardHover: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
  },
  zIndex: {
    header: 1000,
    sidebar: 900,
    overlay: 800,
    modal: 1100,
  },
  breakpoints: {
    mobile: '600px',
    tablet: '900px',
    desktop: '1200px',
  },
  transition: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
  maxWidthContainer: '1200px',
  minWidthContainer: '320px',
  headerHeight: '64px',
  headerHeightMobile: '80px',
  headerMobile: '1.2rem',
}; 