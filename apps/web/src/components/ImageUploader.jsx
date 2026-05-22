
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, X, Loader2 } from 'lucide-react';
import { moderateContent } from '@/lib/moderation.js';
import pb from '@/lib/pocketbase.js';
import { toast } from 'sonner';

/**
 * Two-stage moderation:
 *   1. Local: MIME / size / rate-limit (lib/moderation.js).
 *   2. Remote (optional): Cloudflare Worker hits Vision SafeSearch.
 *      Skipped silently if VITE_NSFW_WORKER_URL is unset.
 * Only after both pass do we upload to PocketBase.
 */
async function nsfwGate(file) {
  const url = import.meta.env.VITE_NSFW_WORKER_URL;
  if (!url) return { safe: true, skipped: true };

  const fd = new FormData();
  fd.append('image', file);

  let res;
  try {
    res = await fetch(url, { method: 'POST', body: fd });
  } catch (err) {
    // Fail-CLOSED: do not allow upload if the moderation service is unreachable.
    throw new Error('Moderação de imagem indisponível. Tente novamente em instantes.');
  }
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error('Falha na moderação de imagem (' + res.status + '). ' + body.slice(0, 120));
  }
  return res.json();
}

const ImageUploader = ({ onUploadSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const moderation = moderateContent('', [file]);
    if (!moderation.isValid) {
      toast.error(moderation.errors[0]);
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);

    try {
      const verdict = await nsfwGate(selectedFile);
      if (!verdict.safe) {
        const reason = (verdict.reasons || []).join(', ') || 'conteúdo inadequado';
        toast.error('Imagem bloqueada pela moderação (' + reason + ').');
        clearSelection();
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('uploader', pb.authStore.model.id);

      const record = await pb.collection('images').create(formData, { $autoCancel: false });
      const url = pb.files.getUrl(record, record.file);

      toast.success('Imagem enviada!');
      setPreview(null);
      setSelectedFile(null);
      if (onUploadSuccess) onUploadSuccess(url);
    } catch (err) {
      console.error(err);
      const serverMsg = err?.response?.message || err?.data?.message || err?.message;
      toast.error(serverMsg || 'Falha no upload da imagem.');
    } finally {
      setIsUploading(false);
    }
  };

  const clearSelection = () => {
    setPreview(null);
    setSelectedFile(null);
  };

  return (
    <div className="flex items-center gap-4">
      {!preview ? (
        <div>
          <input
            type="file"
            id="image-upload"
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
          />
          <label htmlFor="image-upload">
            <Button variant="outline" size="sm" className="cursor-pointer" asChild>
              <span>
                <ImagePlus className="h-4 w-4 mr-2" />
                Adicionar Imagem
              </span>
            </Button>
          </label>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 rounded-md overflow-hidden border">
            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
            <button
              onClick={clearSelection}
              className="absolute top-0 right-0 bg-black/50 text-white rounded-bl-md p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <Button size="sm" onClick={handleUpload} disabled={isUploading}>
            {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 'Confirmar'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
