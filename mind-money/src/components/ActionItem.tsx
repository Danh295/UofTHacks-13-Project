'use client';

import React from 'react';
import { CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

// Define the shape of an Action Item (matches your FinancialContext)
interface ActionItemProps {
  item: {
    id: string;
    action: string;
    deadline?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    expected_impact?: string;
    isCompleted?: boolean;
    category?: string;
  };
  onToggle: (id: string) => void;
}

export function ActionItem({ item, onToggle }: ActionItemProps) {
  return (
    <div 
      className={clsx(
        "group flex items-start gap-4 p-5 rounded-2xl border transition-all duration-200 hover:shadow-md cursor-pointer",
        item.isCompleted 
          ? "bg-[var(--neutral)]/30 border-[var(--border)] opacity-70" 
          : "bg-white border-[var(--border)] hover:border-[var(--primary)]"
      )}
      onClick={() => onToggle(item.id)}
    >
      {/* Checkbox Icon */}
      <button 
        className={clsx(
          "mt-1 flex-shrink-0 transition-colors",
          item.isCompleted ? "text-[var(--success)]" : "text-[var(--text-light)] group-hover:text-[var(--primary)]"
        )}
      >
        {item.isCompleted ? <CheckCircle2 size={22} /> : <Circle size={22} />}
      </button>

      {/* Content */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className={clsx(
            "font-semibold text-base mb-1 transition-all",
            item.isCompleted ? "text-[var(--text-secondary)] line-through decoration-[var(--border)]" : "text-[var(--text-primary)]"
          )}>
            {item.action}
          </h4>
          
          {/* Difficulty Badge */}
          {item.difficulty && !item.isCompleted && (
            <span className={clsx(
              "text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wide",
              item.difficulty === 'easy' ? "bg-[var(--success)]/10 text-[var(--success)]" :
              item.difficulty === 'medium' ? "bg-[var(--secondary)]/20 text-[var(--text-primary)]" :
              "bg-[var(--danger)]/10 text-[var(--danger)]"
            )}>
              {item.difficulty}
            </span>
          )}
        </div>

        <p className="text-sm text-[var(--text-secondary)] mb-3 leading-relaxed">
          {item.expected_impact || "Improve your financial health."}
        </p>

        {/* Footer: Deadline & Category */}
        <div className="flex items-center gap-4 text-xs text-[var(--text-light)]">
          {item.deadline && (
            <div className="flex items-center gap-1.5 bg-[var(--neutral)] px-2 py-1 rounded-md">
              <Clock size={12} />
              <span className="font-medium">{item.deadline}</span>
            </div>
          )}
          
          {item.category && (
            <span className="uppercase tracking-wider font-semibold opacity-60">
              {item.category}
            </span>
          )}
        </div>
      </div>

      {/* Hover Arrow (Only if not completed) */}
      {!item.isCompleted && (
        <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
          <ArrowRight size={18} className="text-[var(--primary)]" />
        </div>
      )}
    </div>
  );
}