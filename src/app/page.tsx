'use client';

import { BookingForm } from "@/components/BookingForm";
import { BookingList } from "@/components/BookingList";
import { Mic2, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* 배경 조명 효과 */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-stage-gold/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-stage-gold/5 blur-[100px] rounded-full pointer-events-none" />

      {/* 관리자 로그인 버튼 */}
      <div className="absolute top-6 right-6 z-50">
        <Link
          href="/admin"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 backdrop-blur border border-zinc-800 text-zinc-400 text-xs hover:text-white hover:border-stage-gold transition-all duration-300 group"
        >
          <LockKeyhole size={14} className="group-hover:text-stage-gold transition-colors" />
          <span>Admin</span>
        </Link>
      </div>

      {/* 헤더 섹션 */}
      <div className="relative z-10 pt-20 pb-12 px-4 text-center">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stage-neon-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-stage-neon-green"></span>
          </span>
          <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">On-Air Now</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
          <span className="text-white">ON-AIR</span>{" "}
          <span className="text-stage-gold gold-glow italic">DUNSAN</span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
          대전둔산중학교 시청각실 예약 시스템. <br />
          당신의 끼와 재능을 펼칠 완벽한 무대가 여기 있습니다.
        </p>

        <div className="flex justify-center gap-4 mb-20 hidden md:flex">
          <div className="flex items-center gap-2 text-zinc-500 font-medium">
            <Mic2 size={18} className="text-stage-gold" />
            <span>마이크 완비</span>
          </div>
          <div className="w-[1px] h-6 bg-zinc-800" />
          <div className="flex items-center gap-2 text-zinc-500 font-medium">
            <Mic2 size={18} className="text-stage-gold" />
            <span>믹서 & 앰프</span>
          </div>
          <div className="w-[1px] h-6 bg-zinc-800" />
          <div className="flex items-center gap-2 text-zinc-500 font-medium">
            <Mic2 size={18} className="text-stage-gold" />
            <span>무대 조명</span>
          </div>
        </div>

        {/* 예약 현황 리스트 (먼저 보여줌) */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both mb-12">
          <BookingList refreshTrigger={refreshKey} />
        </div>

        {/* 예약 폼 */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
          <BookingForm onSuccess={() => setRefreshKey(prev => prev + 1)} />
        </div>
      </div>

      {/* 푸터 */}
      <footer className="relative z-10 py-12 px-4 border-t border-zinc-900 mt-20 text-center text-zinc-600 text-sm">
        <p>© 2026 On-Air Dunsan. All rights reserved.</p>
      </footer>
    </main>
  );
}
