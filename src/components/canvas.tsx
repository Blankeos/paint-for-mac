import { useDrawingContext } from '@/stores/drawing.context';
import { cn } from '@/utils/cn.util';
import * as fabric from 'fabric'; // v6
import panzoom from 'panzoom';
import { createEffect, onCleanup, onMount, VoidProps } from 'solid-js';
type CanvasProps = {
  class?: string;
};

export function Canvas(props: VoidProps<CanvasProps>) {
  const { canvasSize } = useDrawingContext();

  let panZoomContainerRef!: HTMLDivElement;
  let canvasRef!: HTMLCanvasElement;
  let canvas: fabric.Canvas | undefined;

  onMount(() => {
    const panzoomInstance = panzoom(panZoomContainerRef, {
      beforeMouseDown: function (e) {
        // If mouse down is not the scroll button, then ignore
        if (e.button !== 0) {
          return false;
        }

        return true;
      },
    });

    const options = {};

    canvas = new fabric.Canvas(canvasRef, options);

    onCleanup(() => {
      canvas!.dispose();
      panzoomInstance.dispose();
    });
  });

  createEffect(() => {
    if (!canvas) return;

    canvas!.setWidth(canvasSize.width);
    canvas.renderAll();
  });

  createEffect(() => {
    if (!canvas) return;

    canvas.setHeight(canvasSize.height);
    canvas.renderAll();
  });

  return (
    <div class="h-full overflow-hidden">
      <span class="text-xs text-neutral-500">
        {canvasSize.height} {canvasSize.height}
      </span>
      <div
        class="flex h-full w-full select-none items-center justify-center"
        aria-hidden
        ref={panZoomContainerRef}
      >
        <canvas class={cn(props.class, 'select-none')} ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
