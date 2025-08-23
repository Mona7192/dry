
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('لطفاً ایمیل و رمز عبور را وارد کنید');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('ورود با موفقیت انجام شد');
        router.push('/dashboard'); // تغییر مسیر به داشبورد یا صفحه مورد نظر
      } else {
        setError('ایمیل یا رمز عبور اشتباه است');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" dir="rtl">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">ورود</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
        <div className="mb-4">
          <label className="block text-gray-700">رمز عبور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="رمز عبور خود را وارد کنید"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          ورود
        </button>
        <p className="text-center mt-4">
          حساب کاربری ندارید؟{' '}
          <Link href="/register" className="text-blue-500">
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
}
