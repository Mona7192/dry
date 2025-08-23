'use client';

import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError('ایمیل یا رمز عبور اشتباه است');
    } else {
      router.push(redirectUrl); // ✅ بعد لاگین برگرد به همون صفحه
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push(redirectUrl); // ✅ اگر قبلاً لاگین بودی، نذار بیای صفحه لاگین
    }
  }, [status, router, redirectUrl]);

  if (status === "loading") {
    return <p>در حال بررسی...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" dir="rtl">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">ورود</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">ایمیل</label>
            <input
              type="email"
              value={email}
              required
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
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="رمز عبور خود را وارد کنید"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>
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
