import { redirect } from "@sveltejs/kit";

const public_paths = [
  '/signup',
  '/signin'
];

function isPathAllowed(path) {
  return public_paths.some(allowedPath =>
    path === allowedPath || path.startsWith(allowedPath + '/')
  );
}

export const handle = async ({ event, resolve}) => {
  let user = null
  if(event.cookies.get('user') != undefined && event.cookies.get('user') != null){
    user = JSON.parse(event.cookies.get('user'))
  }
  const url = new URL(event.request.url);

  if (!user && !isPathAllowed(url.pathname)) {
    throw redirect(302, '/signin');
  }

  if(user){
    event.locals.user = user

    if(url.pathname == '/signup' || url.pathname == '/signin'){
      throw redirect(302, '/')
    }
  }

  const response = await resolve(event)

  return response
}