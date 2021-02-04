import {$} from "@/core/dom"

export function resizeHandler($root, event) {
    const $target = $(event.target)
    const $parent = $target.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
    const type = $target.data.resize
    let value
    $target.addClass('resize-active')
    document.onmousemove = e => {
        if (type === 'column') {
            const delta = e.pageX - coords.right
            value = coords.width + delta
            $parent.css({
                width: value + 'px'
            })
        } else {
            const delta = e.pageY - coords.bottom
            value = coords.height + delta
            $parent.css({
                height: value + 'px'
            })
        }
    }

    document.onmouseup = () => {
        cells.forEach(el => el.style.width = value + 'px')
        $target.removeClass('resize-active')

        document.onmousemove = null
        document.onmouseup = null
    }
}