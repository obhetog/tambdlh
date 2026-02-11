import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { User, Mail, Shield } from 'lucide-react';

export default function ProfilPage() {
  const { user } = useAuth();
  if (!user) return null;

  const roleLabel = user.role === 'admin' ? 'Administrator' : user.role === 'verifikator' ? 'Verifikator' : 'Pelaku Usaha';

  return (
    <div className="max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{roleLabel}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <User className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Nama</p>
              <p className="font-medium">{user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Peran</p>
              <p className="font-medium">{roleLabel}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
