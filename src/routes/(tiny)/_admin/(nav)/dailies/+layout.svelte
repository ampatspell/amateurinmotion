<script lang="ts">
  import { useListLayout } from '@ampatspell/tiny/layout/list/layout';
  import { getter } from '@ampatspell/tiny/utils/options';
  import Label from '@ampatspell/tiny/list/item/label';
  import List from '@ampatspell/tiny/layout/list/list';
  import { page } from '$app/state';
  import { markFunction } from '@ampatspell/tiny/utils/mark';
  import { isTruthy } from '@ampatspell/tiny/utils/array';
  import { resolve } from '$app/paths';
  import { getDailies, type DailySummaryData } from '#lib/dailies/dailies.remote.js';
  import { useAddDaily } from '#lib/dailies/daily.svelte.js';

  let { children } = $props();
  let data = $derived(await getDailies({ files: false }));
  let add = useAddDaily({ data: getter(() => data) });

  let layout = useListLayout({
    models: getter(() => data),
    selected: getter(() => page.params.id),
    item,
    add: markFunction(add.onAdd),
    route: resolve('/daily'),
  });
</script>

{#snippet item(model: DailySummaryData)}
  {@const label = [`#${model.number}`, model.caption].filter(isTruthy).join(' – ')}
  <Label {label} description={model.date} />
{/snippet}

<List {layout}>
  {@render children()}
</List>
