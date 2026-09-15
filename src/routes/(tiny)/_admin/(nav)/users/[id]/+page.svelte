<script lang="ts">
  import { getUserById } from '#lib/users/users.remote.js';
  import { useUserModel } from '#lib/users/users.svelte.js';
  import { page } from '$app/state';
  import Content from '@ampatspell/tiny/form/content/content';
  import Fields from '@ampatspell/tiny/form/content/fields';
  import Form from '@ampatspell/tiny/form/form';
  import Editing from '@ampatspell/tiny/layout/editing/editing';
  import { useEditingLayout } from '@ampatspell/tiny/layout/editing/layout';
  import Section from '@ampatspell/tiny/page/section';
  import { getter } from '@ampatspell/tiny/utils/options';

  let id = $derived(page.params.id!);
  let data = $derived(await getUserById({ id }));

  let model = useUserModel({ data: getter(() => data) });
  let fields = $derived(model.fields);

  let layout = useEditingLayout({
    model,
  });
</script>

<Editing {layout}>
  <Section>
    <Form>
      <Content>
        <Fields field={fields.email} />
        <Fields field={fields.role} />
        <Fields field={fields.password} />
      </Content>
    </Form>
  </Section>
</Editing>
