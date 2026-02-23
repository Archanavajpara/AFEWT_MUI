import React, { useState } from 'react';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submittedData, setSubmittedData] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmittedData({ email, password });

        // Clear inputs after submit
        setEmail('');
        setPassword('');
    };

    return (
        <>
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>

            {submittedData && (
                <div>
                    <h3>Submitted Data:</h3>
                    <p>Email: {submittedData.email}</p>
                    <p>Password: {submittedData.password}</p>
                </div>
            )}
        </>
    );
}

export default LoginForm;