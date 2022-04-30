export type Position = { x: number, y: number }

/**
 * Options for the drag-resistant click event listener
 */
export type DragResistantClickEventListenerOptions = {
  /**
   * The element to add the listener to
   */
  element: HTMLElement
  /**
   * Function to call when a click happens
   */
  onClick: (mouseDownEvent: MouseEvent, mouseUpEvent: MouseEvent) => void
  /**
   * Function to call when mouse dragging above `thresholdPx` has occured, and thus the
   * click listening has been cancelled.
   */
  onCancel?: (mouseDownEvent: MouseEvent, mouseMoveEvent: MouseEvent) => void
  /**
   * How far the mouse has to drag away from the initial mouse-down position to cancel
   * the click listening. Default: 10
   */
  thresholdPx?: number
}

export const distanceBetween = (p1: Position, p2: Position) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

export const addDragResistantClickEventListener = (options: DragResistantClickEventListenerOptions) => {
  const thresholdPx = options.thresholdPx ?? 10

  options.element.addEventListener('mousedown', e => {
    const startPosition: Position = { x: e.screenX, y: e.screenY }

    let onMouseMove: (_e: MouseEvent) => void
    let onMouseUp: (_e: MouseEvent) => void

    onMouseUp = _e => {
      options.onClick(e, _e)
      options.element.removeEventListener('mouseup', onMouseUp)
    }

    onMouseMove = _e => {
      const endPosition: Position = { x: _e.screenX, y: _e.screenY }
      if (distanceBetween(startPosition, endPosition) > thresholdPx) {
        options.element.removeEventListener('mouseup', onMouseUp)
        options.element.removeEventListener('mousemove', onMouseUp)
        options.onCancel?.(e, _e)
      }
    }

    options.element.addEventListener('mouseup', onMouseUp)
    options.element.addEventListener('mousemove', onMouseMove)
  })
}
