import { useParams, Navigate } from 'react-router-dom';
import { getPostBySlug, getPostUrl } from '../blog/registry';

// Redirect old slug-based URLs to new date-based URLs
export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  
  if (post) {
    return <Navigate to={getPostUrl(post)} replace />;
  }
  
  return <Navigate to="/blog" replace />;
}

export default BlogPost;
