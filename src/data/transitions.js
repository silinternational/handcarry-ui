import { quintInOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';

const [svelteSend, svelteReceive] = crossfade({
  duration: 250,

  fallback(node, params) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration: 250,
      easing: quintInOut,
      css: t => `
        transform: ${transform} scale(${t});
        opacity: ${t}
      `
    };
  }
});

export const send = svelteSend
export const receive = svelteReceive
