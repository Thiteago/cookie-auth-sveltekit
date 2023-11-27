<script>
  import { user } from '$lib/stores/user.js'
  export let data
  $user = data.user
</script>
<h1>User info :</h1>
<pre>{JSON.stringify($user, null, 2)}</pre>
<slot />
