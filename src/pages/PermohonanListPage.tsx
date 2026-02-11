import { motion } from 'framer-motion';
import { MOCK_PERMOHONAN } from '@/lib/mock-data';
import { StatusBadge } from './DashboardPage';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';

export default function PermohonanListPage() {
  const { user } = useAuth();
  const data = user?.role === 'user' ? MOCK_PERMOHONAN.filter(p => p.userId === user.id) : MOCK_PERMOHONAN;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h2 className="text-xl font-bold">
        {user?.role === 'user' ? 'Permohonan Saya' : 'Semua Permohonan'}
      </h2>
      <div className="space-y-3">
        {data.map(p => (
          <div key={p.id} className="p-5 rounded-xl bg-card border border-border hover:shadow-md transition-shadow">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{p.nomorPermohonan}</p>
                <p className="text-sm text-muted-foreground">{p.namaPerusahaan} • {p.jenisIzin}</p>
                <p className="text-xs text-muted-foreground mt-1">{p.lokasi} • {p.tanggalPengajuan}</p>
                <p className="text-xs text-muted-foreground mt-1">{p.dokumen.length} dokumen • {p.dokumen.filter(d => d.status === 'disetujui').length} disetujui</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={p.status} />
                <Link to={`/permohonan/${p.id}`}>
                  <Button size="sm" variant="outline">Detail</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-muted-foreground text-center py-10">Belum ada permohonan</p>
        )}
      </div>
    </motion.div>
  );
}
