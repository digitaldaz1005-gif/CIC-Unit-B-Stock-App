import './style.css'
import { renderHistory } from './historyPage'
const app = document.querySelector<HTMLDivElement>('#app')!

type StockItem = {
  core: string
  location: string
  quantity: number
}

let stock: StockItem[] = JSON.parse(
  localStorage.getItem('cicStock') || '[]'
)

if (stock.length === 0) {
  stock = [
    { core: '1001', location: 'A01', quantity: 250 },
    { core: '1002', location: 'B04', quantity: 125 },
    { core: '1003', location: 'C02', quantity: 80 }
  ]
}

function saveStock() {
  localStorage.setItem('cicStock', JSON.stringify(stock))
}


function renderHome() {

  app.innerHTML = `
    <div class="app">

      <header class="header">

        <img 
          src="/logo.png" 
          alt="Capital Injection Ceramics"
          class="logo"
        >

        <h1>CIC Unit B Stock App</h1>

        <p class="creator">Stock Management System <p class ="created-by">Created by Daryl Chambers

      </header>


      <main class="dashboard">


        <div class="card">
          <h2>📦 Stock</h2>
          <button id="stockBtn">Open</button>
        </div>


        <div class="card">
          <h2>📥 Goods In</h2>
          <button id="goodsInBtn">Open</button>
        </div>


        <div class="card">
          <h2>📤 Goods Out</h2>
          <button id="goodsOutBtn">Open</button>
        </div>


        <div class="card">
          <h2>📊 Reports</h2>
          <button id="reportsBtn">Open</button>
        </div>


        <div class="card">
          <h2>📜 History</h2>
          <button id="historyBtn">Open</button>
        </div>


      </main>

    </div>
  `


  document.getElementById('stockBtn')!.onclick =
    () => renderStock()


  document.getElementById('goodsInBtn')!.onclick =
    renderGoodsIn


  document.getElementById('goodsOutBtn')!.onclick =
    renderGoodsOut


  document.getElementById('reportsBtn')!.onclick =
    renderReports


  document.getElementById('historyBtn')!.onclick =
    () => renderHistory(renderHome)

}
function renderStock() {

  app.innerHTML = `

  <div class="app">

    <header class="header">
      <h1>📦 Stock</h1>
    </header>

    <div class="card">

      <table>

        <thead>
          <tr>
            <th>Core</th>
            <th>Location</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          ${
            stock.map((item,index)=>`

            <tr>
              <td>${item.core}</td>
              <td>${item.location}</td>
              <td>${item.quantity}</td>
              <td>
                <button onclick="deleteStock(${index})">
                  Delete
                </button>
              </td>
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


  document.getElementById('backBtn')!.onclick =
    renderHome

}
function renderGoodsIn() {

  app.innerHTML = `

  <div class="app">

    <header class="header">
      <h1>📥 Goods In</h1>
    </header>


    <div class="card">

      <label>Select existing Core</label>

      <select id="existingCore">

        <option value="">
          -- New Core --
        </option>

        ${
          stock.map(item => `
            <option value="${item.core}">
              ${item.core} (${item.quantity})
            </option>
          `).join('')
        }

      </select>


      <br>


      <label>New Core</label>

      <input 
        id="core"
        placeholder="Enter new core"
      >


      <label>Location</label>

      <input 
        id="location"
        placeholder="Location"
      >


      <label>Quantity</label>

      <input 
        id="quantity"
        type="number"
        placeholder="Quantity"
      >


      <button id="addBtn">
        Add Stock
      </button>


      <br><br>


      <button id="backBtn">
        ← Dashboard
      </button>


    </div>

  </div>

  `


  document.getElementById('addBtn')!.onclick = () => {


    const selectedCore =
      (document.getElementById('existingCore') as HTMLSelectElement).value


    const newCore =
      (document.getElementById('core') as HTMLInputElement).value


    const location =
      (document.getElementById('location') as HTMLInputElement).value


    const quantity =
      Number(
        (document.getElementById('quantity') as HTMLInputElement).value
      )


    if(selectedCore) {

      const existing =
        stock.find(x => x.core === selectedCore)


      if(existing) {

        existing.quantity += quantity

      }


    } else {


      const alreadyExists =
        stock.find(x => x.core === newCore)


      if(alreadyExists) {

        alreadyExists.quantity += quantity

      } else {


        stock.push({

          core: newCore,

          location,

          quantity

        })


      }

    }


    saveStock()

    renderStock()

  }


  document.getElementById('backBtn')!.onclick =
    renderHome

}


function renderGoodsOut() {

  app.innerHTML = `

  <div class="app">

    <header class="header">
      <h1>📤 Goods Out</h1>
    </header>


    <div class="card">


      <select id="outCore">

      ${stock.map(item=>`

        <option value="${item.core}">
        ${item.core} (${item.quantity})
        </option>

      `).join('')}

      </select>


      <input id="outQty" type="number" placeholder="Quantity">


      <button id="removeBtn">
      Remove Stock
      </button>


      <br><br>


      <button id="backBtn">
      ← Dashboard
      </button>


    </div>

  </div>

  `


  document.getElementById('removeBtn')!.onclick = () => {

    const core =
      (document.getElementById('outCore') as HTMLSelectElement).value


    const qty =
      Number(
        (document.getElementById('outQty') as HTMLInputElement).value
      )


    const item =
      stock.find(x=>x.core === core)


    if(item){

      item.quantity -= qty

      if(item.quantity < 0){
        item.quantity = 0
      }

      saveStock()

    }


    renderStock()

  }


  document.getElementById('backBtn')!.onclick = renderHome

}



function renderReports() {

  const total =
    stock.reduce(
      (sum,item)=>sum + item.quantity,
      0
    )


  app.innerHTML = `

  <div class="app">

    <header class="header">
      <h1>📊 Reports</h1>
    </header>


    <div class="card">

      <p>Total lines: ${stock.length}</p>

      <p>Total quantity: ${total}</p>


      <br>


      <button id="backBtn">
      ← Dashboard
      </button>


    </div>

  </div>

  `


  document.getElementById('backBtn')!.onclick = renderHome

}



;(window as any).deleteStock = (index:number)=>{

  stock.splice(index,1)

  saveStock()

  renderStock()

}


renderHome()