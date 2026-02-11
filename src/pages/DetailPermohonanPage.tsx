import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, CheckCircle2, XCircle, Clock, MessageSquare } from 'lucide-react';
import { MOCK_PERMOHONAN } from '@/lib/mock-data';
import { StatusBadge } from './DashboardPage';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function DetailPermohonanPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const permohonan = MOCK_PERMOHONAN.find(p => p.id === id);
  const [catatan, setCatatan] = useState<Record<string, string>>({});

  if (!permohonan) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground mb-4">Permohonan tidak ditemukan</p>
        <Link to="/dashboard"><Button variant="outline">Kembali</Button></Link>
      </div>
    );
  }

  const handleVerify = (docId: string, action: 'approve' | 'reject') => {
    if (action === 'approve') {
      toast.success('Dokumen berhasil disetujui');
    } else {
      if (!catatan[docId]) {
        toast.error('Masukkan catatan penolakan');
        return;
      }
      toast.success('Dokumen ditolak dengan catatan');
    }
  };

  const statusIcon = {
    menunggu: <Clock className="w-5 h-5 text-warning" />,
    disetujui: <CheckCircle2 className="w-5 h-5 text-success" />,
    ditolak: <XCircle className="w-5 h-5 text-destructive" />,
  };

  const progress = permohonan.dokumen.length > 0
    ? Math.round((permohonan.dokumen.filter(d => d.status === 'disetujui').length / permohonan.dokumen.length) * 100)
    : 0;

  return (
    <div className="space-y-6 max-w-4xl">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-card border border-border">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold">{permohonan.nomorPermohonan}</h2>
            <p className="text-muted-foreground">{permohonan.namaPerusahaan}</p>
          </div>
          <StatusBadge status={permohonan.status} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Jenis Izin</p>
            <p className="font-medium">{permohonan.jenisIzin}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Lokasi</p>
            <p className="font-medium">{permohonan.lokasi}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Tanggal Pengajuan</p>
            <p className="font-medium">{permohonan.tanggalPengajuan}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Progress</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-xs font-medium">{progress}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-xl bg-card border border-border">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" /> Dokumen Persyaratan
        </h3>
        <div className="space-y-3">
          {permohonan.dokumen.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="p-4 rounded-lg border border-border bg-muted/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {statusIcon[doc.status]}
                  <div>
                    <p className="font-medium text-sm">{doc.nama}</p>
                    <p className="text-xs text-muted-foreground">{doc.jenis} • {doc.fileName}</p>
                    {doc.verifiedAt && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Diverifikasi: {doc.verifiedAt} {doc.verifiedBy && `oleh ${doc.verifiedBy}`}
                      </p>
                    )}
                    {doc.catatan && (
                      <div className="mt-2 flex items-start gap-1.5 text-xs text-destructive">
                        <MessageSquare className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span>{doc.catatan}</span>
                      </div>
                    )}
                  </div>
                </div>
                <StatusBadge status={doc.status} />
              </div>

              {/* Verifikator actions */}
              {user?.role === 'verifikator' && doc.status === 'menunggu' && (
                <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2 items-end">
                  <div className="flex-1 min-w-[200px]">
                    <Input
                      placeholder="Catatan penolakan (wajib jika ditolak)"
                      value={catatan[doc.id] || ''}
                      onChange={e => setCatatan(prev => ({ ...prev, [doc.id]: e.target.value }))}
                      className="text-sm"
                    />
                  </div>
                  <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => handleVerify(doc.id, 'reject')}>
                    <XCircle className="w-4 h-4 mr-1" /> Tolak
                  </Button>
                  <Button size="sm" onClick={() => handleVerify(doc.id, 'approve')}>
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Setujui
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
