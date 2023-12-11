import { getSession } from '../backend/accounts/code/lib/server/sessionStore';


export const handle = (async ({ event, resolve }) => {
    const { cookies } = event;
    const sid = cookies.get('sid');
    if (sid) {
      const session = getSession(sid);
      if (session) {
        event.locals.username = session.username;
        event.locals.roles = session.roles;
      } else {
        // remove invalid/expired/unknown cookie
        cookies.delete('sid');
      }
    }
  
    const response = await resolve(event);
    return response;
  });