import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

// Fallback dummy client if not configured so imports don't crash
export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : createClient('https://mock-supabase.ouzze.internal', 'mock-anon-key', {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

/**
 * Calculates SHA-256 hash of a file for absolute logo and asset integrity
 */
export async function calculateFileSHA256(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (err) {
    console.error('Error calculating SHA256:', err);
    return 'sha256-calculation-unsupported';
  }
}

/**
 * Storage helpers with fallback to base64 DataURL if storage bucket isn't reachable
 */
export async function uploadAssetToStorage(
  bucketName: 'public-media' | 'brand-originals' | 'documents',
  file: File,
  folderPath: string = ''
): Promise<{ url: string; meta: any }> {
  const sha256 = await calculateFileSHA256(file);
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = folderPath ? `${folderPath}/${Date.now()}_${cleanName}` : `${Date.now()}_${cleanName}`;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filePath);

        return {
          url: publicUrlData.publicUrl,
          meta: {
            originalName: file.name,
            fileSize: file.size,
            mimeType: file.type,
            sha256,
            uploadedAt: new Date().toISOString(),
            bucket: bucketName,
            path: filePath
          }
        };
      }
    } catch (e) {
      console.warn('Storage upload error, falling back to client URL:', e);
    }
  }

  // Fallback: create base64 / blob URL for local runtime preview
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        url: reader.result as string,
        meta: {
          originalName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          sha256,
          uploadedAt: new Date().toISOString(),
          bucket: bucketName,
          path: filePath
        }
      });
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Convenient helper for brand, logo, favicon, and general media asset uploads
 */
export async function uploadBrandAsset(
  file: File,
  type: 'logo' | 'favicon' | 'general' = 'general'
): Promise<{ success: boolean; url?: string; path?: string; error?: string }> {
  try {
    const bucket = type === 'logo' || type === 'favicon' ? 'brand-originals' : 'public-media';
    const folder = type;
    const res = await uploadAssetToStorage(bucket, file, folder);
    return {
      success: true,
      url: res.url,
      path: res.meta.path
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Falha ao processar asset de marca'
    };
  }
}

