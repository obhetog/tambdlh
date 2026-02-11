import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Plus, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { JENIS_IZIN, JENIS_DOKUMEN } from '@/lib/mock-data';
import { toast } from 'sonner';

interface UploadedDoc {
  id: string;
  jenis: string;
  file: File | null;
}

export default function PermohonanBaruPage() {
  const navigate = useNavigate();
  const [jenisIzin, setJenisIzin] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [documents, setDocuments] = useState<UploadedDoc[]>([
    { id: '1', jenis: '', file: null },
  ]);

  const addDocument = () => {
    setDocuments(prev => [...prev, { id: Date.now().toString(), jenis: '', file: null }]);
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const updateDoc = (id: string, field: 'jenis' | 'file', value: any) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jenisIzin || !lokasi) {
      toast.error('Lengkapi semua field wajib');
      return;
    }
    const validDocs = documents.filter(d => d.jenis && d.file);
    if (validDocs.length === 0) {
      toast.error('Upload minimal satu dokumen');
      return;
    }
    toast.success('Permohonan berhasil diajukan!');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-bold mb-6">Ajukan Permohonan Perizinan Baru</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 rounded-xl bg-card border border-border space-y-5">
            <h3 className="font-semibold">Informasi Permohonan</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Jenis Izin *</Label>
                <Select value={jenisIzin} onValueChange={setJenisIzin}>
                  <SelectTrigger><SelectValue placeholder="Pilih jenis izin" /></SelectTrigger>
                  <SelectContent>
                    {JENIS_IZIN.map(j => <SelectItem key={j} value={j}>{j}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Lokasi *</Label>
                <Input placeholder="Contoh: Kalimantan Timur" value={lokasi} onChange={e => setLokasi(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Keterangan Tambahan</Label>
              <Textarea placeholder="Opsional" value={keterangan} onChange={e => setKeterangan(e.target.value)} rows={3} />
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Dokumen Persyaratan</h3>
              <Button type="button" variant="outline" size="sm" onClick={addDocument} className="gap-1">
                <Plus className="w-4 h-4" /> Tambah
              </Button>
            </div>

            {/* Tambahkan dokumen baru di sini jika ada persyaratan tambahan */}
            <div className="space-y-4">
              {documents.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg border border-border bg-muted/20 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dokumen #{i + 1}</span>
                    {documents.length > 1 && (
                      <button type="button" onClick={() => removeDocument(doc.id)} className="text-muted-foreground hover:text-destructive">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Jenis Dokumen</Label>
                      <Select value={doc.jenis} onValueChange={v => updateDoc(doc.id, 'jenis', v)}>
                        <SelectTrigger><SelectValue placeholder="Pilih jenis" /></SelectTrigger>
                        <SelectContent>
                          {JENIS_DOKUMEN.map(j => <SelectItem key={j} value={j}>{j}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">File (PDF, JPG, PNG)</Label>
                      <div className="relative">
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={e => updateDoc(doc.id, 'file', e.target.files?.[0] || null)}
                          className="file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:text-xs file:font-medium file:text-primary"
                        />
                      </div>
                      {doc.file && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <FileText className="w-3 h-3" /> {doc.file.name}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="gap-2">
              <Upload className="w-4 h-4" /> Ajukan Permohonan
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>Batal</Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
