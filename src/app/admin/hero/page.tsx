'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/config';
import { COLLECTIONS } from '@/lib/firebase/collections';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Upload, Save, Eye, Loader2 } from 'lucide-react';
import Image from 'next/image';

const heroSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  ctaText: z.string().min(1, 'CTA text is required'),
  ctaLink: z.string().min(1, 'CTA link is required'),
  isActive: z.boolean(),
});

type HeroFormData = z.infer<typeof heroSchema>;

export default function HeroEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<HeroFormData>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      isActive: true,
    },
  });

  useEffect(() => {
    loadHeroData();
  }, []);

  const loadHeroData = async () => {
    try {
      const heroDoc = await getDoc(doc(db, COLLECTIONS.HERO_CONTENT, 'main'));
      if (heroDoc.exists()) {
        const data = heroDoc.data();
        reset({
          title: data.title || '',
          subtitle: data.subtitle || '',
          ctaText: data.ctaText || '',
          ctaLink: data.ctaLink || '',
          isActive: data.isActive ?? true,
        });
        setBackgroundImage(data.backgroundImage || '');
      }
    } catch (error) {
      console.error('Error loading hero data:', error);
      toast.error('Failed to load hero content');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBackgroundImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: HeroFormData) => {
    setSaving(true);
    try {
      let imageUrl = backgroundImage;

      // Upload image if new file selected
      if (imageFile) {
        setUploading(true);
        const storageRef = ref(storage, `hero/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
        setUploading(false);
      }

      // Save to Firestore
      await setDoc(doc(db, COLLECTIONS.HERO_CONTENT, 'main'), {
        ...data,
        backgroundImage: imageUrl,
        updatedAt: new Date(),
      }, { merge: true });

      toast.success('Hero section updated successfully!');
      setImageFile(null);
    } catch (error) {
      console.error('Error saving hero data:', error);
      toast.error('Failed to save hero content');
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-veteran-gold" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hero Section</h1>
        <p className="text-gray-600 mt-2">
          Customize the main hero section of your homepage
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Content</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                {...register('title')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veteran-gold focus:border-veteran-gold"
                placeholder="Welcome to O.P. Veteran"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <textarea
                {...register('subtitle')}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veteran-gold focus:border-veteran-gold"
                placeholder="Taking care of our own..."
              />
              {errors.subtitle && (
                <p className="mt-1 text-sm text-red-600">{errors.subtitle.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  {...register('ctaText')}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veteran-gold focus:border-veteran-gold"
                  placeholder="Join Our Community"
                />
                {errors.ctaText && (
                  <p className="mt-1 text-sm text-red-600">{errors.ctaText.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Link
                </label>
                <input
                  {...register('ctaLink')}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veteran-gold focus:border-veteran-gold"
                  placeholder="/get-involved"
                />
                {errors.ctaLink && (
                  <p className="mt-1 text-sm text-red-600">{errors.ctaLink.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                {...register('isActive')}
                type="checkbox"
                id="isActive"
                className="w-4 h-4 text-veteran-gold border-gray-300 rounded focus:ring-veteran-gold"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                Active (Show on homepage)
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Background Image</h2>
          
          <div className="space-y-4">
            {backgroundImage && (
              <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={backgroundImage}
                  alt="Hero background"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload New Image
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="hero-image-upload"
                />
                <label
                  htmlFor="hero-image-upload"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Choose Image
                </label>
                {imageFile && (
                  <span className="text-sm text-gray-600">
                    {imageFile.name}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Recommended size: 1920x800px. Max file size: 5MB
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <a
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview Site
          </a>

          <button
            type="submit"
            disabled={saving || uploading || !isDirty}
            className="inline-flex items-center gap-2 px-6 py-2 bg-veteran-gold hover:bg-yellow-500 text-veteran-navy font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving || uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {uploading ? 'Uploading...' : 'Saving...'}
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
