import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './Sidebar';
import type { Props as SidebarLayoutProps } from './SidebarLayout';
import { SidebarNavMain } from './SidebarNavMain';

interface Props extends Omit<SidebarLayoutProps, 'children' | 'activePath' | 'onClickLogout'> {}

export function AppSidebar({ logo, items, onClickMenu, ...props }: Props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              {logo}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavMain items={items} onClickMenu={onClickMenu} />
      </SidebarContent>
    </Sidebar>
  );
}
