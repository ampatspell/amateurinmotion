<script lang="ts">
  let { title }: { title: string } = $props();
</script>

<div class="header">
  <div class="content">
    <div class="title">
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
        font-weight: 600;
      }
    }
  }
</style>
