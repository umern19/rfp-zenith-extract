
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Sparkles } from 'lucide-react';
import { useDocument } from '@/contexts/DocumentContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { setUploadedFile } = useDocument();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file only.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload delay for smooth animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUploadedFile(file);
    setIsUploading(false);
    
    toast({
      title: "Upload Successful",
      description: "Your RFP document has been uploaded successfully.",
    });
    
    // Navigate to translation viewer
    setTimeout(() => {
      navigate('/translate');
    }, 500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Sparkles className="h-16 w-16 text-cyan-400 animate-pulse" />
              <div className="absolute -inset-2 bg-cyan-400/20 rounded-full blur-lg animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tight">
            RFP Insights Assistant
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            AI-powered translation and scope analysis for your RFP documents. 
            Upload, translate, and extract key insights in seconds.
          </p>
        </div>

        {/* Upload Section */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-cyan-400/50 transition-all duration-300">
          <div
            className={`p-12 border-2 border-dashed rounded-2xl transition-all duration-300 ${
              isDragOver 
                ? 'border-cyan-400 bg-cyan-400/10' 
                : 'border-slate-600 hover:border-slate-500'
            } ${isUploading ? 'animate-pulse' : ''}`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
          >
            <div className="text-center space-y-6">
              {isUploading ? (
                <div className="space-y-4">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-400 border-t-transparent mx-auto"></div>
                  <p className="text-cyan-400 text-lg font-medium">Processing your document...</p>
                </div>
              ) : (
                <>
                  <Upload className="h-16 w-16 text-slate-400 mx-auto" />
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-white">Upload your RFP Document</h3>
                    <p className="text-slate-400">
                      Drag and drop your PDF file here, or click to browse
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileInput}
                      className="hidden"
                      id="file-input"
                    />
                    <label htmlFor="file-input">
                      <Button 
                        className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                        asChild
                      >
                        <span className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Choose PDF File
                        </span>
                      </Button>
                    </label>
                    
                    <p className="text-sm text-slate-500">
                      Supported format: PDF (max 10MB)
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: FileText,
              title: "Document Translation",
              description: "AI-powered translation with side-by-side comparison"
            },
            {
              icon: Sparkles,
              title: "Feature Extraction",
              description: "Automatically identify key features and requirements"
            },
            {
              icon: Upload,
              title: "Scope Analysis",
              description: "Extract and structure the scope of work"
            }
          ].map((feature, index) => (
            <Card key={index} className="bg-slate-800/30 backdrop-blur-sm border-slate-700 p-6 hover:border-cyan-400/30 transition-all duration-300 hover:scale-105">
              <div className="text-center space-y-4">
                <feature.icon className="h-8 w-8 text-cyan-400 mx-auto" />
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
