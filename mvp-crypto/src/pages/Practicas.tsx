import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, TextField, Button, Avatar, Stack, CircularProgress } from '@mui/material';
import { supabase } from '../lib/supabaseClient';
import { ProfileSchema, type ProfileForm } from '../schemas/UserValidation';

type EstadoCarga = 'idle' | 'subiendo' | 'listo' | 'error';

export default function Practicas() {
  const [estadoCarga, setEstadoCarga] = useState<EstadoCarga>('idle');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [cargandoPerfil, setCargandoPerfil] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(ProfileSchema),
  });

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from('profiles')
          .select('nombre, xp_rank, avatar_url')
          .eq('id', user.id)
          .maybeSingle();

        if (data) {
          reset({ nombre: data.nombre ?? '', xpRank: data.xp_rank ?? 0 });
          setAvatarUrl(data.avatar_url ?? null);
        }
      } finally {
        setCargandoPerfil(false);
      }
    };

    cargarPerfil();
  }, [reset]);

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setArchivoSeleccionado(file);
    setAvatarUrl(URL.createObjectURL(file));
  };

  const subirAvatar = async (file: File): Promise<string | null> => {
    setEstadoCarga('subiendo');
    const nombreArchivo = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from('mvp-crypto')
      .upload(nombreArchivo, file);

    if (error) {
      setEstadoCarga('error');
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('mvp-crypto')
      .getPublicUrl(data.path);

    setEstadoCarga('listo');
    return urlData.publicUrl;
  };

  const onSubmit = async (data: ProfileForm) => {
    setMensajeExito(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    let urlFinal = avatarUrl;

    if (archivoSeleccionado) {
      urlFinal = await subirAvatar(archivoSeleccionado);
      if (!urlFinal) return;
    }

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      nombre: data.nombre,
      xp_rank: data.xpRank ?? 0,
      avatar_url: urlFinal,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      setMensajeExito('Error al guardar el perfil.');
      return;
    }

    setArchivoSeleccionado(null);
    setMensajeExito('¡Perfil actualizado correctamente!');
    setModoEdicion(false);
  };

  const mensajeCarga: Record<EstadoCarga, string> = {
    idle: '',
    subiendo: 'Subiendo imagen...',
    listo: '¡Imagen subida! 100%',
    error: 'Error al subir la imagen.',
  };

  if (cargandoPerfil) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Actualizar perfil
      </Typography>

      <Stack spacing={3}>

        <Stack alignItems="center" spacing={1}>
          <Avatar
            src={avatarUrl ?? undefined}
            sx={{ width: 96, height: 96 }}
          />
          <Button variant="outlined" component="label" size="small" disabled={!modoEdicion}>
            Elegir foto
            <input type="file" accept="image/*" hidden onChange={onFileSelected} disabled={!modoEdicion} />
          </Button>
          {estadoCarga !== 'idle' && (
            <Typography
              variant="caption"
              color={estadoCarga === 'error' ? 'error' : 'textSecondary'}
            >
              {mensajeCarga[estadoCarga]}
            </Typography>
          )}
        </Stack>

        <TextField
          label="Nombre"
          fullWidth
          {...register('nombre')}
          error={!!errors.nombre}
          helperText={errors.nombre?.message}
          disabled={!modoEdicion}
        />

        <TextField
          label="XP Rank"
          type="number"
          fullWidth
          {...register('xpRank')}
          error={!!errors.xpRank}
          helperText={errors.xpRank?.message}
          disabled={!modoEdicion}
        />

        {mensajeExito && (
          <Typography color={mensajeExito.startsWith('Error') ? 'error' : 'success.main'}>
            {mensajeExito}
          </Typography>
        )}

        {modoEdicion ? (
          <Button
            variant="contained"
            disabled={isSubmitting}
            fullWidth
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        ) : (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setModoEdicion(true)}
          >
            Editar
          </Button>
        )}

      </Stack>
    </Box>
  );
}
