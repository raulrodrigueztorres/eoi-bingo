const container = document.querySelector('.container');
let roleSidePlayer = '';
let roleSideCPU = '';
let roleSideHype = '';

function createGame() {
	const gameBoard = document.createElement('div');
	roleSideHype = createRoleSide();
	roleSidePlayer = createRoleSide();
	roleSideCPU = createRoleSide();

	gameBoard.classList.add('gameBoard');
	roleSidePlayer.classList.add('player');
	roleSideHype.classList.add('bingoHype');
	roleSideCPU.classList.add('cpu');

	gameBoard.appendChild(roleSidePlayer);
	gameBoard.appendChild(roleSideHype);
	gameBoard.appendChild(roleSideCPU);
	container.appendChild(gameBoard);

	generateTicker(roleSidePlayer, 'PLAYER');
	generateHype(roleSideHype);
	generateTicker(roleSideCPU, 'CPU');
}

function createRoleSide() {
	const roleSide = document.createElement('div');
	const roleName = document.createElement('div');
	const board = document.createElement('div');
	const boardContent = document.createElement('div');

	roleSide.classList.add('roleSide');
	roleName.classList.add('roleName');
	board.classList.add('board');
	boardContent.classList.add('boardContent');

	board.appendChild(boardContent);
	roleSide.appendChild(roleName);
	roleSide.appendChild(board);

	return roleSide;
}

function generateTicker(roleSide, name) {
	const boardContent = roleSide.querySelector('.boardContent');
	const arrayNumers = [];
	const boxs = 15;

	roleSide.querySelector('.roleName').textContent = name;

	for (let i = 0; i < boxs; ++i) {
		let random = Math.floor(Math.random() * (90 - 1) + 1);
		while (arrayNumers.includes(random)) {
			random = Math.floor(Math.random() * (90 - 1) + 1);
		}
		arrayNumers.push(random);
	}

	for (const number of arrayNumers) {
		const box = document.createElement('div');
		box.classList.add('box', 'normalNumbers');
		box.textContent = number;
		boardContent.appendChild(box);
	}
}

function generateHype(hypeSide) {
	const boardContent = hypeSide.querySelector('.boardContent');
	const hype = document.createElement('div');
	const button = document.createElement('div');

	hype.classList.add('hype');
	button.classList.add('throwButton');

	button.textContent = 'EXTRACT NUMBER';

	boardContent.appendChild(hype);
	boardContent.appendChild(button);

	hypeSide.querySelector('.roleName').textContent = 'BINGO';

	const pool = generateHypePool();

	button.addEventListener('click', () => {
		if (pool.length !== 0) {
			const value = pool.shift();
			hype.textContent = value;
			checkValue(value);
		} else hype.textContent = '-';
	});
}

function generateHypePool() {
	const pool = [];
	const maxPool = 90;

	for (let i = 1; i < maxPool; ++i) pool.push(i);

	return pool.sort(() => Math.random() - 0.5);
}

function checkValue(value) {
	const player = roleSidePlayer.querySelectorAll('.box');
	const cpu = roleSideCPU.querySelectorAll('.box');

	for (const element of player) {
		if (Number(element.textContent) === value) {
			element.classList.add('crossedOutNumber');
			break;
		}
	}

	for (const element of cpu) {
		if (Number(element.textContent) === value) {
			element.classList.add('crossedOutNumber');
			break;
		}
	}

	isEndGame();
}

function isEndGame() {
	const playerCrossedOut = roleSidePlayer.querySelectorAll(
		'.crossedOutNumber'
	);
	const cpuCrossedOut = roleSideCPU.querySelectorAll('.crossedOutNumber');

	if (playerCrossedOut.length === 15 && cpuCrossedOut.length === 15)
		endGame('DRAW');
	else if (playerCrossedOut.length === 15) endGame('WIN PLAYER');
	else if (cpuCrossedOut.length === 15) endGame('WIN CPU');
}

function endGame(result) {
	const hype = roleSideHype.querySelector('.hype');
	const button = roleSideHype.querySelector('.throwButton');

	hype.textContent = result;
	hype.style = 'font-size: 1.5vh';

	button.addEventListener('click', () => {
		container.innerHTML = '';
		createGame();
	});

	button.textContent = 'RESTART';
}

createGame();
