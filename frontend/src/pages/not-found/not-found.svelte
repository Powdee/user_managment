<svelte:head>
	<title>Not Found | User managment</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<script lang="ts">
  import Button from '../../components/button.svelte';
</script>

<section class="h-screen w-full flex flex-col justify-center items-center">
  <h1 class="text-primary text-7xl font-primary">Oops! Bad luck </h1>
  <Button isLink to="/" width="w-32" name="Go home" />
</section>