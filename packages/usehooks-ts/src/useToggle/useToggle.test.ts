import { act, renderHook } from '@testing-library/react'

import { useToggle } from './useToggle'

describe('use toggle()', () => {
  it('should use toggle be ok', () => {
    const { result } = renderHook(() => useToggle())
    const [value, toggle, setValue] = result.current

    expect(value).toBe(false)
    expect(typeof toggle).toBe('function')
    expect(typeof setValue).toBe('function')
  })

  it('should default value works', () => {
    const { result } = renderHook(() => useToggle(true))
    const [value] = result.current

    expect(value).toBe(true)
  })

  it('setValue should mutate the value', () => {
    const { result } = renderHook(() => useToggle())
    const [, , setValue] = result.current

    expect(result.current[0]).toBe(false)

    act(() => {
      setValue(true)
    })

    expect(result.current[0]).toBe(true)

    act(() => {
      setValue(prev => !prev)
    })

    expect(result.current[0]).toBe(false)
  })

  it('toggle should mutate the value', () => {
    const { result } = renderHook(() => useToggle())
    const [, toggle] = result.current

    expect(result.current[0]).toBe(false)

    act(() => {
      toggle()
    })

    expect(result.current[0]).toBe(true)

    act(() => {
      toggle()
    })

    expect(result.current[0]).toBe(false)
  })
})
