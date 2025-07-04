
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DocumentContextType {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  translatedContent: string | null;
  setTranslatedContent: (content: string | null) => void;
  extractedFeatures: string[] | null;
  setExtractedFeatures: (features: string[] | null) => void;
  scopeOfWork: string | null;
  setScopeOfWork: (scope: string | null) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};

export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);
  const [extractedFeatures, setExtractedFeatures] = useState<string[] | null>(null);
  const [scopeOfWork, setScopeOfWork] = useState<string | null>(null);

  return (
    <DocumentContext.Provider
      value={{
        uploadedFile,
        setUploadedFile,
        translatedContent,
        setTranslatedContent,
        extractedFeatures,
        setExtractedFeatures,
        scopeOfWork,
        setScopeOfWork,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
