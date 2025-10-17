import { Model } from '@ampatspell/base/utils/model';
import type { SeoData } from './loaders';
import { resolveImagePreset } from '@ampatspell/directus/utils';

export class SeoModel extends Model<{ data: { seo?: SeoData | null } }> {
  readonly seo = $derived(this.options.data.seo);

  readonly title = $derived(this.seo?.title);
  readonly metaDescription = $derived(this.seo?.meta_description);

  readonly image = $derived.by(() => {
    const id = this.seo?.og_image;
    if (id) {
      return resolveImagePreset(id, '1200x630');
    }
  });
}
