# Authoring the docs

Guides live in `src/content/docs`. Keep their paths and heading anchors stable.
Add pages to `src/lib/navigation.ts`; the same list drives the sidebar and
previous/next links. Frontmatter requires `title` and `description`.

Import components from `src/components/content/index` with the appropriate
relative path. They render with Astro and MDX; no client framework is required.
Use `shared/Icon.astro` for interface icons. It renders official Lucide SVGs;
keep decorative icons hidden from assistive technology and label icon-only
buttons. Avoid Unicode arrows or other text glyphs as icon substitutes.

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
| `SvgDiagram` | Responsive vector flows and relationships | `title`, `description`, `nodes`: id, label, detail, optional layer; `edges`: from, to; mobile layouts stack vertically |
| `Command` | Copyable terminal instructions with syntax highlighting | `command`, optional `shell` (`bash`, `sh`, `powershell`), `title`; supports multiline commands |
| `Path`, `PathList` | Copyable file and folder locations | Path: `value`, optional `description`, `kind` (`folder` or `file`); PathList: optional accessible `label` |
| `FileTree` | Collapsible folder and file examples | Optional `title`, `items`: name, children, description, highlighted, open; copies the full structure |
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
builds. Markdown images automatically use the same expandable viewer through
`ContentImage.astro`, including legacy images and images in tables. Brand icons
and logos remain part of the navigation. No external image service is required.

Run `pnpm --filter applio-docs type-check` and `pnpm build`. The build generates
Pagefind search. Preview that build with `pnpm --filter applio-docs preview` to
exercise search; `astro dev` does not generate its index. Check the guides on a
phone-width viewport and verify keyboard operation after changing components.

The docs use self-hosted Syne and normal letter spacing for navigation and
reading. Colors still share the app theme tokens. At widths up to 1024px, the
navigation opens in a native dialog with keyboard focus containment and Escape
support; a separate mobile table of contents keeps long guides navigable. The
same `DocsNavigation.astro` component renders the desktop and drawer links.
Scrollbar colors and responsive layout rules live in `src/styles/docs.css`.

For file layouts, use `FileTree` instead of a plain text code block. A node with
`children` is a folder; other nodes are files. Folders open by default; set
`open: false` to start one collapsed. Native lists and disclosures support
keyboard interaction and work without JavaScript. Copy includes collapsed files.

```mdx
import { FileTree } from '../../../components/content/index';

<FileTree title="Dataset files" items={[
  { name: 'assets/datasets/MyVoice', children: [
    { name: '0', description: 'Speaker 0', children: [
      { name: 'recording.wav' },
    ] },
  ] },
]} />
```

For storage locations, use `Path` to show the exact copyable path and its purpose.
Use `PathList` to group related locations. Long paths wrap on small screens;
paths remain selectable without JavaScript. `kind="file"` switches the icon.

```mdx
import { Path, PathList } from '../../../components/content/index';

<PathList label="Training locations">
  <Path value="assets/datasets" description="Training recordings." />
  <Path value="logs/MyVoice/config.json" kind="file" description="Experiment configuration." />
</PathList>
```

Use `Command` for commands users can run. Set `shell` for syntax highlighting
and a default shell label, or override `title`. Copy preserves the command text,
including quotes, backslashes, and line breaks; no prompt is added. Long lines
wrap on phones. Use ordinary fenced code blocks for output or configuration.

```mdx
import { Command } from '../../../components/content/index';

<Command command={'python app.py --port 6970'} />
```

Use `SvgDiagram` for relationships, formulas, and data flow rather than treating
explanations as executable code. Edges reference node IDs; nodes with the same
`layer` align together for branches or merges. Keep labels concise and include a
plain-language `description` with the exact meaning or a worked example. SVGs
include accessible labels and reflow vertically on phones without JavaScript.
