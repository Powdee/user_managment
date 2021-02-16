<svelte:head>
	<title>Login | User managment</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<script lang="ts">

  import { link, push } from 'svelte-spa-router'
  import UsersManagement from '../../api';
  import Button from "../../components/button.svelte";
  import { currentUser, isUserLoggedIn } from '../../store';

  let email: string | null = null
  let password: string | null = null
  let loginBody: UsersManagement.ILogin = {
    email,
    password
  }

  const handleInputChange = (e: Event| any) =>
    loginBody = { ...loginBody, [e.target.name]: e.target.value }

  const handleLogin = async () => {
    try {
      const api = UsersManagement.API;
      const jwt = UsersManagement.JWT;
      const response = await api.login(loginBody);
      const accessToken = response.accessToken

      const paresedJwt = jwt.parseJwt(response.accessToken)
      const userId = paresedJwt?.id
      const firstName = paresedJwt?.firstName
      const lastName = paresedJwt?.lastName
      const store = [
        { item: 'JWT-accessToken', value: accessToken }
      ]
      jwt.storeInLocalStorage(store)

      isUserLoggedIn.set(true)
      currentUser.set({
        id: userId,
        firstName,
        lastName
      })
      push('/users/')
    } catch(e: unknown) {
      throw new Error('Something went wrong')
    }
  }
</script>

<section class="h-screen w-full flex flex-col justify-center items-center">
  <h2 class="text-primary text-4xl font-primary mb-8">Sign In</h2>
  <form on:submit|preventDefault={handleLogin} class="bg-white shadow-md w-2/5 grid grid-cols-1 gap-6 p-20">
    <label class="block">
      <span>E-mail address</span>
      <input on:input={handleInputChange} name="email" placeholder="jane@example.com" type="email" class="mt-1 block w-full shadow-sm"/>
    </label>

    <label class="block">
      <span>Password</span>
      <input on:input={handleInputChange} type="password" name="password" class="mt-1 block w-full  shadow-sm"/>
    </label>
    
    <Button type="submit" name="Sign in" />
  </form>
  <span class="text-secondary text-md font-primary mt-4">
    Don't have an account ?
    <a class="text-primary" href="/signup/" use:link>Create an account</a>
  </span>
</section>