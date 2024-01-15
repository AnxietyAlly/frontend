import { 
	// error, 
	redirect
} from "@sveltejs/kit";

function isLoggedIn(locals, cookies) {
	if (!locals?.name) {
		cookies.set("originalUrl", "/forums-ptsd", {
			path: "/",
			httpOnly: true,
			sameSite: "lax",
			maxAge: 60 * 60 * 24
		});
		throw redirect(307, "/login");
	}
};
  
export const load = (({ locals, cookies }) => {
	isLoggedIn(locals, cookies);
});