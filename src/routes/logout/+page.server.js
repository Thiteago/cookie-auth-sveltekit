import { redirect } from '@sveltejs/kit'

export const actions = {
  default: async ({ cookies}) => {
    cookies.set('user', null)
    throw redirect(302, '/')
  }

}