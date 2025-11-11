# Pokémon Bingo

Una aplicación web interactiva de Bingo con temática Pokémon, desarrollada con Vue.js 2. Perfecta para jugar con amigos, familia o en eventos temáticos de Pokémon.

![Pokémon](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg)

## Descripción

Pokémon Bingo es un juego de bingo digital que utiliza Pokémon en lugar de números tradicionales. La aplicación cuenta con dos interfaces principales:

- **Tablero de Juego (Home)**: Un tablero de bingo de 4x4 con Pokémon aleatorios donde los jugadores pueden marcar los Pokémon que han sido llamados.
- **Panel de Administración (Admin)**: Una interfaz para el moderador del juego que permite llamar Pokémon aleatoriamente y ver el historial completo de Pokémon llamados.

## Características

- **Tableros Aleatorios**: Cada jugador obtiene un tablero único con Pokémon mezclados aleatoriamente
- **Interfaz Intuitiva**: Diseño limpio y fácil de usar con imágenes oficiales de Pokémon
- **Responsive**: Funciona en diferentes tamaños de pantalla
- **Búsqueda**: Panel de administración con búsqueda en tiempo real de Pokémon llamados
- **Selección Visual**: Marca las casillas seleccionadas con un color distintivo
- **API de Pokémon**: Utiliza PokeAPI para obtener información y sprites de los Pokémon

## Tecnologías Utilizadas

- **Vue.js 2.6**: Framework principal
- **Vue Router**: Navegación entre vistas
- **PokeAPI JS Wrapper**: Integración con la API de Pokémon
- **Vue CLI**: Herramientas de desarrollo
- **ESLint + Prettier**: Calidad y formato de código

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd pokemon-bingo
```

2. Instala las dependencias:
```bash
npm install
```

## Uso

### Modo Desarrollo
Inicia el servidor de desarrollo con hot-reload:
```bash
npm run serve
```
La aplicación estará disponible en `http://localhost:8080`

### Producción
Compila y minifica para producción:
```bash
npm run build
```

### Linting
Ejecuta el linter y corrige archivos:
```bash
npm run lint
```

## Cómo Jugar

1. **Configuración del Juego**:
   - El moderador abre la vista `/admin` en su dispositivo
   - Los jugadores abren la vista principal `/` en sus dispositivos

2. **Inicio del Juego**:
   - Cada jugador verá un tablero de 4x4 con 16 Pokémon diferentes
   - El moderador hace clic en "Start Game" para llamar al primer Pokémon

3. **Durante el Juego**:
   - El moderador va llamando Pokémon haciendo clic en "Next Pokemon"
   - Los jugadores marcan los Pokémon en su tablero haciendo clic en las casillas
   - Las casillas seleccionadas se resaltan en azul

4. **Ganar**:
   - El primer jugador en completar una línea (horizontal, vertical o diagonal) grita "¡BINGO!"
   - Puedes adaptar las reglas según prefieras (línea completa, tablero completo, etc.)

## Estructura del Proyecto

```
pokemon-bingo/
├── public/              # Archivos públicos estáticos
│   ├── index.html
│   ├── pokemon-logo.png
│   └── bg.jpg
├── src/
│   ├── components/      # Componentes Vue
│   │   ├── GameBoard.vue    # Tablero de bingo 4x4
│   │   ├── GameCell.vue     # Celda individual del tablero
│   │   └── HelloWorld.vue
│   ├── views/           # Vistas de la aplicación
│   │   ├── Home.vue         # Vista del jugador
│   │   └── Admin.vue        # Vista del moderador
│   ├── router/          # Configuración de rutas
│   │   └── index.js
│   ├── App.vue          # Componente raíz
│   ├── main.js          # Punto de entrada
│   └── store.js         # Estado global de la aplicación
├── babel.config.js
├── package.json
└── README.md
```

## Rutas Disponibles

- `/` - Vista principal del jugador con el tablero de bingo
- `/admin` - Panel de administración para el moderador

## Configuración Personalizada

Consulta la [Referencia de Configuración de Vue CLI](https://cli.vuejs.org/config/) para personalizar el proyecto.

## Notas Técnicas

- La aplicación usa los primeros 50 Pokémon de la primera generación
- Los sprites provienen del repositorio oficial de PokeAPI
- El estado del juego se maneja mediante un store reactivo personalizado
- Los tableros se barajan aleatoriamente al iniciar la aplicación
