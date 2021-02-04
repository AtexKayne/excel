const CODES = {
    A: 65,
    Z: 90
}

function toCell(_, col) {
    return `
        <div class="cell" contenteditable data-col="${col}"></div>
    `
}

function toCol(el, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${el}
            <div data-resize="column" class="col-resize"></div>
        </div>
    `
}

function createRow(index, content) {
    const resizer = index ? '<div data-resize="row" class="row-resize"></div>' : ''
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${index ? index : ''}
                ${resizer}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const colls = new Array(colsCount)
        .fill()
        .map(toChar)
        .map(toCol)
        .join('')

    rows.push(createRow(null, colls))

    for (let i = 0; i < rowCount; i++) {
        const cells = new Array(colsCount)
            .fill()
            .map(toCell)
            .join('')
        rows.push(createRow(i + 1, cells))
    }

    return rows.join('')
}