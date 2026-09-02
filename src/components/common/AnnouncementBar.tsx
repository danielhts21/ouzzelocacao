import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Megaphone, ArrowRight } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { state } = useCMS();
  const announcement = state.announcements?.[0];

  if (!announcement || !announcement.active || !announcement.text) {
    return null;
  }

  return (
    <div
      className="w-full py-2.5 px-4 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center relative z-40 border-b border-red-500/20"
      style={{
        backgroundColor: announcement.bgColor || '#DC2626',
        color: announcement.textColor || '#FFFFFF',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center flex-wrap">
        <Megaphone className="w-4 h-4 shrink-0 animate-pulse" />
        <span>{announcement.text}</span>
        {announcement.link && (
          <a
            href={announcement.link}
            className="inline-flex items-center gap-1 underline font-semibold hover:opacity-80 transition-opacity ml-1"
          >
            {announcement.linkText || 'Saiba mais'}
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};
