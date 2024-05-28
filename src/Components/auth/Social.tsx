import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Button } from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react';

export const Social = () => {
    const { data: session } = useSession();
    // const router = useRouter();

    const handleGoogleSignIn = async () => {
        await signIn('google');
        // if (session && router) {
        //     router.push('/user/PrincipalPage');
        // }
    };
    const hancleFacebookSignIn = async () => {
        await signIn('facebook');
        // if (session && router) {
        //     router.push('/user/PrincipalPage');
        // }
    }

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size="lg"
                className="w-full bg-transparent border-2"
                onClick={handleGoogleSignIn}
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button
                size="lg"
                className="w-full bg-transparent border-2"
                onClick={hancleFacebookSignIn}
            >
                <FaFacebook color="#3b5998" className="h-5 w-5" />
            </Button>
        </div>
    );
};
