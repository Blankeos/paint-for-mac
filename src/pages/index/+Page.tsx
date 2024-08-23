import {
  IconClipboard,
  IconCopy,
  IconPaintBrush,
  IconScissors,
  IconSizes,
} from '@/assets/icons/icons';
import { ToolSection } from '@/components/tool-section';
import { invoke } from '@tauri-apps/api/tauri';
import { createSignal } from 'solid-js';

export default function Page() {
  const [greetMsg, setGreetMsg] = createSignal('');
  const [name, setName] = createSignal('');

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name: name() }));
  }

  return (
    <div class="flex h-screen flex-col">
      <nav class="flex border-b">
        <ToolSection title="Clipboard" containerClassName="p-4" className="flex gap-x-2">
          <ToolSection.Tool
            title="Copy"
            icon={<IconClipboard />}
            options={[
              { label: 'Copy', onClick: () => console.log('copy') },
              { label: 'Paste', onClick: () => console.log('paste') },
            ]}
          />
          <div class="flex flex-col gap-y-2">
            <ToolSection.Tool icon={<IconScissors width={18} height={18} />} />
            <ToolSection.Tool icon={<IconCopy width={18} height={18} />} />
          </div>
        </ToolSection>

        <div class="h-full w-[1px] bg-neutral-100"></div>

        <ToolSection title="Image" containerClassName="p-4" className="flex gap-x-2">
          <ToolSection.Tool
            title="Copy"
            icon={<IconClipboard />}
            options={[
              { label: 'Copy', onClick: () => console.log('copy') },
              { label: 'Paste', onClick: () => console.log('paste') },
            ]}
          />
          <div class="flex">
            <div class="flex flex-col">
              <ToolSection.Tool icon={<IconScissors width={18} height={18} />} />
              <ToolSection.Tool icon={<IconCopy width={18} height={18} />} />
            </div>
            <div class="flex flex-col">
              <ToolSection.Tool
                icon={<IconCopy width={18} height={18} />}
                options={[]}
                orientation="horizontal"
              />
              <ToolSection.Tool
                icon={<IconScissors width={18} height={18} />}
                options={[]}
                orientation="horizontal"
              />
            </div>
          </div>
        </ToolSection>

        <div class="h-full w-[1px] bg-neutral-100"></div>

        <ToolSection title="Brushes" containerClassName="p-4" className="flex gap-x-2">
          <ToolSection.Tool icon={<IconPaintBrush />} options={[]} />
        </ToolSection>

        <div class="h-full w-[1px] bg-neutral-100"></div>

        <ToolSection title="Size" containerClassName="p-4" className="flex gap-x-2">
          <ToolSection.Tool icon={<IconSizes />} options={[]} />
        </ToolSection>

        <div class="h-full w-[1px] bg-neutral-100"></div>

        <ToolSection title="Colors" containerClassName="p-4" className="flex gap-x-2">
          <ToolSection.Tool icon={<IconClipboard />} options={[]} />
        </ToolSection>
      </nav>
    </div>
  );
}
