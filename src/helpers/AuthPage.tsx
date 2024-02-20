import { useAtom } from "jotai";
import { useRouter } from "next/router";

const AuthPage = ({ children }) => {
	// checks whether we are on client / browser or server.
	if (typeof window !== "undefined") {
		const Router = useRouter();

		const user = JSON.parse(localStorage.getItem("user"));

		// If there is no access token we redirect to "/" page.
		if (!user) {
			//Router.push("/auth/sign-in").then(() => {});
			Router.replace("/auth/sign-in").then(() => {});
			return null;
		}

		return <>{children}</>;

		// If this is an accessToken we just ren    r the component that was passed with all its props
	}

	// If we are on server, return null
};

export default AuthPage;
