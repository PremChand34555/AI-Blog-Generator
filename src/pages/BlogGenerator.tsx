import React, { useState } from 'react';
import BlogForm from '../components/BlogForm';
import BlogDisplay from '../components/BlogDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import { generateBlogContent } from '../services/openaiService';
import { Blog, BlogFormData, BlogGeneratorState } from '../types';

const BlogGenerator: React.FC = () => {
  const [state, setState] = useState<BlogGeneratorState>({
    isLoading: false,
    error: null,
    blog: null,
  });

  const handleSubmit = async (data: BlogFormData) => {
    setState({
      ...state,
      isLoading: true,
      error: null,
    });

    try {
      const response = await generateBlogContent(data.topic);
      
      // Create a title from the topic
      const title = data.topic
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      const newBlog: Blog = {
        title,
        content: response.content,
        createdAt: new Date(),
      };
      
      setState({
        isLoading: false,
        error: null,
        blog: newBlog,
      });
    } catch (error) {
      console.error('Error generating blog:', error);
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  const handleNewBlog = () => {
    setState({
      ...state,
      blog: null,
    });
  };

  return (
    <div>
      <div className="header">
        <h1>AI Blog Generator</h1>
        <p>Enter a topic and let AI write a complete blog post for you in seconds</p>
      </div>
      
      <div className="container">
        {state.isLoading ? (
          <LoadingSpinner />
        ) : state.blog ? (
          <BlogDisplay blog={state.blog} onNewBlog={handleNewBlog} />
        ) : (
          <BlogForm onSubmit={handleSubmit} isLoading={state.isLoading} />
        )}

        {state.error && (
          <div 
            style={{
              padding: '1rem',
              backgroundColor: '#fff5f5',
              color: '#e53e3e',
              borderRadius: '4px',
              borderWidth: '1px',
              borderColor: '#feb2b2',
              marginTop: '1rem',
              maxWidth: '600px',
              margin: '1rem auto'
            }}
          >
            {state.error}
          </div>
        )}
        
        <div className="footer">
          <p>© {new Date().getFullYear()} AI Blog Generator | Created with React and OpenAI</p>
        </div>
      </div>
    </div>
  );
};

export default BlogGenerator; 