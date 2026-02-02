import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) => {
    const variants = {
        primary: 'bg-stage-gold text-background hover:bg-yellow-400 font-bold shadow-[0_0_15px_rgba(255,215,0,0.3)]',
        secondary: 'bg-zinc-800 text-white hover:bg-zinc-700',
        outline: 'border border-stage-gold text-stage-gold hover:bg-stage-gold/10',
        ghost: 'text-white hover:bg-white/10',
        danger: 'bg-stage-neon-red text-white hover:bg-red-600 shadow-[0_0_10px_rgba(255,49,49,0.3)]',
        success: 'bg-stage-neon-green text-background hover:bg-green-400 font-bold shadow-[0_0_10px_rgba(57,255,20,0.3)]',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-md transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input = ({ label, className, ...props }: InputProps) => {
    return (
        <div className="space-y-1 w-full">
            {label && <label className="text-sm font-medium text-zinc-400">{label}</label>}
            <input
                className={cn(
                    'w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-stage-gold focus:ring-1 focus:ring-stage-gold transition-all',
                    className
                )}
                {...props}
            />
        </div>
    );
};
