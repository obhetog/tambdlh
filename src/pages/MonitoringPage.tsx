import { motion } from 'framer-motion';
import { MOCK_PERMOHONAN } from '@/lib/mock-data';
import { StatusBadge } from './DashboardPage';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Monitoring Perizinan Real-Time</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-card border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-warning" />
          </div>
          <div>
            <p className="text-2xl font-bold">{MOCK_PERMOHONAN.filter(p => p.status === 'diproses').length}</p>
            <p className="text-sm text-muted-foreground">Sedang Diproses</p>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-card border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold">{MOCK_PERMOHONAN.filter(p => p.status === 'berhasil').length}</p>
            <p className="text-sm text-muted-foreground">Berhasil</p>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-card border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
            <XCircle className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <p className="text-2xl font-bold">{MOCK_PERMOHONAN.filter(p => p.status === 'ditolak').length}</p>
            <p className="text-sm text-muted-foreground">Ditolak</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {MOCK_PERMOHONAN.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-xl bg-card border border-border"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{p.nomorPermohonan}</p>
                <p className="text-sm text-muted-foreground">{p.namaPerusahaan} • {p.jenisIzin}</p>
                <p className="text-xs text-muted-foreground mt-1">{p.lokasi} • Diajukan: {p.tanggalPengajuan}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 max-w-[200px] h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${p.dokumen.length > 0 ? (p.dokumen.filter(d => d.status === 'disetujui').length / p.dokumen.length) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {p.dokumen.filter(d => d.status === 'disetujui').length}/{p.dokumen.length} dokumen
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={p.status} />
                <Link to={`/permohonan/${p.id}`}>
                  <Button size="sm" variant="outline">Detail</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
