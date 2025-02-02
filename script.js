let players = [];

function initializePlayers() {
    let numPlayers = parseInt(document.getElementById("numPlayers").value);
    let playersTable = document.getElementById("players");
    playersTable.innerHTML = "";
    players = [];

    for (let i = 0; i < numPlayers; i++) {
        players.push({ balance: 1500, day: 1, credit: 0 });

        playersTable.innerHTML += `
            <tr>
                <td>Joueur ${i + 1}</td>
                <td id="balance-${i}" class="balance">1500</td>
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
    let amountInput = document.getElementById(`amount-${player}`);
    let balanceCell = document.getElementById(`balance-${player}`);
    let amount = parseFloat(amountInput.value);
    
    if (isNaN(amount) || amount <= 0) return;

    if (action === 'add') {
        players[player].balance += amount;
    } else if (action === 'sub' && players[player].balance >= amount) {
        players[player].balance -= amount;
    }

    balanceCell.textContent = players[player].balance;
    amountInput.value = "";
}

function takeLoan(player) {
    players[player].credit += 1000;
    players[player].balance += 1000;
    document.getElementById(`balance-${player}`).textContent = players[player].balance;
    document.getElementById(`credits-${player}`).textContent = players[player].credit;
}

function repayLoan(player) {
    if (players[player].credit >= 500 && players[player].balance >= 500) {
        players[player].credit -= 500;
        players[player].balance -= 500;
        document.getElementById(`balance-${player}`).textContent = players[player].balance;
        document.getElementById(`credits-${player}`).textContent = players[player].credit;
    }
}

function changeDay(player, delta) {
    players[player].day += delta;
    if (players[player].day < 1) players[player].day = 1;
    document.getElementById(`day-${player}`).textContent = players[player].day;
}

function rollDice() {
    document.getElementById("dice-result").textContent = `🎲 ${Math.floor(Math.random() * 6) + 1}`;
}

window.onload = initializePlayers;
