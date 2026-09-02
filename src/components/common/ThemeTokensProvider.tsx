import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export const ThemeTokensProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useCMS();
  const { brandTokens } = state;

  useEffect(() => {
    if (!brandTokens) return;

    const root = document.documentElement;
    const { colors, neon, typography, style } = brandTokens;

    // 1. Color variables
    root.style.setProperty('--brand-primary', colors.primary);
    root.style.setProperty('--brand-primary-hover', colors.primaryHover);
    root.style.setProperty('--brand-secondary', colors.secondary);
    root.style.setProperty('--brand-bg-dark', colors.bgDark);
    root.style.setProperty('--brand-bg-light', colors.bgLight);
    root.style.setProperty('--text-primary', colors.textPrimary);
    root.style.setProperty('--text-muted', colors.textMuted);
    root.style.setProperty('--border-color', colors.border);
    root.style.setProperty('--surface-color', colors.surface);
    root.style.setProperty('--surface-hover', colors.surfaceHover);

    // 2. Neon / Glow variables
    if (neon.enabled) {
      const alpha = (neon.intensity / 100).toFixed(2);
      root.style.setProperty('--neon-primary', colors.primary);
      root.style.setProperty('--neon-glow-alpha', alpha);
      root.style.setProperty('--neon-glow-hero', neon.heroGlow ? '1' : '0');
      root.style.setProperty('--neon-glow-buttons', neon.buttonGlow ? '1' : '0');
      root.style.setProperty('--neon-glow-cards', neon.cardGlow ? '1' : '0');
      root.style.setProperty('--neon-glow-lines', neon.lineGlow ? '1' : '0');
    } else {
      root.style.setProperty('--neon-glow-alpha', '0');
      root.style.setProperty('--neon-glow-hero', '0');
      root.style.setProperty('--neon-glow-buttons', '0');
      root.style.setProperty('--neon-glow-cards', '0');
      root.style.setProperty('--neon-glow-lines', '0');
    }

    // 3. Typography
    root.style.setProperty('--font-heading', `"${typography.headingFont}", sans-serif`);
    root.style.setProperty('--font-body', `"${typography.bodyFont}", sans-serif`);
    root.style.setProperty('--font-h1-size', typography.h1Size || '3.5rem');
    root.style.setProperty('--font-h2-size', typography.h2Size || '2.5rem');
    root.style.setProperty('--font-h3-size', typography.h3Size || '1.75rem');

    // 4. Style & Radius
    root.style.setProperty('--radius-base', `${style.borderRadius}px`);
    root.style.setProperty('--radius-button', `${style.buttonRadius}px`);
    root.style.setProperty('--radius-card', `${style.cardRadius}px`);

    // Dynamically load Google Font if needed
    const fontsToLoad = [typography.headingFont, typography.bodyFont].filter(
      (f, i, arr) => arr.indexOf(f) === i && f !== 'system-ui'
    );

    fontsToLoad.forEach(fontName => {
      const fontId = `google-font-${fontName.replace(/\s+/g, '-').toLowerCase()}`;
      if (!document.getElementById(fontId)) {
        const link = document.createElement('link');
        link.id = fontId;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;500;600;700;800;900&display=swap`;
        document.head.appendChild(link);
      }
    });

  }, [brandTokens]);

  return <>{children}</>;
};
