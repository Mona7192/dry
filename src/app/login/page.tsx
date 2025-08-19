"use client"
// pages/login.tsx
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirectTo = router.query.redirect || '/'; // مسیر پیش‌فرض

  const handleLogin = async () => {
    // فرض کن یه fetch به بک‌اند داری
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      // ذخیره توکن یا session
      const data = await res.json();
      localStorage.setItem('token', data.token);

      // ریدایرکت به مسیر ذخیره شده
      router.push(redirectTo as string);
    } else {
      alert('Login failed');
    }
  };

  return (
    <div>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
