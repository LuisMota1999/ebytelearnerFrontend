import React from 'react';
import {cn} from '@/lib/utils'; // Import your classnames library
import { LucideIcon } from 'lucide-react';

interface ButtonComponentProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
  Icon?: LucideIcon;
  className?: string;
}

const ButtonSidebarComponent: React.FC<ButtonComponentProps> = ({ label, onClick, isActive, Icon, className }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-green-800 bg-sky-200/20 hover:bg-sky-200/20 hover:text-green-800"
      )}
    >
      <div className={cn("flex items-center gap-x-2 py-4", className)}>
        {Icon && (
          <Icon
            size={22}
            className={cn("text-slate-500", isActive && "text-green-800")}
          />
        )}
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-green-800 h-full py-6 transition-all", 
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default ButtonSidebarComponent;
