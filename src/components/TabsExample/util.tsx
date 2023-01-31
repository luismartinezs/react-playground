type InteractiveElement = HTMLButtonElement | HTMLInputElement

function findElementAncestor(element: HTMLElement, selector: string) {
  let _element: HTMLElement | null = element
  while ((_element = _element.parentElement) && !_element.matches(selector));
  return _element
}

function onSameLevel(target: InteractiveElement, sibling: InteractiveElement, parentSelector: string) {
  return findElementAncestor(target, parentSelector) === findElementAncestor(sibling, parentSelector)
}

function getNextIndex(current: number, elements: InteractiveElement[]): number {
  const next = (current + 1) % elements.length

  return elements[next].disabled ? getNextIndex(next, elements) : next
}

function getPreviousIndex(current: number, elements: InteractiveElement[]): number {
  const total = elements.length
  const previous = (current + total - 1) % total

  return elements[previous].disabled ? getPreviousIndex(previous, elements) : previous
}

export function createScopedKeydownHandler({
  parentSelector,
  siblingSelector,
  activateOnFocus,
}: {
  parentSelector: string
  siblingSelector: string
  activateOnFocus?: boolean
}) {
  return (event: React.KeyboardEvent<InteractiveElement>) => {
    const elements = Array.from(
      findElementAncestor(event.currentTarget, parentSelector)?.querySelectorAll<InteractiveElement>(siblingSelector) ||
        []
    ).filter((node) => onSameLevel(event.currentTarget, node, parentSelector))
    const current = elements.findIndex((el) => event.currentTarget === el)
    const nextIndex = getNextIndex(current, elements)
    const previousIndex = getPreviousIndex(current, elements)

    switch (event.key) {
      case 'ArrowRight':
        event.stopPropagation()
        event.preventDefault()
        elements[nextIndex].focus()
        activateOnFocus && elements[nextIndex].click()
        break
      case 'ArrowLeft':
        event.stopPropagation()
        event.preventDefault()
        elements[previousIndex].focus()
        activateOnFocus && elements[previousIndex].click()
        break
      case 'Home':
        event.stopPropagation()
        event.preventDefault()
        !elements[0].disabled && elements[0].focus()
        break
      case 'End':
        event.stopPropagation()
        event.preventDefault()
        const last = elements.length - 1
        !elements[last].disabled && elements[last].focus()
        break
    }
  }
}
