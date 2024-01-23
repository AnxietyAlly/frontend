import { deleteSession } from "/src/lib/server/sessionStore";
import { redirect } from "@sveltejs/kit";

export const load = (({ cookies }) => {
	const sid = cookies.get("sid");
	if (sid) {
		deleteSession(sid);
	}

	throw redirect(307, "/");
});