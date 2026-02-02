'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const BookingList = ({ refreshTrigger }: { refreshTrigger?: number }) => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, [refreshTrigger]);

    const fetchBookings = async () => {
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('use_date', { ascending: true })
            .order('use_time', { ascending: true }); // 날짜, 시간 순 정렬

        if (data) setBookings(data);
        setLoading(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-stage-gold rounded-full inline-block"></span>
                현재 예약 현황
            </h2>

            <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-zinc-950/50 text-zinc-400 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">사용 날짜/시간</th>
                                <th className="px-6 py-4 font-semibold">학년반</th>
                                <th className="px-6 py-4 font-semibold text-right">상태</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {loading ? (
                                <tr><td colSpan={3} className="px-6 py-12 text-center text-zinc-500">데이터를 불러오는 중...</td></tr>
                            ) : bookings.length === 0 ? (
                                <tr><td colSpan={3} className="px-6 py-12 text-center text-zinc-500">등록된 예약이 없습니다.</td></tr>
                            ) : (
                                bookings.map((b) => (
                                    <tr key={b.id} className="transition-colors hover:bg-zinc-800/30">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{b.use_date}</div>
                                            <div className="text-xs text-zinc-500">{b.use_time}</div>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-300">
                                            {b.grade_class}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${b.status === 'approved' ? 'bg-stage-neon-green/10 text-stage-neon-green' :
                                                    b.status === 'rejected' ? 'bg-stage-neon-red/10 text-stage-neon-red' :
                                                        'bg-zinc-800 text-zinc-400'
                                                }`}>
                                                {b.status === 'approved' ? '예약확정' : b.status === 'rejected' ? '취소됨' : '승인대기'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
