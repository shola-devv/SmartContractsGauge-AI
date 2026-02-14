"use client";

import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-lg p-6 w-full max-w-md shadow-xl">
        <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Get started</h3>
        <p className="text-sm text-slate-600 dark:text-gray-400 mb-4">This is a placeholder auth modal. Replace with your auth UI.</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-100 dark:bg-slate-800">Close</button>
          <button onClick={onClose} className="px-4 py-2 rounded bg-blue-600 text-white">Sign in (placeholder)</button>
        </div>
      </div>
    </div>
  );
}
