import { IconChevronRight } from '@/assets/icons/icons';
import { cn } from '@/utils/cn.util';
import Popover from 'corvu/popover';
import { FlowProps, JSX, mergeProps, Show, VoidProps } from 'solid-js';

type ToolSectionProps = {
  title: string;
  containerClassName?: string;
  className?: string;
};

/**
 *
 * TODO make this draggable in the future and dockable.
 * @returns
 */
export const ToolSection = (props: FlowProps<ToolSectionProps>) => {
  return (
    <div class={cn('flex flex-col items-center justify-between gap-y-2', props.containerClassName)}>
      <div class={cn('flex items-center justify-center', props.className)}>{props.children}</div>
      <span class="text-sm">{props.title}</span>
    </div>
  );
};

type ToolProps = {
  /** Will appear in tooltip. */
  title?: string;
  icon?: JSX.Element;
  /**
   * Dropdown orientation. When 'vertical' it will be at the bottom.
   * When 'horizontal' it will be at the right.
   * @defaultValue 'vertical'
   */
  orientation?: 'horizontal' | 'vertical';
  options?: { label: JSX.Element; onClick: () => void }[];
};

ToolSection.Tool = (props: VoidProps<ToolProps>) => {
  const _props = mergeProps({ orientation: 'vertical' as const }, props);

  return (
    <Show
      when={_props.options}
      fallback={<button class="rounded p-1 focus:outline-none focus:ring">{_props.icon}</button>}
    >
      <Popover
        floatingOptions={{
          offset: 13,
          flip: true,
          shift: true,
        }}
      >
        <Popover.Trigger class="group focus:outline-none">
          <div
            class={`flex items-center gap-1 rounded p-1 group-focus:ring ${_props.orientation === 'vertical' ? 'flex-col' : 'flex-row'}`}
          >
            {_props.icon}
            <span class="relative flex h-4 w-4 items-center justify-center">
              <IconChevronRight class="absolute rotate-90" width={12} height={12} />
            </span>
          </div>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content class="animate-in fade-in zoom-in-90 slide-in-from-top-1 min-w-20 rounded-lg bg-neutral-50 p-2 text-sm focus:outline-none">
            <Popover.Label class="font-bold">{_props.title}</Popover.Label>
            <div class="flex flex-col"></div>
            <Popover.Arrow />
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </Show>
  );
};
