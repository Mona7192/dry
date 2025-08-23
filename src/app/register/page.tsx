
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // 1: ایمیل، 2: کد تأیید و رمز
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSendCode = async () => {
    if (!email) {
      setError('لطفاً ایمیل خود را وارد کنید');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('کد تأیید به ایمیل شما ارسال شد');
        setStep(2);
      } else {
        setError('خطا در ارسال کد تأیید');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    }
  };

  const handleRegister = async () => {
    if (!code || !password) {
      setError('لطفاً کد تأیید و رمز عبور را وارد کنید');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, password }),
      });

      if (response.ok) {
        alert('ثبت‌نام با موفقیت انجام شد');
        router.push('/login');
      } else {
        setError('خطا در ثبت‌نام');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" dir="rtl">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {step === 1 ? 'ثبت‌نام' : 'تأیید ایمیل'}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {step === 1 ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">ایمیل</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="ایمیل خود را وارد کنید"
              />
            </div>
            <button
              onClick={handleSendCode}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              ارسال کد تأیید
            </button>
            <p className="text-center mt-4">
              قبلاً ثبت‌نام کرده‌اید؟{' '}
              <Link href="/login" className="text-blue-500">
                وارد شوید
              </Link>
            </p>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">کد تأیید</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="کد تأیید را وارد کنید"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">رمز عبور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="رمز عبور جدید"
              />
            </div>
            <button
              onClick={handleRegister}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              تأیید و ثبت‌نام
            </button>
            <p className="text-center mt-4">
              <button onClick={() => setStep(1)} className="text-blue-500">
                بازگشت به ثبت‌نام
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
