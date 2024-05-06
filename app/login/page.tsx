'@layout null'

import InputField from '@/components/InputField';
import { Box, Container } from '@mui/material';
import React from 'react';

const Login = () => {
  return (
    <div className="bg-[#182237] rounded-lg py-7 min-h-[520px] mt-20">
    <Container maxWidth="sm" className="">
        <Box>
            <h2 className="text-center font-bold text-3xl">
                Sign-in your account
            </h2>
            <form className="flex flex-col items-center md:w-[95%] mt-10 mx-auto space-y-3">
                <InputField
                    label="Username *"
                    placeholder="Enter username"
                    name="username"
                    required
                />
                <InputField
                    label="Password *"
                    placeholder="Enter password"
                    name="password"
                    required
                />
                <button
                    type="submit"
                    className="py-2 px-5 bg-[#5d57c9] hover:bg-[#39357e] text-white font-medium rounded-md">
                    Sign-in
                </button>
            </form>
        </Box>
    </Container>
</div>
  );
}

export default Login;