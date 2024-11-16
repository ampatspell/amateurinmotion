<script lang="ts">
  let {
    title,
    path,
  }: {
    title: string;
    path: string;
  } = $props();

  let isIndex = $derived(path === '/');
</script>

<div class="header" class:is-index={isIndex}>
  <a class="title" href="/">{title}</a>
</div>

<style lang="scss">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: var(--height);
    padding: 0 30px;
    gap: 10px;
    > .title {
      font-size: 21px;
      font-weight: 500;
      text-decoration: none;
    }
    &.is-index {
      color: #fff;
    }
  }
</style>
