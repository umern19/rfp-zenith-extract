
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DocumentItem {
  id: string;
  file: File;
  name: string;
  uploadedAt: Date;
  translatedContent?: string;
  extractedFeatures?: string[];
  scopeOfWork?: string;
}

interface DocumentContextType {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  translatedContent: string | null;
  setTranslatedContent: (content: string | null) => void;
  extractedFeatures: string[] | null;
  setExtractedFeatures: (features: string[] | null) => void;
  scopeOfWork: string | null;
  setScopeOfWork: (scope: string | null) => void;
  documentHistory: DocumentItem[];
  addToHistory: (file: File) => void;
  selectDocument: (documentId: string) => void;
  currentDocumentId: string | null;
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
  const [documentHistory, setDocumentHistory] = useState<DocumentItem[]>([]);
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(null);

  const addToHistory = (file: File) => {
    const newDocument: DocumentItem = {
      id: Date.now().toString(),
      file,
      name: file.name,
      uploadedAt: new Date(),
      translatedContent: null,
      extractedFeatures: null,
      scopeOfWork: null,
    };
    
    setDocumentHistory(prev => [newDocument, ...prev.slice(0, 9)]); // Keep last 10 documents
    setCurrentDocumentId(newDocument.id);
    setUploadedFile(file);
    setTranslatedContent(null);
    setExtractedFeatures(null);
    setScopeOfWork(null);
  };

  const selectDocument = (documentId: string) => {
    const document = documentHistory.find(doc => doc.id === documentId);
    if (document) {
      setCurrentDocumentId(documentId);
      setUploadedFile(document.file);
      setTranslatedContent(document.translatedContent || null);
      setExtractedFeatures(document.extractedFeatures || null);
      setScopeOfWork(document.scopeOfWork || null);
    }
  };

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
        documentHistory,
        addToHistory,
        selectDocument,
        currentDocumentId,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
