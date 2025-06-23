import React, { useState } from 'react';
import { BlogFormData } from '../types';

interface BlogFormProps {
  onSubmit: (data: BlogFormData) => void;
  isLoading: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({ onSubmit, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      setError('Please enter a topic for your blog');
      return;
    }

    setError(null);
    onSubmit({ topic });
  };

  const generatePreviewTitle = () => {
    if (!topic.trim()) return 'Your Blog Title';
    
    return topic
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">AI Blog Generator</h2>
        
        <div className="tabs">
          <div 
            className={`tab ${!showPreview ? 'active' : ''}`} 
            onClick={() => setShowPreview(false)}
          >
            Editor
          </div>
          <div 
            className={`tab ${showPreview ? 'active' : ''}`} 
            onClick={() => setShowPreview(true)}
          >
            Preview
          </div>
        </div>

        {!showPreview ? (
          <div className="form-group">
            <label htmlFor="topic">Blog Topic</label>
            <textarea
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic or idea for your blog post"
              rows={3}
            />
            <small style={{ color: '#666', display: 'block', marginTop: '0.5rem' }}>
              Be specific for better results. For example: "Benefits of meditation for stress reduction"
            </small>
          </div>
        ) : (
          <div className="preview-container">
            <h3 className="preview-heading">Preview</h3>
            <h2>{generatePreviewTitle()}</h2>
            <p>
              Your AI-generated blog will include an introduction, main sections with headings, 
              and a conclusion about {topic || 'your chosen topic'}.
            </p>
            <p>
              The blog will be well-structured with proper formatting and will provide valuable 
              information about {topic || 'the topic'} including key benefits, applications, and best practices.
            </p>
          </div>
        )}
        
        {error && (
          <div className="error">{error}</div>
        )}
        
        <button 
          type="submit" 
          disabled={isLoading || !topic.trim()}
          style={{ width: '100%' }}
        >
          {isLoading ? 'Generating...' : 'Generate Blog'}
        </button>
      </form>
    </div>
  );
};

export default BlogForm; 