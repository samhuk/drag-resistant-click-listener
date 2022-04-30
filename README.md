# drag-resistant-click-listener

## Summary

This package provides the ability to add a click listener to an element that will only call the provided click event handler when the mouse has not been dragged far from the initial mouse-down position.

This is useful, for example, when you have element(s) that you want to have both on-click *and* on-drag behaviour. A real-world example of this is when you want to have an element that will do something on-click (e.g. navigate the user), but you also want the text inside the element to be selectable, or perhaps you want the element to be draggable to be moved around, etc.

## Usage

`npm install drag-resistant-click-listener`

```typescript
import { addDragResistantClickListener } from 'drag-resistant-click-listener'

const element = document.createElement('div')
addDragResistantClickListener({
  element,
  onClick: () => console.log('element was clicked!'),
  onCancel: () => console.log('element click was cancelled. We are now dragging!')
})
```
