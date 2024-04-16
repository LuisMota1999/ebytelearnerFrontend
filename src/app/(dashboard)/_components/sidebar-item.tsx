import { LucideIcon } from "lucide-react";

import AccordionSidebarComponent from "./sidebar-accordion";
import ButtonSidebarComponent from "./sidebar-button";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  itemChildren: SidebarItemChildrenProps[];
  onClick: () => void;
  currentSelectedItem: string;
}

interface SidebarItemChildrenProps {
  icon?: LucideIcon;
  label?: string;
  href?: string;
  
}

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  itemChildren,
  onClick,
  currentSelectedItem,
}: SidebarItemProps) => {

  const isActive =
    (currentSelectedItem  === "Dashboard" && href === "/") ||
    currentSelectedItem  === label  ||
    currentSelectedItem?.startsWith(`${href}/`);

  return (
    <>
      {itemChildren.length > 0 ? (
        <AccordionSidebarComponent
          label={label}
          itemChildren={itemChildren}
          isActive={isActive}
          onClick={onClick}
          currentSelectedItem={currentSelectedItem}
          Icon={Icon}
        />
      ) : (
        <ButtonSidebarComponent
          label={label}
          onClick={onClick}
          isActive={isActive}
          Icon={Icon}
        />
      )}
    </>
  );
};
