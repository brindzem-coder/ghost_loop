# Ghost Loop

Мінімальний скелет мобільної гри на Expo + React Native (TypeScript).

## Запуск

```bash
npm install
npx expo start
```

## Структура

```text
src/
  screens/
    MenuScreen.tsx
    GameScreen.tsx
  game/
    types.ts
    constants.ts
    engine.ts
  components/
    Hud.tsx
    Arena.tsx
  utils/
    time.ts
```

## Що вже є

- Навігація через native stack (`Menu -> Game`).
- `MenuScreen` з назвою гри і кнопкою Play.
- `GameScreen` з HUD, `Arena` та плейсхолдером персонажа.
- Базовий engine loop на `setInterval`, підготовлений для подальшого переходу на `requestAnimationFrame`.
