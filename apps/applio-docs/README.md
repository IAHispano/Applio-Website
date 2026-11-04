# Authoring the docs

Guides live in `src/content/docs`. Keep their paths and heading anchors stable.
Add pages to `src/lib/navigation.ts`; the same list drives the sidebar and
previous/next links. Frontmatter requires `title` and `description`.

Import components from `src/components/content/index` with the appropriate
relative path. They render with Astro and MDX; no client framework is required.

| Component | Purpose | Props |
| --- | --- | --- |
| `Card`, `CardGrid` | Related tasks and next steps | Card: `title`, optional `icon`; Markdown body |
| `Steps` | Detailed ordered instructions | Wrap a Markdown ordered list |
| `Tabs`, `TabItem` | Interface, platform, or mode variants | TabItem: `label`; supports arrow keys, Home, End, and heading links |
| `Aside` | A short note, tip, caution, or danger | `type`, optional `title`; Markdown body |
| `Screenshot` | A captioned, expandable image | Imported image `src`, descriptive `alt`, `caption`, optional `interfaceName`, `loading` |
| `Comparison` | Help readers choose between approaches | `title`; `options`: name, description, points, href, action |
| `Workflow` | Explain the stages before detailed instructions | `title`; `steps`: title, description, optional href |
| `Accordion`, `AccordionGroup` | Troubleshooting and optional explanations | Accordion: `title`, optional `open`; Markdown body |
| `Checklist` | Let readers track prerequisites or review steps | `title`, string array `items`; page-local checkboxes |
| `PitchExample` | Explore the relationship between semitones and frequency | No props; a clearly labelled 220 Hz example |

Use components where they help someone decide or complete a task. Keep core
instructions visible and use accordions for independent questions. Tables remain
useful for parameter reference. Keep screenshots inside the relevant interface tab,
explain what readers should look at, and never imply an empty workspace is a
completed operation.

For example, in a `getting-started/` guide:

```mdx
import { Screenshot, Tabs, TabItem, Checklist } from '../../../components/content/index';
import { desktop, gradio } from '../../../../../../shared/screenshots';

<Checklist title="Before you begin" items={['Finish engine setup', 'Add a voice model']} />

<Tabs>
  <TabItem label="Desktop">
    <Screenshot src={desktop.conversion} alt="Desktop conversion controls" caption="Choose the model before adding your recording." interfaceName="Desktop 1.0.7" />
  </TabItem>
  <TabItem label="Gradio">
    <Screenshot src={gradio.conversion} alt="Gradio model and audio controls" caption="Model and index controls appear above Audio Source." interfaceName="Gradio 3.7.1" />
  </TabItem>
</Tabs>
```

Screenshot assets and capture provenance live in `shared/screenshots/`; exports
are in `shared/screenshots.ts`. Screenshots share their lightbox with the public
website, work as direct image links without JavaScript, and are included in static
builds. No external image service is required.

Run `pnpm --filter applio-docs type-check` and `pnpm build`. The build generates
Pagefind search. Preview that build with `pnpm --filter applio-docs preview` to
exercise search; `astro dev` does not generate its index. Check the guides on a
phone-width viewport and verify keyboard operation after changing components.
