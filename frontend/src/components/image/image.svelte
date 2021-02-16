<script lang="ts">
  export let src: string
  export let alt: string
  export let className: string = ''

  import { onMount } from 'svelte'

  let loaded: boolean = false
  let thisImage: any

  onMount(() => {
    thisImage.onload = () => {
      loaded = true
    }
  }) 

</script>

<picture class="relative">
  <div class="image-wrapper" class:loaded>
    <img {src} {alt} bind:this={thisImage} class={className} loading="lazy" />
  </div>
</picture>

<style>
  img {
    max-width: 100%;
    height: 600px;
    position: relative;
  }
  .image-wrapper::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 2s cubic-bezier(0.85, 0, 0.15, 1);
    background-color: #b71540;
  }
  .image-wrapper.loaded::after {
    content: '';
    height: 0;
  }
</style>