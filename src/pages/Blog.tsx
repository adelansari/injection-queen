import { Navigate } from 'react-router-dom';

// Redirect old blog URLs to new BlogIndex
export function Blog() {
  return <Navigate to="/blog" replace />;
}

export default Blog;
