'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, LayoutDashboard, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function OurStoryPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Header/Navbar */}
      <div className="bg-white border-b border-[var(--border)] px-8 py-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--neutral)] transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">Our Story</h1>
              <p className="text-[var(--text-secondary)] text-sm">Meet the team behind MindMoney</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 bg-[var(--neutral)] text-[var(--text-primary)] hover:bg-[var(--neutral-dark)]"
            >
              <MessageSquare size={16} /> Chat
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white hover:shadow-md"
            >
              <LayoutDashboard size={16} /> Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          {/* Team Photo Section */}
          <div className="bg-white rounded-2xl border border-[var(--border)] shadow-lg p-8 mb-8">
            <div className="flex flex-col items-center">
              {/* Image Placeholder */}
              <div className="w-full max-w-2xl aspect-video bg-gradient-to-br from-[var(--neutral)] to-[var(--secondary-light)] rounded-xl border-2 border-dashed border-[var(--border)] flex items-center justify-center mb-6">
                <div className="text-center p-8">
                  <div className="text-4xl mb-4">📸</div>
                  <p className="text-[var(--text-secondary)] font-medium">Team Photo</p>
                  <p className="text-xs text-[var(--text-light)] mt-2">Paste your group photo here</p>
                </div>
              </div>
              
              {/* Team Name */}
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2 text-center bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                [Team Name TBD]
              </h2>
              
              <p className="text-sm text-[var(--text-secondary)] text-center">
                UofTHacks 13 • January 2026
              </p>
            </div>
          </div>

          {/* Story Section */}
          <div className="bg-white rounded-2xl border border-[var(--border)] shadow-lg p-8">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              About Our Team
            </h3>
            
            <div className="prose prose-slate max-w-none">
              <p className="text-[var(--text-primary)] leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <p className="text-[var(--text-primary)] leading-relaxed mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              <p className="text-[var(--text-primary)] leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-[var(--secondary-light)] to-[var(--neutral)] rounded-lg border border-[var(--border)]">
                <p className="text-sm text-[var(--text-secondary)] italic text-center">
                  "TBD - Add team quote or mission statement here"
                </p>
              </div>
            </div>
          </div>

          {/* Back to Chat CTA */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <MessageSquare size={18} />
              Start Chatting with MindMoney
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
