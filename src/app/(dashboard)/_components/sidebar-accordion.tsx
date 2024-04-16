import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { LucideIcon } from "lucide-react";
import ButtonSidebarComponent from "./sidebar-button";
import { useRouter } from "next/navigation";

interface AccordionComponentProps {
  label: string;
  itemChildren: {
    href?: string;
    label?: string;
    icon?: LucideIcon;
  }[];
  isActive: boolean;
  onClick: () => void;
  currentSelectedItem: string;
  Icon?: LucideIcon;
}

const AccordionSidebarComponent: React.FC<AccordionComponentProps> = ({
  label,
  itemChildren,
  isActive,
  onClick,
  currentSelectedItem,
  Icon,
}) => {
  const router = useRouter();
  const [activeChild, setActiveChild] = useState<number | null>(null);

  const onChildrenClick = (hrefChildren: string, index: number) => () => {
    router.push(hrefChildren);
    setActiveChild(index == activeChild ? activeChild : index);
    
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem onClick={onClick} value={label} className="border-b-0" >
        <AccordionTrigger
          className={cn(
            "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
            isActive &&
              "text-green-800 bg-sky-200/20 hover:bg-sky-200/20 hover:text-green-800"
          )}
        >
          <div className="flex items-center gap-x-2">
            {Icon && (
              <Icon
                size={22}
                className={cn("text-slate-500", isActive && "text-green-800")}
              />
            )}
            {label}
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          <div className="flex flex-col ">
            {itemChildren.map((child, index) => (
              <ButtonSidebarComponent
                key={index}
                label={child.label || ""}
                onClick={onChildrenClick(child.href ? child.href : "", index)}
                isActive={index === activeChild}
                Icon={child.icon}
                className="px-4 text-sm"
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionSidebarComponent;
