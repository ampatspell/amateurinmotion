<script lang="ts">
  import { page } from '$app/state';

  let { title }: { title: string | undefined } = $props();

  let isIndex = $derived(page.url.pathname === '/');

  let scrollY = $state<number>();
  let opacity = $derived.by(() => {
    let max = 300;
    let y = Math.min(scrollY ?? 0, max);
    return 1 - y / max;
  });
</script>

<svelte:window bind:scrollY />

<div class={['header', isIndex && 'index']} style:--opacity={opacity}>
  <a class="title" href="/">{title}</a>
</div>

<style lang="scss">
  .header {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    height: var(--header-height);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 var(--padding);
    opacity: var(--opacity);
    transition: 0.2s ease-in-out color;
    > .title {
      font-size: 21px;
      font-weight: 500;
      text-decoration: none;
    }
    &.index {
      color: #fff;
    }
  }
</style>
