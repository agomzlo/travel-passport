import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(({locals, cookies, redirect, url}, next) => {
    if(!cookies.get("user") && url.pathname !== "/choose-user" && !url.pathname.match(/^[/]api[/]auth[/][a-z&=?]*$/)){
      return redirect("/choose-user");
    }

    locals.user = cookies.has('user') ? JSON.parse(String(cookies.get('user')?.value)) : null;

    return next();
});