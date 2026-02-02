'use client';

import React, { useState } from 'react';
import { Button, Input } from './ui-base';
import { supabase } from '@/lib/supabase';
import { Modal } from './Modal';
import { Music, Users, Calendar, Clock, User, Phone, GraduationCap } from 'lucide-react';

export const BookingForm = ({ onSuccess }: { onSuccess?: () => void }) => {
    const [formData, setFormData] = useState({
        use_date: '',
        use_time: '',
        participants: 1,
        grade_class: '',
        student_name: '',
        phone_number: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { error } = await supabase.from('bookings').insert([formData]);

            if (error) throw error;

            setModalConfig({
                isOpen: true,
                title: '신청 완료',
                message: '예약 신청이 성공적으로 완료되었습니다! 관리자의 승인을 기다려주세요.',
            });

            setFormData({
                use_date: '',
                use_time: '',
                participants: 1,
                grade_class: '',
                student_name: '',
                phone_number: '',
            });

            if (onSuccess) onSuccess(); // 리스트 새로고침 트리거
        } catch (error: any) {
            console.error('Booking Error:', error);
            setModalConfig({
                isOpen: true,
                title: '신청 실패',
                message: '예약 신청 중 오류가 발생했습니다. 다시 시도해 주세요.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-stage-gold/10 rounded-full">
                    <Music className="text-stage-gold" size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">시청각실 예약하기</h2>
                    <p className="text-zinc-400 text-sm">무대 위 당신의 꿈을 응원합니다.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="relative">
                        <Calendar className="absolute left-3 top-9 text-zinc-500" size={18} />
                        <Input
                            label="예약 날짜"
                            name="use_date"
                            type="date"
                            required
                            className="pl-10"
                            value={formData.use_date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative">
                        <Clock className="absolute left-3 top-9 text-zinc-500" size={18} />
                        <Input
                            label="사용 시간"
                            name="use_time"
                            placeholder="예: 13:00 ~ 14:00"
                            required
                            className="pl-10"
                            value={formData.use_time}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative">
                        <Users className="absolute left-3 top-9 text-zinc-500" size={18} />
                        <Input
                            label="참가 인원"
                            name="participants"
                            type="number"
                            min="1"
                            required
                            className="pl-10"
                            value={formData.participants}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <GraduationCap className="absolute left-3 top-9 text-zinc-500" size={18} />
                        <Input
                            label="학년반"
                            name="grade_class"
                            placeholder="예: 3학년 2반"
                            required
                            className="pl-10"
                            value={formData.grade_class}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative">
                        <User className="absolute left-3 top-9 text-zinc-500" size={18} />
                        <Input
                            label="대표자 이름"
                            name="student_name"
                            placeholder="홍길동"
                            required
                            className="pl-10"
                            value={formData.student_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative">
                        <Phone className="absolute left-3 top-9 text-zinc-500" size={18} />
                        <Input
                            label="전화번호"
                            name="phone_number"
                            placeholder="010-1234-5678"
                            required
                            className="pl-10"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="md:col-span-2 pt-4">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 text-lg"
                    >
                        {isSubmitting ? '신청 중...' : '예약 신청하기'}
                    </Button>
                </div>
            </form>

            <Modal
                isOpen={modalConfig.isOpen}
                title={modalConfig.title}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
            >
                <p className="text-zinc-300 leading-relaxed">{modalConfig.message}</p>
            </Modal>
        </div>
    );
};
