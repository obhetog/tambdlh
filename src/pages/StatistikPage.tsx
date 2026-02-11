import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { MONTHLY_STATS, DOC_TYPE_STATS, MOCK_PERMOHONAN } from '@/lib/mock-data';

const COLORS_MAP = {
  disetujui: 'hsl(152, 60%, 38%)',
  ditolak: 'hsl(0, 72%, 51%)',
  menunggu: 'hsl(38, 92%, 50%)',
  diproses: 'hsl(200, 80%, 50%)',
};

const PIE_DATA = [
  { name: 'Berhasil', value: MOCK_PERMOHONAN.filter(p => p.status === 'berhasil').length, color: COLORS_MAP.disetujui },
  { name: 'Diproses', value: MOCK_PERMOHONAN.filter(p => p.status === 'diproses').length, color: COLORS_MAP.diproses },
  { name: 'Ditolak', value: MOCK_PERMOHONAN.filter(p => p.status === 'ditolak').length, color: COLORS_MAP.ditolak },
];

export default function StatistikPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Statistik & Grafik</h2>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-card border border-border">
          <h3 className="font-semibold mb-4">Tren Permohonan per Bulan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={MONTHLY_STATS}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(145,20%,88%)" />
              <XAxis dataKey="bulan" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke={COLORS_MAP.diproses} strokeWidth={2} name="Total" />
              <Line type="monotone" dataKey="disetujui" stroke={COLORS_MAP.disetujui} strokeWidth={2} name="Disetujui" />
              <Line type="monotone" dataKey="ditolak" stroke={COLORS_MAP.ditolak} strokeWidth={2} name="Ditolak" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-xl bg-card border border-border">
          <h3 className="font-semibold mb-4">Distribusi Status Perizinan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={110} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} fontSize={12}>
                {PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-xl bg-card border border-border">
        <h3 className="font-semibold mb-4">Jumlah Dokumen per Jenis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={DOC_TYPE_STATS}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(145,20%,88%)" />
            <XAxis dataKey="jenis" fontSize={11} />
            <YAxis fontSize={12} />
            <Tooltip formatter={(v: number, _n: string, props: any) => [v, props.payload.fullName]} />
            <Bar dataKey="total" fill={COLORS_MAP.disetujui} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
