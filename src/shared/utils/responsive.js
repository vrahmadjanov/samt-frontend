// Утилиты для адаптивных размеров
export const getResponsiveValue = (values, breakpoint) => {
  const breakpoints = {
    mobile: 0,
    tablet: 600,
    desktop: 900,
  };
  
  const currentBreakpoint = breakpoints[breakpoint] || 0;
  
  // Определяем текущий размер экрана
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  
  if (screenWidth < 600) {
    return values.mobile || values.tablet || values.desktop;
  } else if (screenWidth < 900) {
    return values.tablet || values.desktop || values.mobile;
  } else {
    return values.desktop || values.tablet || values.mobile;
  }
};

export const getFontSize = (size, theme) => {
  const sizes = theme.font.sizes;
  return getResponsiveValue({
    mobile: sizes.mobile[size],
    tablet: sizes.tablet[size],
    desktop: sizes.desktop[size],
  });
};

export const getSpacing = (size, theme) => {
  const spacing = theme.spacing.responsive;
  return getResponsiveValue({
    mobile: spacing.mobile[size],
    tablet: spacing.tablet[size],
    desktop: spacing.desktop[size],
  });
};

export const getGap = (size, theme) => {
  const gaps = theme.gap.responsive;
  return getResponsiveValue({
    mobile: gaps.mobile[size],
    tablet: gaps.tablet[size],
    desktop: gaps.desktop[size],
  });
};

// CSS-переменные для использования в styled-components
export const createResponsiveCSS = (theme) => `
  :root {
    --font-xs: ${getFontSize('xs', theme)};
    --font-sm: ${getFontSize('sm', theme)};
    --font-base: ${getFontSize('base', theme)};
    --font-lg: ${getFontSize('lg', theme)};
    --font-xl: ${getFontSize('xl', theme)};
    --font-title: ${getFontSize('title', theme)};
    --font-header: ${getFontSize('header', theme)};
    
    --spacing-xs: ${getSpacing('xs', theme)};
    --spacing-sm: ${getSpacing('sm', theme)};
    --spacing-md: ${getSpacing('md', theme)};
    --spacing-lg: ${getSpacing('lg', theme)};
    --spacing-xl: ${getSpacing('xl', theme)};
    --spacing-xxl: ${getSpacing('xxl', theme)};
    
    --gap-sm: ${getGap('sm', theme)};
    --gap-md: ${getGap('md', theme)};
    --gap-lg: ${getGap('lg', theme)};
  }
`; 