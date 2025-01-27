/**
 * 第三方登陆页
 */
import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import theme from "../../theme";

// preview-start
const providers = [
    { id: 'github', name: 'GitHub' },
    { id: 'google', name: 'Google' },
    { id: 'instagram', name: 'Instagram' }
];

// preview-end

const signIn = async (provider) => {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Sign in with ${provider.id}`);
            resolve();
        }, 500);
    });
    return promise;
};

export default function OAuthSignInPage() {
    return (
        // preview-start
        <AppProvider theme={theme}>
            <SignInPage signIn={signIn} providers={providers}/>
        </AppProvider>
        // preview-end
    );
}
