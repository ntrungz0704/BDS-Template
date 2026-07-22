import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface MediaAsset {
  id: string;
  url: string;
  thumbnailUrl: string;
  name: string;
  type: string;
  format: string;
  size: number;
  processingStatus: string;
}

interface MediaFolder {
  id: string;
  name: string;
  slug: string;
}

export const MediaLibraryModal: React.FC<{ isOpen: boolean; onClose: () => void; onSelect: (url: string) => void }> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [folders, setFolders] = useState<MediaFolder[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen, currentFolder]);

  const fetchMedia = async () => {
    try {
      const url = currentFolder ? `/api/cms/media?folderId=${currentFolder}` : '/api/cms/media';
      const res = await fetch(url, {
        headers: {
          'x-tenant-id': 'dev-tenant', // Should come from context
        },
      });
      const data = await res.json();
      if (data.success) {
        setAssets(data.data.assets);
        setFolders(data.data.folders);
      }
    } catch (err) {
      console.error('Failed to fetch media', err);
    }
  };

  const handleUpload = async (files: File[]) => {
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        if (currentFolder) {
          formData.append('folderId', currentFolder);
        }
        return fetch('/api/cms/media/upload', {
          method: 'POST',
          headers: {
            'x-tenant-id': 'dev-tenant',
          },
          body: formData,
        });
      });
      await Promise.all(uploadPromises);
      fetchMedia(); // Refresh immediately to show PENDING state
      
      // Auto refresh after 3 seconds to get COMPLETED state
      setTimeout(() => fetchMedia(), 3000);
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleUpload(acceptedFiles);
  }, [currentFolder]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 w-full max-w-5xl h-[80vh] rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Media Library</h2>
          <div className="flex items-center gap-4">
            <button 
              {...getRootProps()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Images'}
              <input {...getInputProps()} />
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Grid */}
          <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-950 relative" {...getRootProps()}>
            {isDragActive && (
              <div className="absolute inset-0 z-10 bg-blue-500/10 border-4 border-dashed border-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Drop images here...</span>
              </div>
            )}
            
            {/* Breadcrumb / Folders (Scaffold) */}
            {folders.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Folders</h3>
                <div className="flex gap-4">
                  {folders.map(f => (
                    <div key={f.id} onClick={() => setCurrentFolder(f.id)} className="cursor-pointer bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-3 hover:border-blue-500 transition-colors">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                      <span className="text-sm font-medium dark:text-white">{f.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assets Grid */}
            <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Files</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {assets.map(asset => (
                <div key={asset.id} onClick={() => asset.processingStatus === 'COMPLETED' && onSelect(asset.url)} className={`group relative cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all shadow-sm ${asset.processingStatus === 'COMPLETED' ? 'hover:border-blue-500 hover:shadow-md' : 'opacity-70 cursor-not-allowed'}`}>
                  <div className="aspect-square bg-gray-100 dark:bg-gray-900 relative flex items-center justify-center">
                    {asset.processingStatus === 'COMPLETED' ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={asset.thumbnailUrl || asset.url} alt={asset.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <svg className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-xs font-medium text-gray-500">Processing...</span>
                      </div>
                    )}
                  </div>
                  <div className="p-2 text-xs truncate dark:text-gray-300 flex justify-between items-center">
                    <span>{asset.name}</span>
                    {asset.processingStatus === 'FAILED' && <span className="text-red-500 font-bold" title="Processing Failed">!</span>}
                  </div>
                </div>
              ))}
              
              {assets.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500">
                  No images found in this folder.
                </div>
              )}
            </div>
          </div>
          
          {/* Right Panel Scaffold */}
          <div className="w-80 border-l border-gray-200 dark:border-gray-800 p-6 overflow-y-auto bg-white dark:bg-gray-900">
            <h3 className="text-lg font-medium dark:text-white mb-4">Media Details</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Select an image to view details, crop, adjust focus point, or view usage tracking.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
