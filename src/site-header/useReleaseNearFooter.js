import { useEffect, useState } from 'react';

/**
 * Whether the page's footer is in view, and whether that change should animate.
 * The header is `position: sticky`; it releases once the footer scrolls into
 * view so it doesn't sit pinned on top of it. `instant` is true for a release
 * caused by anything other than the visitor's own scroll/resize (e.g. content
 * loading in and pushing the footer around), so that correction doesn't look
 * like the header sliding in for no reason.
 */
const useReleaseNearFooter = (footerSelectorProp) => {
  // '' also needs the fallback: the plugin framework can pass it, and
  // querySelector('') throws.
  const footerSelector = footerSelectorProp || 'footer';
  const [state, setState] = useState({ inView: false, instant: true });

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    let footerNode = document.querySelector(footerSelector);
    let ticking = false;
    let rafId = null;
    // Reset each flush; a real interaction (false) beats an instant one (true)
    // scheduled in the same frame.
    let pendingInstant = true;

    const checkFooterVisibility = (instant) => {
      const inView = !!footerNode && footerNode.getBoundingClientRect().top < window.innerHeight;
      // Return the previous object when unchanged so setState can bail out.
      setState((previous) => (
        (previous.inView === inView && previous.instant === instant) ? previous : { inView, instant }
      ));
    };

    const flush = () => {
      ticking = false;
      const instant = pendingInstant;
      pendingInstant = true;
      checkFooterVisibility(instant);
    };

    const scheduleCheck = (instant) => {
      if (!instant) {
        pendingInstant = false;
      }
      if (!ticking) {
        ticking = true;
        rafId = window.requestAnimationFrame(flush);
      }
    };

    const onUserInteraction = () => scheduleCheck(false);

    const findInNode = (node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return null;
      }
      if (node.matches(footerSelector)) {
        return node;
      }
      return node.querySelector(footerSelector);
    };

    // True if footerNode itself, or an ancestor of it, was removed.
    const removalContainsFooter = (removedNodes) => {
      for (let i = 0; i < removedNodes.length; i += 1) {
        const removed = removedNodes[i];
        if (removed === footerNode
          || (removed.nodeType === Node.ELEMENT_NODE && removed.contains(footerNode))) {
          return true;
        }
      }
      return false;
    };

    const footerObserver = new MutationObserver((mutations) => {
      let justRemoved = false;
      if (footerNode) {
        if (!mutations.some((mutation) => removalContainsFooter(mutation.removedNodes))) {
          return;
        }
        footerNode = null;
        justRemoved = true;
      }

      // Check this same batch for a replacement before concluding there's none -
      // a slot swap removes and re-adds the footer in one commit.
      for (let i = 0; i < mutations.length; i += 1) {
        const { addedNodes } = mutations[i];
        for (let j = 0; j < addedNodes.length; j += 1) {
          const found = findInNode(addedNodes[j]);
          if (found) {
            footerNode = found;
            checkFooterVisibility(true);
            return;
          }
        }
      }

      if (justRemoved) {
        checkFooterVisibility(true);
      }
    });
    footerObserver.observe(document.body, { childList: true, subtree: true });

    // Catches content-height changes (e.g. a spinner replaced by real content)
    // that don't fire scroll, resize, or a footer add/remove.
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => scheduleCheck(true)) : null;
    resizeObserver?.observe(document.body);

    checkFooterVisibility(true);
    window.addEventListener('scroll', onUserInteraction, { passive: true });
    window.addEventListener('resize', onUserInteraction);

    return () => {
      window.removeEventListener('scroll', onUserInteraction);
      window.removeEventListener('resize', onUserInteraction);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      footerObserver.disconnect();
      resizeObserver?.disconnect();
    };
  }, [footerSelector]);

  return state;
};

export default useReleaseNearFooter;
