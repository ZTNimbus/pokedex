# Pokedex

## Overview
This **Pokédex** application allows users to explore Pokémon data from the first generation (151 Pokémon). Built with **React**, it fetches data dynamically and displays stats, moves, and descriptions. **LocalStorage** is used for caching results, improving performance.

---

## Features
✅ Search Pokémon by name or ID  
✅ View detailed stats, moves, and appearance  
✅ LocalStorage caching for quick access  
🎨 Styled with **FantaCSS**

---

## Tech Stack
- React.js  
- PokéAPI  
- JavaScript (ES6+)  
- LocalStorage

---

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/ZTNimbus/pokedex.git
   cd pokedex
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   npm run dev
   ```
4. Open in your browser: `http://localhost:5173`

---

## Known Issues
⚠️ **LocalStorage Quota Limit**: When caching many Pokémon, the app may crash due to exceeded storage capacity. Fix incoming.

---

## Future Enhancements
- Optimize localStorage usage
- Add filtering options (types, abilities)

---

## Contributing
Contributions are welcome. Fork the repo, make your changes, and submit a PR.

---

🔗 **Repo**: [Pokedex on GitHub](https://github.com/ZTNimbus/pokedex)
