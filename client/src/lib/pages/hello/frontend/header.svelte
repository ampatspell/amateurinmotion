<script lang="ts">
  let {
    title,
    fontSize,
  }: { title: string; fontSize: number; } = $props();
</script>

<div class="header">
  <div class="content">
    <div class="title" style:--font-size="{fontSize}px">
      {title}
    </div>
  </div>
</div>

<style lang="scss">
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    > .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      > .title {
        font-size: var(--font-size);
      }
    }
  }
</style>
