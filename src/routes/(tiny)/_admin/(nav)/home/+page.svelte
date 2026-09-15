<script lang="ts">
  import { getter } from '@ampatspell/tiny/utils/options';
  import { getHome } from './home.remote';
  import { useHome } from './home.svelte';
  import Editing from '@ampatspell/tiny/layout/editing/editing';
  import { useEditingLayout } from '@ampatspell/tiny/layout/editing/layout';
  import Form from '@ampatspell/tiny/form/form';
  import Fields from '@ampatspell/tiny/form/content/fields';

  let data = $derived(await getHome());
  let model = useHome({ data: getter(() => data) });
  let layout = useEditingLayout({ model });
</script>

<Editing {layout}>
  <Form size="wide">
    <Fields field={model.fields.title} />
    <Fields field={model.fields.background} />
  </Form>
</Editing>
