import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as string) ?? '';

      switch (true) {
        case theme.endsWith('blue'):
          import('@expo-webview-kit/ui/globals.css');
          break;
        case theme.endsWith('dark'):
          import('@expo-webview-kit/ui/dark.css');
          break;
        default:
          import('@expo-webview-kit/ui/globals.css');
          break;
      }

      return Story();
    },
    withThemeByClassName({
      themes: {
        'light-blue': 'light',
        'dark-blue': 'dark',
        'light-dark': 'light',
        'dark-dark': 'dark',
      },
      defaultTheme: 'light-blue',
    }),
  ],
};

export default preview;
