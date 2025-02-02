let players = [];
let calcExpression = "";

function initializePlayers() {
    let numPlayers = parseInt(document.getElementById("numPlayers").value);
    let playersTable = document.getElementById("players");
    playersTable.innerHTML = "";
    players = [];

    for (let i = 0; i < numPlayers; i++) {
        players.push({ balance: 1500, day: 1, creditCount: 0 });

        playersTable.innerHTML += `
            <tr>
                <td>Joueur ${i + 1}</td>
                <td id="balance-${i}">1500</td>
                <td>
                    <button onclick="changeDay(${i}, -1)">◀</button>
                    <span id="day-${i}">1</span>
                    <button onclick="changeDay(${i}, 1)">▶</button>
                </td>
                <td id="credits-${i}">0</td>
                <td>
                    <input type="number" id="amount-${i}" placeholder="€">
                    <button onclick="updateBalance(${i}, 'add')">+</button>
                    <button onclick="updateBalance(${i}, 'sub')">-</button>
                    <button onclick="takeLoan(${i})">Crédit</button>
                    <button onclick="repayLoan(${i})">Remb.</button>
                </td>
            </tr>
        `;
    }
}

function updateBalance(player, action) {
    let amount = parseFloat(document.getElementById(`amount-${player}`).value);
    if (isNaN(amount) || amount <= 0) return;

    if (action === 'add') players[player].balance += amount;
    else if (action === 'sub' && players[player].balance >= amount) players[player].balance -= amount;

    document.getElementById(`balance-${player}`).textContent = players[player].balance;
}

function takeLoan(player) {
    players[player].creditCount++;
    players[player].balance += 1500;
    document.getElementById(`balance-${player}`).textContent = players[player].balance;
    document.getElementById(`credits-${player}`).textContent = players[player].creditCount;
}

function repayLoan(player) {
    if (players[player].creditCount > 0) {
        let repayment = Math.ceil(1500 * 1.1); // Arrondi à l'unité supérieure
        if (players[player].balance >= repayment) {
            players[player].balance -= repayment;
            players[player].creditCount--;
            document.getElementById(`balance-${player}`).textContent = players[player].balance;
            document.getElementById(`credits-${player}`).textContent = players[player].creditCount;
        }
    }
}

function changeDay(player, delta) {
    players[player].day = (players[player].day + delta - 1 + 31) % 31 + 1;
    document.getElementById(`day-${player}`).textContent = players[player].day;
}

function rollDice() {
    document.getElementById("dice-result").textContent = `🎲 ${Math.floor(Math.random() * 6) + 1}`;
}

// SCRIPT CALCULATRICE
function calcInput(value) {
    calcExpression += value;
    document.getElementById("calc-screen").textContent = calcExpression;
}

function calcOperation(op) {
    calcExpression += ` ${op} `;
    document.getElementById("calc-screen").textContent = calcExpression;
}

function calcCalculate() {
    try {
        document.getElementById("calc-screen").textContent = eval(calcExpression);
        calcExpression = "";
    } catch {
        document.getElementById("calc-screen").textContent = "Erreur";
    }
}

function calcClear() {
    calcExpression = "";
    document.getElementById("calc-screen").textContent = "0";
}

window.onload = initializePlayers;
