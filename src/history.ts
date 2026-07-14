export type StockMovement = {
  type: 'IN' | 'OUT'
  core: string
  quantity: number
  date: string
}

export function loadHistory(): StockMovement[] {
  return JSON.parse(
    localStorage.getItem('cicHistory') || '[]'
  )
}

export function saveHistory(history: StockMovement[]) {
  localStorage.setItem(
    'cicHistory',
    JSON.stringify(history)
  )
}

export function addMovement(
  movement: StockMovement
) {

  const history = loadHistory()

  history.unshift(movement)

  saveHistory(history)

}