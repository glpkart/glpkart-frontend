import React from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
    const router = useRouter();

    return (
        <div>
            <button 
                style={{
                    backgroundColor: '#6b7280',
                    border: 'none',
                    color: 'white',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    display: 'block',
                    margin: '10px auto',
                    borderRadius: '5px'
                }}
                onClick={() => router.back()}
            >
                ← Back
            </button>
            <h1>GLPKart Logo</h1>  {/* Assuming this is your logo element */}
            {/* Remaining login form elements here... */}
        </div>
    );
};

export default LoginPage;