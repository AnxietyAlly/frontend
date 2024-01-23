import { getSession } from "/src/lib/server/sessionStore";

export const handle = (async ({ event, resolve }) => {
	const { cookies } = event;
	const sid = cookies.get("sid");
	if (sid) {
		const session = getSession(sid);
		if (session) {
			event.locals.name = session.name;
			event.locals.email = session.email;
		} else {
			// remove invalid/expired/unknown cookie
			cookies.delete("sid");
		}
	}
  
	const response = await resolve(event);
	return response;
});