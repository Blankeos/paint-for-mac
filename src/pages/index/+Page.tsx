import {
  IconClipboard,
  IconCopy,
  IconFloppyDisk,
  IconPaintBrush,
  IconScissors,
  IconSizes,
} from '@/assets/icons/icons';
import { Canvas } from '@/components/canvas';
import { ToolSection } from '@/components/tool-section';
import { useDrawingContext } from '@/stores/drawing.context';
import { invoke } from '@tauri-apps/api/tauri';
import { createSignal } from 'solid-js';

export default function Page() {
  const { canvasSize, setCanvasSize } = useDrawingContext();

  const [greetMsg, setGreetMsg] = createSignal('');
  const [name, setName] = createSignal('');

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name: name() }));
  }

  return (
    <div class="flex h-screen min-w-[600px] flex-col">
      <nav class="flex h-max flex-shrink-0 border-b">
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

      <div class="flex-1 overflow-hidden bg-gray-100">
        <Canvas class="border bg-white" />
      </div>

      <footer class="flex gap-x-1 p-0.5 text-xs">
        <div class="flex items-center px-2">
          <input
            class="w-8 bg-transparent outline-none"
            value={canvasSize.width}
            onInput={(e) => setCanvasSize({ width: parseInt(e.target.value) })}
          />
          x
          <input
            class="w-8 bg-transparent text-end outline-none"
            value={canvasSize.height}
            onInput={(e) => setCanvasSize({ height: parseInt(e.target.value) })}
          />
        </div>
        <div class="h-full w-[1px] bg-neutral-200" />
        <div class="flex h-full items-center gap-x-1 px-1">
          <IconFloppyDisk class="" width={14} height={14} />
          <span>Size: 1.3MB</span>
        </div>
      </footer>
    </div>
  );
}
