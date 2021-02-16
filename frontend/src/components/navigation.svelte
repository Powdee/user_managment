<script lang="ts">
  import { link, push } from 'svelte-spa-router'
  import UsersManagement from '../api';
  import { currentUser, isUserLoggedIn } from '../store';

  let loggedIn;
  let user;

  isUserLoggedIn.subscribe(value => {
    loggedIn = value;
  });
  currentUser.subscribe(obj => {
    user = obj;
  });

  const handleLogout = () => {
    const jwt = UsersManagement.JWT

    jwt.deleteLocalStorage([
      { item: 'JWT-accessToken', value: '' }
    ])
    isUserLoggedIn.set(false)
    currentUser.set(null)
    push('/')
  }

</script>

<header class="fixed w-full z-10">
  <nav class="bg-primary">
    <ul class="flex h-14 justify-between items-center md:container md:mx-auto">
      <li class="text-white font-primary">
        <a href="/" use:link>
          Home
        </a>
        {#if loggedIn}
          <a class="pl-8" href="/users" use:link>
            Users
          </a>
        {/if}
      </li>
      <li class="text-white font-primary">
        {#if loggedIn}
          <span>
            {user?.firstName}
            {user?.lastName}
          </span>
          <span class="pl-4 cursor-pointer" on:click={handleLogout}>
            Log out
          </span>
        {:else}
          <a href="/login" use:link>
            Login
          </a>
        {/if}
      </li>
    </ul>
  </nav>
</header>