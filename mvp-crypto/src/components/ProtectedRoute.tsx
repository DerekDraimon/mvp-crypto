import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const isLogged = localStorage.getItem('isLogged') === 'true';

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return children;
}
