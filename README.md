# National Parks Explorer

A React Native + Expo app for browsing US National Parks. Built with the free [NPS Data API](https://www.nps.gov/subjects/developer/api-documentation.htm).

Browse parks, search and filter by state, view detailed photos and info, and save your favorite parks!

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file and add the `EXPO_PUBLIC_NPS_API_KEY` variable.

3. Run the app on iOS Simulator:

   ```
   npm run ios
   ```

## Project Structure

```
api/          NPS REST client and shared types
app/          expo-router screens (tabs + park detail stack)
components/   atomic design: atoms, molecules, organisms
constants/    theme tokens, US state list
hooks/        data hooks (React Query) + saved-parks context
utils/        small pure helpers (filtering, icon mapping, etc.)
```

## Key Dependencies

| Package                                     | Why                                                                    |
| ------------------------------------------- | ---------------------------------------------------------------------- |
| `expo-router`                               | File-based navigation with native stack + tabs                         |
| `@tanstack/react-query`                     | Caching, loading/error states, and request dedupe for NPS endpoints    |
| `@react-native-async-storage/async-storage` | Persists the array of saved `parkCode`s across restarts (no DB needed) |
| `expo-image`                                | Faster image loading, memory caching, and crossfade transitions        |
| `react-native-reanimated-carousel`          | GPU-accelerated photo gallery on the detail screen                     |
| `react-native-safe-area-context`            | Correct insets for the detail screen's pinned save bar                 |

## Notes & Trade-offs

### What's implemented

- Two-tab layout (Browse, Saved) with stack navigation into Park Detail
- Virtualized `FlatList`s on both list screens
- Search + multi-state filter on Browse, presented in a native page sheet modal
- Photo carousel, description, hours, fees, and activities on the details page
- Save / unsave from list and detail; saved set is the single source of truth (array of `parkCode`s), display data is derived from the NPS cache
- Loading / error / empty states across all data screens
- `expo-image`, `Pressable`, and modern RN styling (`gap`, `borderRadius`) throughout

### State architecture

The only thing persisted is `string[]` of `parkCode`s in AsyncStorage, exposed by a small `SavedParksProvider` context. The Saved tab refetches those codes from the NPS API, so I never store full park objects on device and never have to worry about potential stale data.

The whole parks list is fetched upfront because the dataset is relatively small containing only around 500 parks. This approach also enables local partial search functionality, since the NPS API does not support partial or fuzzy search. Without local filtering, users would need to enter the exact park name to find results, which creates a less intuitive search experience.

### Things I'd improve with more time

- **Pagination / infinite scroll.** Right now the Browse page fetches the whole state parks list at once, mainly because there are around 500 state park. If that wasn't the case I'd add `useInfiniteQuery` with `start`/`limit` and an `onEndReached` to handle larger datasets. The current `FlatList` setup is ready for it.
- **Server-side search and state filter.** I'm filtering the first page in memory for snappier feedback while typing. For a real catalog I'd debounce the input and push `q` / `stateCode` into the query key so results come from the API.
- **Memoize `ParkCard` and its callbacks.** The card is cheap, but wrapping it in `React.memo` and stabilizing `onPress` / `onToggleSave` with `useCallback` keyed by `parkCode` would eliminate re-renders on search keystrokes.
- **Image sizing.** I'd pass smaller NPS image variants (or use `expo-image`'s `recyclingKey` + explicit dimensions) for list thumbnails instead of reusing the hero URL.
- **Theming.** A `useColorScheme` hook is wired up but I didn't fully thread dark-mode tokens through every component.
- **Tests.** Out of scope for this assignment, but the pure helpers in `utils/` and the saved-parks context are the obvious starting points.
