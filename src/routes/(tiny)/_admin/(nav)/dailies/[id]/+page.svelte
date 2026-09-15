<script lang="ts">
  import { page } from '$app/state';
  import { getter } from '@ampatspell/tiny/utils/options';
  import { useEditingLayout } from '@ampatspell/tiny/layout/editing/layout';
  import Editing from '@ampatspell/tiny/layout/editing/editing';
  import Form from '@ampatspell/tiny/form/form';
  import Content from '@ampatspell/tiny/form/content/content';
  import Fields from '@ampatspell/tiny/form/content/fields';
  import { getDaily } from '#lib/dailies/dailies.remote.js';
  import { useDaily } from '#lib/dailies/daily.svelte.js';

  let id = $derived(page.params.id!);
  let data = $derived(await getDaily({ id }));
  let model = useDaily({ data: getter(() => data) });
  let layout = useEditingLayout({ model });
</script>

<Editing {layout}>
  <Form size="wide">
    <Content>
      <Fields field={model.fields.caption} />
      <Fields field={model.fields.date} />
      <Fields field={model.fields.file} />
    </Content>
  </Form>
</Editing>
