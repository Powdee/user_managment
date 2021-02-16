<script lang="ts">
  export let src: string
  export let alt: string

  import IntersectionObserver from './intersection-observer.svelte'
  import Image from './image.svelte'

  import { onMount } from 'svelte'

  let nativeLoading: boolean = false
  onMount(() => {
    if ('loading' in HTMLImageElement.prototype) {
      nativeLoading = true
    }
  })
  
</script>

<IntersectionObserver once={true} let:intersecting={intersecting}>
  {#if intersecting || nativeLoading}
    <Image {alt} {src} />
  {/if}
</IntersectionObserver>