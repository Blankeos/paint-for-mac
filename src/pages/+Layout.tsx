import '@/styles/App.css';

import { type FlowProps, createSignal } from 'solid-js';

export default function RootLayout(props: FlowProps) {
  return <>{props.children}</>;
}

function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <button
      type="button"
      onClick={() => setCount((count) => count + 1)}
      class="text rounded-lg border border-transparent bg-neutral-900 px-2 py-2 text-white shadow-md hover:border-blue-500"
    >
      Root Counter {count()}
    </button>
  );
}
