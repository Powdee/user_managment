<svelte:head>
	<title>Users | User managment</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<script lang="ts">
  import { onMount } from "svelte";
  import UsersManagement from "../../api";

  // Components
  import Button from "../../components/button.svelte";
  import { currentUser } from "../../store";

  let email: string | null = null
  let firstName: string | null = null
  let lastName: string | null = null
  let password: string | null = null
  let loginBody: UsersManagement.IUser | null = {
    email,
    password,
    firstName,
    lastName
  }

  let users: UsersManagement.ICreateUser[] = []

  let currentUserObject: UsersManagement.ICurrentUser

  currentUser.subscribe((obj: UsersManagement.ICurrentUser) => {
    currentUserObject = obj
  })

  onMount(async () => {
    try {
      const api = UsersManagement.API;
      users = await api.getUsers();
    } catch(e: unknown) {
      throw new Error('Something went wrong')
    }
  })

  const handleInputChange = (e: Event| any) =>
    loginBody = { ...loginBody, [e.target.name]: e.target.value }

  const handleCreate = async () => {
    try {
      const api = UsersManagement.API;
      const response = await api.createUser(loginBody);
      users = [
        ...users,
        {
          id: response.id,
          lastName: response.lastName,
          firstName: response.firstName,
          email: response.email
        }
      ]

      firstName = null
      lastName = null
      email = null
      password = null

      loginBody = null
    } catch(e: unknown) {
      throw new Error('Something went wrong')
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      const api = UsersManagement.API;
      await api.deleteUser(userId);
      users = users.filter(({ id }) => id !== userId)
    } catch(e: unknown) {
      throw new Error('Something went wrong')
    }
  }
</script>

<section class="w-full pt-24 pb-24">
  <h2 class="text-primary text-4xl font-primary mb-8">List of users</h2>
  <form on:submit|preventDefault={handleCreate} class="bg-white shadow-md grid grid-cols-4 gap-6 py-10 px-20">
    <label class="block">
      <span>First name</span>
      <input on:input={handleInputChange} bind:value={firstName} placeholder="Jane" type="text" name="firstName" class="mt-1 block w-full shadow-sm"/>
    </label>

    <label class="block">
      <span>Last name</span>
      <input on:input={handleInputChange} bind:value={lastName} placeholder="Smith" type="text" name="lastName" class="mt-1 block w-full shadow-sm"/>
    </label>
  
    <label class="block">
      <span>E-mail address</span>
      <input on:input={handleInputChange} bind:value={email} placeholder="jane@example.com" name="email" type="email" class="mt-1 block w-full shadow-sm"/>
    </label>

    <label class="block">
      <span>Password</span>
      <input on:input={handleInputChange} bind:value={password} type="password" class="mt-1 block w-full shadow-sm" name="password" />
    </label>
    
    <Button marginTop="mt-2" type="submit" name="Create user" />
  </form>

  <table class="table-auto w-full mt-8 mb-8 shadow-md bg-white">
    <thead class="bg-primary">
      <tr>
        <th class="px-20 py-5 w-1/4 text-left font-primary text-white">Full name</th>
        <th class="px-20 py-5 w-1/4 text-left font-primary text-white">E-mail</th>
        <th class="px-20 py-5 w-1/2"></th>
      </tr>
    </thead>
    <tbody class="mx-20 my-10">
      {#each users as { firstName, lastName, email, id }, i}
        <tr>
          <td class="px-20 py-5 {i === users.length - 1 || 'border-b border-primary-005'} font-primary">{firstName} {lastName}</td>
          <td class="px-20 py-5 {i === users.length - 1 || 'border-b border-primary-005'} font-primary">{email}</td>
          <td class="px-20 py-5 {i === users.length - 1 || 'border-b border-primary-005'} text-right">
            {#if currentUserObject?.id !== id}
              <span class="cursor-pointer font-primary text-primary font-bold" on:click={() => handleDeleteUser(id)}>
                X
              </span>
            {/if}
          </td>
        </tr>
      {:else}
        <p>loading...</p>
      {/each}
    </tbody>
  </table>
</section>