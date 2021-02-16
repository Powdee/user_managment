<script lang="ts">
  import type UsersManagement from '../../api';
  import { currentUser, isUserLoggedIn } from '../../store';

  // Components
  import Button from '../../components/button.svelte';
  import Image from '../../components/image/image.svelte';

  let loggedIn: boolean;

  isUserLoggedIn.subscribe(value => {
    loggedIn = value;
  });

  let user: UsersManagement.ICurrentUser

  currentUser.subscribe((obj: UsersManagement.ICurrentUser) => {
    user = obj
  })
</script>

<svelte:head>
	<title>User managment</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<section class="grid grid-cols-2 gap-4 place-items-center h-screen">
  <aside>
    {#if loggedIn}
      <h1 class="text-primary text-7xl font-primary leading-tight">You're logged in! Welcome {user?.firstName}</h1>
    {:else}
      <h1 class="text-primary text-7xl font-primary leading-tight">Login to see what is behind the curtain</h1>
    {/if}
    
    <Button width="w-32" to="/login/" isLink name={!loggedIn ? 'Log in' : 'See users'} />
  </aside>
  <Image src="home.png" alt="home" className="shadow-md" />
</section>