// src/app/page.tsx
import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
              M
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">MindMoney</h1>
          </div>
          <div className="flex gap-4 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> System Online</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <ChatInterface />
    </main>
  );
}