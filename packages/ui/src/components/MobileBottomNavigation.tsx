import type React from 'react';
import { cn } from '../utils/cn';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
}

interface Props {
  navItems: NavItem[];
  onClick: (path: string) => void;
}

export function MobileBottomNavigation({ navItems, onClick }: Props) {
  return (
    <div className={cn('w-full flex justify-center fixed bottom-0 left-0 right-0 z-50')}>
      <div className="w-full max-w-[450px] h-17 rounded-t-[1.25rem] bg-white shadow-bottom-navigation">
        <div className="grid h-full grid-cols-4 mx-auto bold">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="flex flex-col items-center justify-center"
              onClick={() => onClick(item.href)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onClick(item.href);
                }
              }}
            >
              <item.icon className="size-5" />
              <span className={cn('text-xs text-bottom-navigation mt-1', item.isActive ? 'font-bold' : 'font-medium')}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
