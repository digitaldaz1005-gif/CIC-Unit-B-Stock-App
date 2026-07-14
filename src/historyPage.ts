import { loadHistory } from './history'

const app = document.querySelector<HTMLDivElement>('#app')!

export function renderHistory(back: () => void) {

  const history = loadHistory()

  app.innerHTML = `

  <div class="app">

    <header class="header">
      <h1>📜 Stock History</h1>
    </header>

    <div class="card">

      <table class="stock-table">

        <thead>
          <tr>
            <th>Type</th>
            <th>Core</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>

        ${
          history.map(item => `

          <tr>
            <td>${item.type}</td>
            <td>${item.core}</td>
            <td>${item.quantity}</td>
            <td>${item.date}</td>
          </tr>

          `).join('')
        }

        </tbody>

      </table>

      <br>

      <button id="backBtn">
      ← Dashboard
      </button>

    </div>

  </div>

  `

  document.getElementById('backBtn')!.onclick = back
}