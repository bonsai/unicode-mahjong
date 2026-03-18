// src/index.ts
// Universal Emoji Mahjong - Works on CLI and Web

// --- Constants and Type Definitions ---

type TileType = 'm' | 'p' | 's' | 'z'; // 萬子，筒子，索子，字牌
type Tile = {
  type: TileType;
  number: number; // 1-9 (字牌は 1-7: 東西南北白發中)
  str: string;    // Display emoji
};

// Tile emojis (Unicode Mahjong tiles)
const TILE_EMOJIS: Record<string, string> = {
  '1m': '🀇', '2m': '🀈', '3m': '🀉', '4m': '🀊', '5m': '🀋', '6m': '🀌', '7m': '🀍', '8m': '🀎', '9m': '🀏',
  '1p': '🀙', '2p': '🀚', '3p': '🀛', '4p': '🀜', '5p': '🀝', '6p': '🀞', '7p': '🀟', '8p': '🀠', '9p': '🀡',
  '1s': '🀐', '2s': '🀑', '3s': '🀒', '4s': '🀓', '5s': '🀔', '6s': '🀕', '7s': '🀖', '8s': '🀗', '9s': '🀘',
  '1z': '🀀', '2z': '🀁', '3z': '🀂', '4z': '🀃', // 東南西北
  '5z': '🀆', '6z': '🀅', '7z': '🀄', // 白發中
};

const TILE_NAMES: Record<string, string> = {
  '1m': '一萬', '2m': '二萬', '3m': '三萬', '4m': '四萬', '5m': '五萬', '6m': '六萬', '7m': '七萬', '8m': '八萬', '9m': '九萬',
  '1p': '一筒', '2p': '二筒', '3p': '三筒', '4p': '四筒', '5p': '五筒', '6p': '六筒', '7p': '七筒', '8p': '八筒', '9p': '九筒',
  '1s': '一索', '2s': '二索', '3s': '三索', '4s': '四索', '5s': '五索', '6s': '六索', '7s': '七索', '8s': '八索', '9s': '九索',
  '1z': '東', '2z': '南', '3z': '西', '4z': '北',
  '5z': '白', '6z': '發', '7z': '中',
};

// --- Tile Creation ---

function createTile(type: TileType, number: number): Tile {
  const key = `${number}${type}`;
  return {
    type,
    number,
    str: TILE_EMOJIS[key] || '🀄',
  };
}

function getTileName(tile: Tile): string {
  const key = `${tile.number}${tile.type}`;
  return TILE_NAMES[key] || '未知';
}

// --- Deck Creation ---

function createDeck(): Tile[] {
  const deck: Tile[] = [];
  
  // 萬子 (1-9) x 4 each
  for (let i = 1; i <= 9; i++) {
    for (let j = 0; j < 4; j++) {
      deck.push(createTile('m', i));
    }
  }
  
  // 筒子 (1-9) x 4 each
  for (let i = 1; i <= 9; i++) {
    for (let j = 0; j < 4; j++) {
      deck.push(createTile('p', i));
    }
  }
  
  // 索子 (1-9) x 4 each
  for (let i = 1; i <= 9; i++) {
    for (let j = 0; j < 4; j++) {
      deck.push(createTile('s', i));
    }
  }
  
  // 字牌 (東西南北白發中) x 4 each
  for (let i = 1; i <= 7; i++) {
    for (let j = 0; j < 4; j++) {
      deck.push(createTile('z', i));
    }
  }
  
  return deck;
}

// --- Shuffle ---

function shuffleDeck(deck: Tile[]): Tile[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// --- Hand Management ---

class MahjongGame {
  private deck: Tile[];
  private hand: Tile[];
  private discardedTiles: Tile[];
  private isGameActive: boolean;
  private currentDrawnTile: Tile | null;
  
  constructor() {
    this.deck = [];
    this.hand = [];
    this.discardedTiles = [];
    this.isGameActive = false;
    this.currentDrawnTile = null;
  }
  
  startGame(): void {
    this.deck = shuffleDeck(createDeck());
    this.hand = [];
    this.discardedTiles = [];
    this.isGameActive = true;
    this.currentDrawnTile = null;
    
    // Deal 13 tiles to player
    for (let i = 0; i < 13; i++) {
      this.hand.push(this.deck.pop()!);
    }
    
    // Sort hand for better visibility
    this.sortHand();
    
    // Draw first tile
    this.drawTile();
  }
  
  private sortHand(): void {
    const typeOrder: Record<TileType, number> = { 'm': 0, 'p': 1, 's': 2, 'z': 3 };
    this.hand.sort((a, b) => {
      if (typeOrder[a.type] !== typeOrder[b.type]) {
        return typeOrder[a.type] - typeOrder[b.type];
      }
      return a.number - b.number;
    });
  }
  
  private drawTile(): boolean {
    if (this.deck.length === 0) {
      this.isGameActive = false;
      console.log('🀄 牌がなくなりました。流局です！');
      return false;
    }
    
    this.currentDrawnTile = this.deck.pop()!;
    this.hand.push(this.currentDrawnTile);
    this.sortHand();
    
    return true;
  }
  
  discardTile(index: number): boolean {
    if (!this.isGameActive || index < 0 || index >= this.hand.length) {
      return false;
    }
    
    const discardedTile = this.hand.splice(index, 1)[0];
    this.discardedTiles.push(discardedTile);
    
    console.log(`捨てる牌：${discardedTile.str} (${getTileName(discardedTile)})`);
    
    // Check for win (14 tiles -> after drawing, before discarding would be win check)
    // Simplified: just check if we have a winning hand pattern
    if (this.checkWin()) {
      console.log('🎉 🀄🀄🀄 アガリ！🀄🀄🀄 🎉');
      this.isGameActive = false;
      return true;
    }
    
    // Draw next tile
    if (!this.drawTile()) {
      return true;
    }
    
    return false;
  }
  
  private checkWin(): boolean {
    // Simplified win check - just for demonstration
    // A real implementation would check for complete sets (mentsu) and a pair (atama)
    // This is a placeholder that always returns false for now
    // Implementing full yaku/hand pattern checking is complex
    
    // Basic check: 14 tiles total (13 + 1 drawn)
    if (this.hand.length !== 14) {
      return false;
    }
    
    // For a real game, you'd check:
    // - 4 sets of 3 tiles (sequences or triplets)
    // - 1 pair (2 identical tiles)
    // - Various yaku (winning patterns)
    
    return false; // Placeholder - implement full logic as needed
  }
  
  getHand(): Tile[] {
    return [...this.hand];
  }
  
  getDiscardedTiles(): Tile[] {
    return [...this.discardedTiles];
  }
  
  getCurrentDrawnTile(): Tile | null {
    return this.currentDrawnTile;
  }
  
  isGameActiveGame(): boolean {
    return this.isGameActive;
  }
  
  getDeckCount(): number {
    return this.deck.length;
  }
}

// --- CLI Interface ---

function runCLI(): void {
  const game = new MahjongGame();
  game.startGame();
  
  console.log('\n🀄 絵文字麻雀 - CLI 版 🀄');
  console.log('========================\n');
  
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  function displayHand(): void {
    const hand = game.getHand();
    console.log('\n你的手牌:');
    hand.forEach((tile, index) => {
      const isNewest = tile === game.getCurrentDrawnTile();
      const marker = isNewest ? ' ←ツモ' : '';
      console.log(`  ${index + 1}. ${tile.str} (${getTileName(tile)})${marker}`);
    });
    console.log(`\n残り牌数：${game.getDeckCount()}枚`);
    console.log(`捨て牌：${game.getDiscardedTiles().map(t => t.str).join(' ')}`);
  }
  
  function prompt(): void {
    if (!game.isGameActiveGame()) {
      console.log('\nゲーム終了！');
      readline.close();
      return;
    }
    
    displayHand();
    
    readline.question('\n捨てる牌の番号を入力してください (1-14): ', (input: string) => {
      const index = parseInt(input, 10) - 1;
      
      if (isNaN(index) || index < 0 || index >= 14) {
        console.log('無効な入力です。1-14 の番号を入力してください。');
        prompt();
        return;
      }
      
      const isWin = game.discardTile(index);
      if (isWin) {
        readline.close();
        return;
      }
      
      prompt();
    });
  }
  
  prompt();
}

// --- Web Interface ---

declare global {
  interface Window {
    mahjongGame: MahjongGame | null;
    initWebGame: () => void;
    discardTile: (index: number) => void;
  }
}

function initWebGame(): void {
  const game = new MahjongGame();
  game.startGame();
  window.mahjongGame = game;
  
  updateWebDisplay();
}

function discardTile(index: number): void {
  const game = window.mahjongGame;
  if (!game) return;
  
  const isWin = game.discardTile(index);
  updateWebDisplay();
  
  if (isWin) {
    alert('🎉 アガリ！ 🎉');
  }
}

function updateWebDisplay(): void {
  const game = window.mahjongGame;
  if (!game) return;
  
  const handContainer = document.getElementById('hand');
  const discardedContainer = document.getElementById('discarded');
  const deckCountEl = document.getElementById('deck-count');
  
  if (!handContainer || !discardedContainer || !deckCountEl) return;
  
  // Display hand
  const hand = game.getHand();
  const currentTile = game.getCurrentDrawnTile();
  
  handContainer.innerHTML = hand.map((tile, index) => {
    const isNewest = tile === currentTile;
    const isNewestClass = isNewest ? 'newest-tile' : '';
    return `
      <button class="tile-button ${isNewestClass}" onclick="discardTile(${index})" title="${getTileName(tile)}">
        ${tile.str}
      </button>
    `;
  }).join('');
  
  // Display discarded tiles
  const discarded = game.getDiscardedTiles();
  discardedContainer.innerHTML = discarded.map(tile => 
    `<span class="discarded-tile" title="${getTileName(tile)}">${tile.str}</span>`
  ).join(' ');
  
  // Display deck count
  deckCountEl.textContent = `残り牌数：${game.getDeckCount()}枚`;
}

// --- Auto-detect Environment ---

// Check if running in Node.js CLI
const isNode = typeof process !== 'undefined' && process.versions?.node;
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

if (isNode && !isBrowser) {
  // CLI mode
  runCLI();
} else if (isBrowser) {
  // Web mode - expose functions globally
  window.mahjongGame = null;
  window.initWebGame = initWebGame;
  window.discardTile = discardTile;
}

// Export for module usage
export { MahjongGame, Tile, initWebGame, discardTile };
