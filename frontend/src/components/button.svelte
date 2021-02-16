<script lang="ts">
  import { link } from 'svelte-spa-router'
  // props
  export let name: string;
  export let to: string = '';
  export let isLink: boolean = false;
  export let width: string = 'w-full';
  export let type: string | null = null;
  export let marginTop: string = 'mt-8';
</script>

{#if isLink}
  <button class="{width} h-10 bg-primary {marginTop}">
    <a class="font-primary text-white text-lg" href={to} use:link>{name}</a>
  </button>
{:else}
  <button type={type} on:click class="{width} h-10 bg-primary {marginTop} font-primary text-white text-lg">
    {name}
  </button>
{/if}