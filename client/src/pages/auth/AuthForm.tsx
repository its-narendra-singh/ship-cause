import React from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

type Mode = 'signup' | 'signin' | 'add';

interface AuthFormProps {
    mode: Mode;
    error: string;
    initialValues?: {
        name?: string;
        email?: string;
    };
    onSubmit: (values: { name?: string; email: string; password: string }) => void;
}

const FormWrapper = styled(Box)`
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  margin: auto;
  box-shadow: 0 0 20px rgba(0,0,0,0.08);
  font-family: 'Raleway', sans-serif;
`;

const SubmitButton = styled(Button)`
  background-color: #6a1b9a;
  padding-block: 1rem;
  color: white;
  font-weight: 600;
  margin-top: 16px;
  text-transform: none;

  &:hover {
    background-color: #4a148c;
  }
`;

const AuthForm: React.FC<AuthFormProps> = ({ mode, error, initialValues, onSubmit }) => {
    const [formValues, setFormValues] = React.useState({
        name: initialValues?.name || '',
        email: initialValues?.email || '',
        password: '',
    });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formValues);
    };

    const showNameField = mode === 'signup' || mode === 'add';

    return (
        <FormWrapper component="form" onSubmit={handleSubmit}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
                {mode === 'signup' && 'Sign Up'}
                {mode === 'signin' && 'Sign In'}
                {mode === 'add' && 'Add Profile'}
            </Typography>

            <Grid container direction="column" spacing={2}>
                {showNameField && (
                    <Grid item>
                        <TextField
                            label="Name"
                            fullWidth
                            variant="outlined"
                            value={formValues.name}
                            onChange={handleChange('name')}
                        />
                    </Grid>
                )}

                <Grid item>
                    <TextField
                        label="Email"
                        fullWidth
                        variant="outlined"
                        value={formValues.email}
                        onChange={handleChange('email')}
                        type="email"
                    />
                </Grid>

                <Grid item>
                    <TextField
                        label="Password"
                        fullWidth
                        variant="outlined"
                        value={formValues.password}
                        onChange={handleChange('password')}
                        type="password"
                    />
                </Grid>

                {error !== '' && (
                    <Typography color='error'>{error}</Typography>
                )}

                <Grid item>
                    <SubmitButton type="submit" fullWidth>
                        {mode === 'signup' && 'Create Account'}
                        {mode === 'signin' && 'Log In'}
                        {mode === 'add' && 'Add'}
                    </SubmitButton>
                </Grid>
            </Grid>
        </FormWrapper>
    );
};

export default AuthForm;
