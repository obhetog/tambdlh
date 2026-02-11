import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileCheck, Shield, BarChart3, Users, ArrowRight, CheckCircle2, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';

const features = [
  {
    icon: FileCheck,
    title: 'Tracking Dokumen Real-Time',
    description: 'Pantau status setiap dokumen perizinan secara langsung dari dashboard Anda.',
  },
  {
    icon: Shield,
    title: 'Verifikasi Terstruktur',
    description: 'Proses verifikasi dokumen yang transparan dengan catatan detail dari verifikator.',
  },
  {
    icon: BarChart3,
    title: 'Analitik & Statistik',
    description: 'Grafik interaktif untuk monitoring tren perizinan dan performa verifikasi.',
  },
  {
    icon: Users,
    title: 'Multi-Role Access',
    description: 'Akses berbasis peran untuk Admin, Pelaku Usaha, dan Verifikator.',
  },
];

const stats = [
  { value: '1,200+', label: 'Dokumen Diproses' },
  { value: '350+', label: 'Izin Diterbitkan' },
  { value: '98%', label: 'Tingkat Kepuasan' },
  { value: '24/7', label: 'Monitoring Aktif' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">SiTrack<span className="text-primary">Izin</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#fitur" className="hover:text-foreground transition-colors">Fitur</a>
            <a href="#statistik" className="hover:text-foreground transition-colors">Statistik</a>
            <a href="#alur" className="hover:text-foreground transition-colors">Alur Kerja</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Masuk</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Daftar</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Mining landscape" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-hero-gradient opacity-90" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/20 text-primary-foreground/90 border border-primary-foreground/10 mb-6">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Sistem Perizinan Digital Terintegrasi
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
                Tracking Dokumen{' '}
                <span className="text-sidebar-primary">Perizinan</span>{' '}
                yang Cepat & Transparan
              </h1>
              <p className="text-lg text-primary-foreground/70 mb-8 leading-relaxed max-w-xl">
                Kelola seluruh proses perizinan pertambangan dan lingkungan hidup dalam satu platform digital yang modern dan terintegrasi.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="gap-2 shadow-glow">
                    Mulai Sekarang <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                    Masuk ke Dashboard
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="statistik" className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="fitur" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fitur <span className="text-gradient">Unggulan</span></h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Platform lengkap untuk mengelola seluruh siklus perizinan dari pengajuan hingga penerbitan.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-xl bg-card border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="alur" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Alur <span className="text-gradient">Kerja</span></h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Proses perizinan yang terstruktur dan mudah dipahami.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Registrasi', desc: 'Buat akun dan lengkapi profil perusahaan Anda', icon: Users },
              { step: '02', title: 'Ajukan Permohonan', desc: 'Pilih jenis izin dan unggah dokumen persyaratan', icon: FileText },
              { step: '03', title: 'Verifikasi', desc: 'Tim verifikator memeriksa kelengkapan dokumen', icon: Shield },
              { step: '04', title: 'Penerbitan', desc: 'Izin diterbitkan setelah semua dokumen valid', icon: CheckCircle2 },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative p-6 rounded-xl bg-card border border-border"
              >
                <div className="text-5xl font-extrabold text-primary/10 mb-3">{item.step}</div>
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                    <ArrowRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto p-12 rounded-2xl bg-hero-gradient text-primary-foreground"
          >
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">Siap Memulai?</h2>
            <p className="text-primary-foreground/70 mb-8">Daftarkan perusahaan Anda dan mulai proses perizinan digital sekarang juga.</p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="gap-2">
                Daftar Sekarang <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">SiTrackIzin</span>
          </div>
          <p>© 2026 Sistem Informasi Tracking Dokumen Perizinan. Hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
