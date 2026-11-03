import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '@/hooks/use-counter';

// ============================================================================
// Edge Matrix Corporation — useCounter Hook Unit Test
// ============================================================================

describe('useCounter Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with count 0 and startCounting callback', () => {
    const { result } = renderHook(() => useCounter({ end: 100, startOnView: true }));
    
    expect(result.current.count).toBe(0);
    expect(typeof result.current.startCounting).toBe('function');
  });

  it('should immediately start counting if startOnView is false', () => {
    const { result } = renderHook(() => useCounter({ end: 50, startOnView: false, duration: 1000 }));
    
    // Trigger tick and animation loop execution
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.count).toBe(50);
  });

  it('should count up and decelerate when triggered manually via startCounting', () => {
    const { result } = renderHook(() => useCounter({ end: 10, startOnView: true, duration: 500 }));
    
    expect(result.current.count).toBe(0);

    act(() => {
      result.current.startCounting();
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.count).toBe(10);
  });
});
