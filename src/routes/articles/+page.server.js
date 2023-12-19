import { 
    //error, 
    redirect
} from '@sveltejs/kit';

function IsLoggedIn(locals, cookies) {
    if (!locals?.name) {
        cookies.set('originalUrl', '/articles', {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24
        });
        throw redirect(307, '/login');
    }
};
  
export const load = (({ locals, cookies }) => {
    IsLoggedIn(locals, cookies);
});