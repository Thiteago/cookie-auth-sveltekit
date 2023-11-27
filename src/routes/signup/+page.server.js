import { user } from '$lib/stores/user.js'
import { redirect } from '@sveltejs/kit'

export const actions = {
  default: async ({ cookies, request, fetch}) => {
    const data = await request.formData()
    const email = data.get('email')
    const password = data.get('password')
    const name = data.get('name')

    if (
			typeof email !== 'string' ||
			typeof password !== 'string' ||
			!email ||
			!password
		) {
			return {
        status: 400,
        body: {
          success: false,
        }
      }
		}

    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email,
          password,
          name
        }
      })
    })

    if (response.ok) {
      const data  = await response.json()
      cookies.set('user', JSON.stringify(data.user))
      cookies.set('jwt', response.headers.get('Authorization'))
      let obj = {
        ...data,
        jwt: response.headers.get('Authorization')
      }
      user.set(obj)

      throw redirect(302, '/')
    } else {
      const { errors } = await response.json()
      return {
        status: 400,
        body: {
          success: false,
          errors
        }
      }
    }
  }
}