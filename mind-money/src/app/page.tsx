import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col">
      <div className="flex-1 w-full">
        <ChatInterface />
      </div>
    </main>
  );
}