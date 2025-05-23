<script lang="ts">
  import Layout from '$d2/components/layout.svelte';
  import Header from '$lib/components/header.svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { subscribe } from '$d2/lib/base/model/subscriber.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  $effect(() => subscribe(data.index));
  let index = $derived(data.index.node);
  let title = $derived(index?.title);

  let fonts = ['https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap'];
</script>

<Layout {fonts}>
  <div class="frontend">
    <Header {title} />
    <div class="content">
      {@render children()}
    </div>
  </div>
</Layout>

<style lang="scss">
  .frontend {
    --header-height: 80px;
    --padding: 30px;
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family: 'Raleway', sans-serif;
    font-size: 13px;
    font-weight: 400;
    cursor: default;
    padding: var(--header-height) 0 0 0;
    > .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>
