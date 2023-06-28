import {type AppType} from "next/app";

import {api} from "~/utils/api";

import {type Session} from "next-auth";
import {SessionProvider} from "next-auth/react";

import {Toaster} from "~/components/ui/toaster";

import {ThemeProvider} from "next-themes";
import "~/styles/globals.css";

const MyApp: AppType<{session: Session | null}> = ({Component, pageProps: {session, ...pageProps}}) => {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <Toaster />
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
