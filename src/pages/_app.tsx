import {type AppType} from "next/app";

import {api} from "~/utils/api";

import {type Session} from "next-auth";
import {SessionProvider} from "next-auth/react";

import {ThemeProvider} from "next-themes";
import "~/styles/globals.css";

const MyApp: AppType<{session: Session | null}> = ({Component, pageProps: {session, ...pageProps}}) => {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
