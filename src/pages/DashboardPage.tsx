import { motion } from 'framer-motion';
import { FileText, CheckCircle2, XCircle, Clock, TrendingUp, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { MOCK_PERMOHONAN, MONTHLY_STATS, DOC_TYPE_STATS, type Permohonan } from '@/lib/mock-data';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const COLORS = {
  disetujui: 'hsl(152, 60%, 38%)',
  ditolak: 'hsl(0, 72%, 51%)',
  menunggu: 'hsl(38, 92%, 50%)',
  diproses: 'hsl(200, 80%, 50%)',
};

const PIE_DATA = [
  { name: 'Disetujui', value: 2, color: COLORS.disetujui },
  { name: 'Diproses', value: 2, color: COLORS.diproses },
  { name: 'Ditolak', value: 1, color: COLORS.ditolak },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    berhasil: { label: 'Berhasil', className: 'bg-success/10 text-success border-success/20' },
    diproses: { label: 'Diproses', className: 'bg-info/10 text-info border-info/20' },
    ditolak: { label: 'Ditolak', className: 'bg-destructive/10 text-destructive border-destructive/20' },
    draft: { label: 'Draft', className: 'bg-muted text-muted-foreground border-border' },
    menunggu: { label: 'Menunggu', className: 'bg-warning/10 text-warning border-warning/20' },
    disetujui: { label: 'Disetujui', className: 'bg-success/10 text-success border-success/20' },
  };
  const s = map[status] || map.draft;
  return <Badge variant="outline" className={s.className}>{s.label}</Badge>;
}

function StatCard({ icon: Icon, label, value, color, delay }: { icon: React.ElementType; label: string; value: number | string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-5 rounded-xl bg-card border border-border hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ====== ADMIN DASHBOARD ======
function AdminDashboard() {
  const allDocs = MOCK_PERMOHONAN.flatMap(p => p.dokumen);
  const totalPermohonan = MOCK_PERMOHONAN.length;
  const totalDocs = allDocs.length;
  const approved = MOCK_PERMOHONAN.filter(p => p.status === 'berhasil').length;
  const pending = allDocs.filter(d => d.status === 'menunggu').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FileText} label="Total Permohonan" value={totalPermohonan} color="bg-primary/10 text-primary" delay={0} />
        <StatCard icon={CheckCircle2} label="Izin Diterbitkan" value={approved} color="bg-success/10 text-success" delay={0.1} />
        <StatCard icon={Clock} label="Dokumen Pending" value={pending} color="bg-warning/10 text-warning" delay={0.2} />
        <StatCard icon={Users} label="Total Dokumen" value={totalDocs} color="bg-info/10 text-info" delay={0.3} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-xl bg-card border border-border">
          <h3 className="font-semibold mb-4">Tren Permohonan per Bulan</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={MONTHLY_STATS}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(145, 20%, 88%)" />
              <XAxis dataKey="bulan" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke={COLORS.diproses} strokeWidth={2} name="Total" />
              <Line type="monotone" dataKey="disetujui" stroke={COLORS.disetujui} strokeWidth={2} name="Disetujui" />
              <Line type="monotone" dataKey="ditolak" stroke={COLORS.ditolak} strokeWidth={2} name="Ditolak" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 rounded-xl bg-card border border-border">
          <h3 className="font-semibold mb-4">Status Perizinan</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} fontSize={12}>
                {PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="p-6 rounded-xl bg-card border border-border">
        <h3 className="font-semibold mb-4">Jumlah Dokumen per Jenis</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={DOC_TYPE_STATS}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(145, 20%, 88%)" />
            <XAxis dataKey="jenis" fontSize={11} />
            <YAxis fontSize={12} />
            <Tooltip formatter={(v: number, _n: string, props: any) => [v, props.payload.fullName]} />
            <Bar dataKey="total" fill={COLORS.disetujui} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <PermohonanTable data={MOCK_PERMOHONAN} title="Semua Permohonan" />
    </div>
  );
}

// ====== USER DASHBOARD ======
function UserDashboard() {
  const { user } = useAuth();
  const myData = MOCK_PERMOHONAN.filter(p => p.userId === user?.id);
  const myDocs = myData.flatMap(p => p.dokumen);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FileText} label="Permohonan Saya" value={myData.length} color="bg-primary/10 text-primary" delay={0} />
        <StatCard icon={CheckCircle2} label="Berhasil" value={myData.filter(p => p.status === 'berhasil').length} color="bg-success/10 text-success" delay={0.1} />
        <StatCard icon={Clock} label="Sedang Diproses" value={myData.filter(p => p.status === 'diproses').length} color="bg-warning/10 text-warning" delay={0.2} />
        <StatCard icon={TrendingUp} label="Total Dokumen" value={myDocs.length} color="bg-info/10 text-info" delay={0.3} />
      </div>
      <PermohonanTable data={myData} title="Permohonan Saya" />
    </div>
  );
}

// ====== VERIFIKATOR DASHBOARD ======
function VerifikatorDashboard() {
  const allDocs = MOCK_PERMOHONAN.flatMap(p => p.dokumen);
  const pending = allDocs.filter(d => d.status === 'menunggu').length;
  const approved = allDocs.filter(d => d.status === 'disetujui').length;
  const rejected = allDocs.filter(d => d.status === 'ditolak').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={Clock} label="Menunggu Verifikasi" value={pending} color="bg-warning/10 text-warning" delay={0} />
        <StatCard icon={CheckCircle2} label="Disetujui" value={approved} color="bg-success/10 text-success" delay={0.1} />
        <StatCard icon={XCircle} label="Ditolak" value={rejected} color="bg-destructive/10 text-destructive" delay={0.2} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-xl bg-card border border-border">
        <h3 className="font-semibold mb-4">Dokumen Menunggu Verifikasi</h3>
        <div className="space-y-3">
          {MOCK_PERMOHONAN.flatMap(p =>
            p.dokumen.filter(d => d.status === 'menunggu').map(d => (
              <div key={d.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                <div>
                  <p className="font-medium text-sm">{d.nama}</p>
                  <p className="text-xs text-muted-foreground">{p.namaPerusahaan} • {p.nomorPermohonan}</p>
                </div>
                <Link to={`/permohonan/${p.id}`}>
                  <Button size="sm" variant="outline">Verifikasi</Button>
                </Link>
              </div>
            ))
          )}
        </div>
      </motion.div>

      <PermohonanTable data={MOCK_PERMOHONAN} title="Semua Permohonan" />
    </div>
  );
}

// ====== SHARED TABLE ======
function PermohonanTable({ data, title }: { data: Permohonan[]; title: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-6 rounded-xl bg-card border border-border">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-3 font-medium text-muted-foreground">No. Permohonan</th>
              <th className="pb-3 font-medium text-muted-foreground">Perusahaan</th>
              <th className="pb-3 font-medium text-muted-foreground hidden md:table-cell">Jenis Izin</th>
              <th className="pb-3 font-medium text-muted-foreground hidden lg:table-cell">Lokasi</th>
              <th className="pb-3 font-medium text-muted-foreground">Status</th>
              <th className="pb-3 font-medium text-muted-foreground">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map(p => (
              <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-3 font-medium">{p.nomorPermohonan}</td>
                <td className="py-3">{p.namaPerusahaan}</td>
                <td className="py-3 hidden md:table-cell text-muted-foreground">{p.jenisIzin}</td>
                <td className="py-3 hidden lg:table-cell text-muted-foreground">{p.lokasi}</td>
                <td className="py-3"><StatusBadge status={p.status} /></td>
                <td className="py-3">
                  <Link to={`/permohonan/${p.id}`}>
                    <Button size="sm" variant="ghost">Detail</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export { StatusBadge };

export default function DashboardPage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <>
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'user' && <UserDashboard />}
      {user.role === 'verifikator' && <VerifikatorDashboard />}
    </>
  );
}
