'use client';

import { useState, useCallback, useRef } from 'react';

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  enabled?: boolean;
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  enabled = true,
}: UseSwipeOptions): SwipeHandlers {
  const startX = useRef(0);
  const startY = useRef(0);
  const currentX = useRef(0);
  const isSwiping = useRef(false);
  const [dx, setDx] = useState(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (!enabled) return;
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    currentX.current = startX.current;
    isSwiping.current = true;
    setDx(0);
  }, [enabled]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!enabled || !isSwiping.current) return;
    const touch = e.touches[0];
    currentX.current = touch.clientX;
    const diffX = currentX.current - startX.current;
    const diffY = touch.clientY - startY.current;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      setDx(diffX);
    }
  }, [enabled]);

  const onTouchEnd = useCallback(() => {
    if (!enabled || !isSwiping.current) return;
    isSwiping.current = false;

    const diff = currentX.current - startX.current;

    if (diff < -threshold && onSwipeLeft) {
      onSwipeLeft();
    } else if (diff > threshold && onSwipeRight) {
      onSwipeRight();
    }

    setDx(0);
  }, [enabled, threshold, onSwipeLeft, onSwipeRight]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}

export function useSwipeWithFeedback(options: UseSwipeOptions & { onSwipeProgress?: (progress: number) => void }) {
  const { onSwipeLeft, onSwipeRight, threshold = 50, enabled = true, onSwipeProgress } = options;
  const startX = useRef(0);
  const startY = useRef(0);
  const currentX = useRef(0);
  const isSwiping = useRef(false);
  const [dx, setDx] = useState(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (!enabled) return;
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    currentX.current = startX.current;
    isSwiping.current = true;
    setDx(0);
  }, [enabled]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!enabled || !isSwiping.current) return;
    const touch = e.touches[0];
    currentX.current = touch.clientX;
    const diffX = currentX.current - startX.current;
    const diffY = touch.clientY - startY.current;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      e.preventDefault();
      setDx(diffX);
      onSwipeProgress?.(diffX / threshold);
    }
  }, [enabled, threshold, onSwipeProgress]);

  const onTouchEnd = useCallback(() => {
    if (!enabled || !isSwiping.current) return;
    isSwiping.current = false;

    const diff = currentX.current - startX.current;

    if (diff < -threshold && onSwipeLeft) {
      onSwipeLeft();
    } else if (diff > threshold && onSwipeRight) {
      onSwipeRight();
    }

    setDx(0);
    onSwipeProgress?.(0);
  }, [enabled, threshold, onSwipeLeft, onSwipeRight, onSwipeProgress]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    dx,
  };
}
