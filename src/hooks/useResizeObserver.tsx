import { useCallback, useMemo, useState } from "react"

export default function useResizeObserver() {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })
  const resizeObserver = useMemo(
    () =>
      new ResizeObserver(([container]) => {
        setSize({
          width: container.contentRect.width,
          height: container.contentRect.height,
        })
      }),
    []
  )
  const measuredRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) resizeObserver.observe(node)
      else resizeObserver.disconnect()
    },
    [resizeObserver]
  )

  return { size, measuredRef }
}
