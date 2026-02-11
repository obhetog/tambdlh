import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      toast.success('Login berhasil!');
      navigate('/dashboard');
    } else {
      toast.error('Email atau password salah');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-hero-gradient items-center justify-center p-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-md text-primary-foreground">
          <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center mb-8">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-4">SiTrackIzin</h1>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Sistem Informasi Tracking Dokumen Perizinan untuk sektor pertambangan dan lingkungan hidup.
          </p>
          <div className="mt-10 space-y-3 text-sm text-primary-foreground/60">
            <p>Demo accounts:</p>
            <p>• admin@perizinan.go.id (Admin)</p>
            <p>• user@tambang.co.id (Pelaku Usaha)</p>
            <p>• verifikator@dlh.go.id (Verifikator)</p>
          </div>
        </motion.div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-6">
              ← Kembali ke Beranda
            </Link>
            <h2 className="text-2xl font-bold">Masuk ke Akun Anda</h2>
            <p className="text-muted-foreground mt-1">Masukkan email dan password untuk melanjutkan</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="nama@perusahaan.co.id" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPw ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPw(!showPw)}>
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Belum punya akun?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">Daftar di sini</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
