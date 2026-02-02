'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button, Input } from '@/components/ui-base';
import { Search, Check, X as Close, Trash2, Edit2, LogOut } from 'lucide-react';
import { Modal } from '@/components/Modal';

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [bookings, setBookings] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // 간이 로그인 처리
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin') {
            setIsLoggedIn(true);
            fetchBookings();
        } else {
            alert('비밀번호가 틀렸습니다.');
        }
    };

    const fetchBookings = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setBookings(data);
        setLoading(false);
    };

    const updateStatus = async (id: number, status: string) => {
        const { error } = await supabase
            .from('bookings')
            .update({ status })
            .eq('id', id);

        if (!error) fetchBookings();
    };

    const deleteBooking = async (id: number) => {
        if (confirm('정말 삭제하시겠습니까?')) {
            const { error } = await supabase
                .from('bookings')
                .delete()
                .eq('id', id);

            if (!error) fetchBookings();
        }
    };

    const filteredBookings = bookings.filter(b =>
        b.student_name.includes(searchTerm) ||
        b.grade_class.includes(searchTerm) ||
        b.use_date.includes(searchTerm)
    );

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background px-4">
                <div className="w-full max-w-sm p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-stage-gold mb-6 text-center italic">ADMIN LOGIN</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            label="관리자 비밀번호"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••"
                        />
                        <Button type="submit" className="w-full">로그인</Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-black text-stage-gold">관리자 대시보드</h1>
                        <p className="text-zinc-500">시청각실 예약 내역을 관리합니다.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <Input
                                placeholder="학생 이름, 학급, 날짜..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="ghost" onClick={() => setIsLoggedIn(false)} title="로그아웃">
                            <LogOut size={20} />
                        </Button>
                    </div>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-zinc-950/50 text-zinc-400 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">사용 날짜/시간</th>
                                    <th className="px-6 py-4 font-semibold">학년반/이름</th>
                                    <th className="px-6 py-4 font-semibold">연락처</th>
                                    <th className="px-6 py-4 font-semibold">인원</th>
                                    <th className="px-6 py-4 font-semibold">상태</th>
                                    <th className="px-6 py-4 font-semibold text-right">작업</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {loading ? (
                                    <tr><td colSpan={6} className="px-6 py-12 text-center text-zinc-500">데이터를 불러오는 중...</td></tr>
                                ) : filteredBookings.length === 0 ? (
                                    <tr><td colSpan={6} className="px-6 py-12 text-center text-zinc-500">예약 내역이 없습니다.</td></tr>
                                ) : (
                                    filteredBookings.map((b) => (
                                        <tr key={b.id} className={`transition-colors hover:bg-zinc-800/30 ${b.status === 'approved' ? 'border-l-4 border-stage-neon-green bg-green-950/5' :
                                            b.status === 'rejected' ? 'border-l-4 border-stage-neon-red bg-red-950/5' : ''
                                            }`}>
                                            <td className="px-6 py-4">
                                                <div className="font-medium">{b.use_date}</div>
                                                <div className="text-xs text-zinc-500">{b.use_time}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-white">{b.student_name}</div>
                                                <div className="text-xs text-zinc-500">{b.grade_class}</div>
                                            </td>
                                            <td className="px-6 py-4 text-zinc-400">{b.phone_number}</td>
                                            <td className="px-6 py-4 text-zinc-400">{b.participants}명</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${b.status === 'approved' ? 'bg-stage-neon-green/10 text-stage-neon-green' :
                                                    b.status === 'rejected' ? 'bg-stage-neon-red/10 text-stage-neon-red' :
                                                        'bg-zinc-800 text-zinc-400'
                                                    }`}>
                                                    {b.status === 'approved' ? '승인됨' : b.status === 'rejected' ? '반려됨' : '대기중'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="p-1 h-auto text-stage-neon-green hover:bg-stage-neon-green/10"
                                                        onClick={() => updateStatus(b.id, 'approved')}
                                                    >
                                                        <Check size={18} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="p-1 h-auto text-stage-neon-red hover:bg-stage-neon-red/10"
                                                        onClick={() => updateStatus(b.id, 'rejected')}
                                                    >
                                                        <Close size={18} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="p-1 h-auto text-zinc-500 hover:bg-white/5"
                                                        onClick={() => deleteBooking(b.id)}
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
