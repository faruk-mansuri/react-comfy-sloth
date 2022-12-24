import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <Wrapper>
        <div className='loader'></div>
      </Wrapper>
    );
  }
  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    );
  }
  return children;
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;

  .loader {
    margin: 5rem, 0;
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default AuthWrapper;
