<svelte:head>
	<title>Sign Up | User managment</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<script lang="ts">
  import { push } from "svelte-spa-router";

  // Components
  import UsersManagement from "../../api";
  import Button from "../../components/button.svelte";

  let email: string | null = null
  let firstName: string | null = null
  let lastName: string | null = null
  let password: string | null = null
  let loginBody: UsersManagement.IUser = {
    email,
    password,
    firstName,
    lastName
  }

  const handleInputChange = (e: Event| any) =>
    loginBody = { ...loginBody, [e.target.name]: e.target.value }

  const handleSignUp = async () => {
    try {
      const api = UsersManagement.API;
      await api.signUp(loginBody);
      push('/login/')
    } catch(e: unknown) {
      throw new Error('Something went wrong')
    }
  }
</script>

<section class="h-screen w-full flex flex-col justify-center items-center">
  <h2 class="text-primary text-4xl font-primary mb-8">Create your account</h2>
  <form on:submit|preventDefault={handleSignUp} class="bg-white shadow-md w-2/5 grid grid-cols-1 gap-6 py-10 px-20">
    <label class="block">
      <span>First name</span>
      <input on:input={handleInputChange} name="firstName" placeholder="Jane" type="text" class="mt-1 block w-full shadow-sm"/>
    </label>

    <label class="block">
      <span>Last name</span>
      <input on:input={handleInputChange} name="lastName" placeholder="Smith" type="text" class="mt-1 block w-full shadow-sm"/>
    </label>
  
    <label class="block">
      <span>E-mail address</span>
      <input on:input={handleInputChange} name="email" placeholder="jane@example.com" type="email" class="mt-1 block w-full shadow-sm"/>
    </label>

    <label class="block">
      <span>Password</span>
      <input on:input={handleInputChange} name="password" type="password" class="mt-1 block w-full  shadow-sm"/>
    </label>
    
    <Button type="submit" name="Sign up" />
  </form>
</section>