import type { LucideIcon } from 'lucide-react';
import { AppSidebar } from './AppSidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from './Breadcrumb';
import { Button } from './Button';
import { Separator } from './Separator';
import { type Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from './Sidebar';

interface NavItem {
  title: string;
  url: string;
  isActive?: boolean;
  icon?: LucideIcon;
}

export interface Props extends React.ComponentProps<typeof Sidebar> {
  logo: React.ReactNode;
  items: NavItem[];
  onClickMenu: (path: string) => void;
  onClickLogout: () => void;
  children: React.ReactNode;
}

export default function SidebarLayout({ items, children, onClickLogout, ...props }: Props) {
  const activeItem = items.find((item) => item.isActive);

  return (
    <SidebarProvider>
      <AppSidebar items={items} {...props} />
      <SidebarInset>
        <header className="sticky top-0 z-10 bg-background group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {activeItem && (
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold">{activeItem.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex-1 flex justify-end">
              <Button onClick={onClickLogout}>로그아웃</Button>
            </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
