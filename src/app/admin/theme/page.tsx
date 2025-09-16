'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { COLLECTIONS } from '@/lib/firebase/collections';
import toast from 'react-hot-toast';
import { Palette, Save, RotateCcw, Loader2 } from 'lucide-react';

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  navyColor: string;
  goldColor: string;
  fontFamily: string;
  headerFont: string;
  customCSS: string;
}

const defaultTheme: ThemeSettings = {
  primaryColor: '#0A2558',
  secondaryColor: '#002868',
  accentColor: '#D4AF37',
  navyColor: '#0A2558',
  goldColor: '#D4AF37',
  fontFamily: 'Inter',
  headerFont: 'Montserrat',
  customCSS: '',
};

export default function ThemeEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [theme, setTheme] = useState<ThemeSettings>(defaultTheme);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    loadThemeSettings();
  }, []);

  const loadThemeSettings = async () => {
    try {
      const themeDoc = await getDoc(doc(db, COLLECTIONS.THEME_SETTINGS, 'default'));
      if (themeDoc.exists()) {
        setTheme({ ...defaultTheme, ...themeDoc.data() } as ThemeSettings);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      toast.error('Failed to load theme settings');
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (field: keyof ThemeSettings, value: string) => {
    setTheme(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, COLLECTIONS.THEME_SETTINGS, 'default'), {
        ...theme,
        updatedAt: new Date(),
      });
      
      // Apply theme to current page
      applyTheme(theme);
      
      toast.success('Theme settings saved successfully!');
    } catch (error) {
      console.error('Error saving theme:', error);
      toast.error('Failed to save theme settings');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setTheme(defaultTheme);
    toast.success('Theme reset to defaults');
  };

  const applyTheme = (settings: ThemeSettings) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', settings.primaryColor);
    root.style.setProperty('--color-secondary', settings.secondaryColor);
    root.style.setProperty('--color-accent', settings.accentColor);
    root.style.setProperty('--color-navy', settings.navyColor);
    root.style.setProperty('--color-gold', settings.goldColor);
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
    if (!previewMode) {
      applyTheme(theme);
    } else {
      applyTheme(defaultTheme);
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
        <h1 className="text-3xl font-bold text-gray-900">Theme Customization</h1>
        <p className="text-gray-600 mt-2">
          Customize the colors and fonts of your website
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Color Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Color Scheme
          </h2>
          
          <div className="space-y-4">
            {[
              { field: 'primaryColor', label: 'Primary Color', desc: 'Main brand color' },
              { field: 'secondaryColor', label: 'Secondary Color', desc: 'Supporting color' },
              { field: 'accentColor', label: 'Accent Color', desc: 'Highlight color' },
              { field: 'navyColor', label: 'Navy Blue', desc: 'Veteran navy color' },
              { field: 'goldColor', label: 'Gold', desc: 'Veteran gold color' },
            ].map((item) => (
              <div key={item.field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {item.label}
                </label>
                <p className="text-xs text-gray-500 mb-2">{item.desc}</p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme[item.field as keyof ThemeSettings] as string}
                    onChange={(e) => handleColorChange(item.field as keyof ThemeSettings, e.target.value)}
                    className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme[item.field as keyof ThemeSettings] as string}
                    onChange={(e) => handleColorChange(item.field as keyof ThemeSettings, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veteran-gold"
                    placeholder="#000000"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Font Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Typography</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body Font
              </label>
              <select
                value={theme.fontFamily}
                onChange={(e) => setTheme(prev => ({ ...prev, fontFamily: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veteran-gold"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
                <option value="Poppins">Poppins</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heading Font
              </label>
              <select
                value={theme.headerFont}
                onChange={(e) => setTheme(prev => ({ ...prev, headerFont: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veteran-gold"
              >
                <option value="Montserrat">Montserrat</option>
                <option value="Playfair Display">Playfair Display</option>
                <option value="Raleway">Raleway</option>
                <option value="Oswald">Oswald</option>
                <option value="Bebas Neue">Bebas Neue</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom CSS (Advanced)
            </label>
            <textarea
              value={theme.customCSS}
              onChange={(e) => setTheme(prev => ({ ...prev, customCSS: e.target.value }))}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-veteran-gold"
              placeholder="/* Add custom CSS here */"
            />
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        
        <div className="border rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div 
              className="w-20 h-20 rounded-lg shadow-md"
              style={{ backgroundColor: theme.primaryColor }}
            />
            <div 
              className="w-20 h-20 rounded-lg shadow-md"
              style={{ backgroundColor: theme.secondaryColor }}
            />
            <div 
              className="w-20 h-20 rounded-lg shadow-md"
              style={{ backgroundColor: theme.accentColor }}
            />
            <div 
              className="w-20 h-20 rounded-lg shadow-md"
              style={{ backgroundColor: theme.navyColor }}
            />
            <div 
              className="w-20 h-20 rounded-lg shadow-md"
              style={{ backgroundColor: theme.goldColor }}
            />
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: theme.headerFont }}>
              Heading Example
            </h3>
            <p style={{ fontFamily: theme.fontFamily }}>
              This is how your body text will look with the selected font family.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={togglePreview}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          {previewMode ? 'Exit Preview' : 'Live Preview'}
        </button>

        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Default
          </button>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-veteran-gold hover:bg-yellow-500 text-veteran-navy font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Theme
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
