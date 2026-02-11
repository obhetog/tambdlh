export type DocumentStatus = 'menunggu' | 'disetujui' | 'ditolak';
export type PermohonanStatus = 'draft' | 'diproses' | 'berhasil' | 'ditolak';

export interface Dokumen {
  id: string;
  nama: string;
  jenis: string;
  fileName: string;
  status: DocumentStatus;
  catatan?: string;
  uploadedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface Permohonan {
  id: string;
  nomorPermohonan: string;
  namaPerusahaan: string;
  jenisIzin: string;
  tanggalPengajuan: string;
  status: PermohonanStatus;
  userId: string;
  dokumen: Dokumen[];
  lokasi: string;
  keterangan?: string;
}

// Tambahkan dokumen baru di sini jika ada persyaratan tambahan
export const JENIS_DOKUMEN = [
  'Kesesuaian Tata Ruang',
  'Surat Rencana Kegiatan',
  'Peta Kawasan Hutan',
  'Dokumen Lingkungan (AMDAL/UKL-UPL)',
  'Surat Kepemilikan Lahan',
  'Dokumen Teknis Tambang',
];

export const JENIS_IZIN = [
  'Izin Usaha Pertambangan (IUP)',
  'Izin Pinjam Pakai Kawasan Hutan (IPPKH)',
  'Izin Lingkungan',
  'Izin Operasi Produksi',
  'Izin Eksplorasi',
];

export const MOCK_PERMOHONAN: Permohonan[] = [
  {
    id: '1',
    nomorPermohonan: 'PRM-2026-0001',
    namaPerusahaan: 'PT Tambang Sejahtera',
    jenisIzin: 'Izin Usaha Pertambangan (IUP)',
    tanggalPengajuan: '2026-01-15',
    status: 'diproses',
    userId: '2',
    lokasi: 'Kalimantan Timur',
    dokumen: [
      { id: 'd1', nama: 'Kesesuaian Tata Ruang', jenis: 'Kesesuaian Tata Ruang', fileName: 'tata-ruang.pdf', status: 'disetujui', uploadedAt: '2026-01-15', verifiedAt: '2026-01-18', verifiedBy: 'Verifikator Dinas LH' },
      { id: 'd2', nama: 'Peta Kawasan Hutan', jenis: 'Peta Kawasan Hutan', fileName: 'peta-hutan.pdf', status: 'disetujui', uploadedAt: '2026-01-15', verifiedAt: '2026-01-19', verifiedBy: 'Verifikator Dinas LH' },
      { id: 'd3', nama: 'Dokumen AMDAL', jenis: 'Dokumen Lingkungan (AMDAL/UKL-UPL)', fileName: 'amdal.pdf', status: 'menunggu', uploadedAt: '2026-01-16' },
      { id: 'd4', nama: 'Surat Kepemilikan Lahan', jenis: 'Surat Kepemilikan Lahan', fileName: 'lahan.pdf', status: 'ditolak', catatan: 'Sertifikat belum dilegalisir notaris', uploadedAt: '2026-01-15', verifiedAt: '2026-01-20', verifiedBy: 'Verifikator Dinas LH' },
    ],
  },
  {
    id: '2',
    nomorPermohonan: 'PRM-2026-0002',
    namaPerusahaan: 'CV Mineral Abadi',
    jenisIzin: 'Izin Lingkungan',
    tanggalPengajuan: '2026-01-20',
    status: 'berhasil',
    userId: '4',
    lokasi: 'Sulawesi Tenggara',
    dokumen: [
      { id: 'd5', nama: 'Kesesuaian Tata Ruang', jenis: 'Kesesuaian Tata Ruang', fileName: 'tata-ruang-cv.pdf', status: 'disetujui', uploadedAt: '2026-01-20', verifiedAt: '2026-01-22' },
      { id: 'd6', nama: 'UKL-UPL', jenis: 'Dokumen Lingkungan (AMDAL/UKL-UPL)', fileName: 'ukl-upl.pdf', status: 'disetujui', uploadedAt: '2026-01-20', verifiedAt: '2026-01-23' },
      { id: 'd7', nama: 'Dokumen Teknis', jenis: 'Dokumen Teknis Tambang', fileName: 'teknis.pdf', status: 'disetujui', uploadedAt: '2026-01-21', verifiedAt: '2026-01-24' },
    ],
  },
  {
    id: '3',
    nomorPermohonan: 'PRM-2026-0003',
    namaPerusahaan: 'PT Batu Bara Nusantara',
    jenisIzin: 'Izin Operasi Produksi',
    tanggalPengajuan: '2026-02-01',
    status: 'diproses',
    userId: '5',
    lokasi: 'Kalimantan Selatan',
    dokumen: [
      { id: 'd8', nama: 'Surat Rencana Kegiatan', jenis: 'Surat Rencana Kegiatan', fileName: 'rencana.pdf', status: 'menunggu', uploadedAt: '2026-02-01' },
      { id: 'd9', nama: 'Peta Kawasan Hutan', jenis: 'Peta Kawasan Hutan', fileName: 'peta.pdf', status: 'menunggu', uploadedAt: '2026-02-01' },
    ],
  },
  {
    id: '4',
    nomorPermohonan: 'PRM-2026-0004',
    namaPerusahaan: 'PT Emas Makmur',
    jenisIzin: 'Izin Eksplorasi',
    tanggalPengajuan: '2026-02-05',
    status: 'ditolak',
    userId: '6',
    lokasi: 'Papua Barat',
    dokumen: [
      { id: 'd10', nama: 'Dokumen AMDAL', jenis: 'Dokumen Lingkungan (AMDAL/UKL-UPL)', fileName: 'amdal-emas.pdf', status: 'ditolak', catatan: 'Dokumen AMDAL tidak sesuai format terbaru', uploadedAt: '2026-02-05', verifiedAt: '2026-02-08' },
      { id: 'd11', nama: 'Kepemilikan Lahan', jenis: 'Surat Kepemilikan Lahan', fileName: 'lahan-emas.pdf', status: 'ditolak', catatan: 'Area berada di kawasan konservasi', uploadedAt: '2026-02-05', verifiedAt: '2026-02-08' },
    ],
  },
  {
    id: '5',
    nomorPermohonan: 'PRM-2025-0089',
    namaPerusahaan: 'PT Tambang Sejahtera',
    jenisIzin: 'Izin Pinjam Pakai Kawasan Hutan (IPPKH)',
    tanggalPengajuan: '2025-11-10',
    status: 'berhasil',
    userId: '2',
    lokasi: 'Kalimantan Timur',
    dokumen: [
      { id: 'd12', nama: 'Kesesuaian Tata Ruang', jenis: 'Kesesuaian Tata Ruang', fileName: 'tata-ruang-ippkh.pdf', status: 'disetujui', uploadedAt: '2025-11-10', verifiedAt: '2025-11-15' },
      { id: 'd13', nama: 'Peta Kawasan Hutan', jenis: 'Peta Kawasan Hutan', fileName: 'peta-ippkh.pdf', status: 'disetujui', uploadedAt: '2025-11-10', verifiedAt: '2025-11-15' },
      { id: 'd14', nama: 'Dokumen Teknis', jenis: 'Dokumen Teknis Tambang', fileName: 'teknis-ippkh.pdf', status: 'disetujui', uploadedAt: '2025-11-11', verifiedAt: '2025-11-16' },
    ],
  },
];

export const MONTHLY_STATS = [
  { bulan: 'Sep', total: 8, disetujui: 5, ditolak: 2, menunggu: 1 },
  { bulan: 'Okt', total: 12, disetujui: 7, ditolak: 3, menunggu: 2 },
  { bulan: 'Nov', total: 15, disetujui: 10, ditolak: 3, menunggu: 2 },
  { bulan: 'Des', total: 10, disetujui: 6, ditolak: 2, menunggu: 2 },
  { bulan: 'Jan', total: 18, disetujui: 9, ditolak: 4, menunggu: 5 },
  { bulan: 'Feb', total: 7, disetujui: 2, ditolak: 2, menunggu: 3 },
];

export const DOC_TYPE_STATS = JENIS_DOKUMEN.map((jenis, i) => ({
  jenis: jenis.length > 20 ? jenis.substring(0, 20) + '...' : jenis,
  fullName: jenis,
  total: [14, 8, 12, 16, 10, 9][i],
}));
