# @grooveland/redux-storage

Middleware to record status changes (Redux) and store them in the browser storage

## DEPENDENCIES

`@grooveland/redux-storage` depends on `redux`.

## Usage

```bash
yarn add @grooveland/redux-storage
```

or

```bash
npm i --save @grooveland/redux-storage
```

Inside the file where your **redux** store is configured you must import the initializer

```js
import { storage } from '@grooveland/redux-storage';
```

Once imported you must configure the middleware and the pre-load function

```js
const [preload, storageMiddleware] = storage({ type: 'session', key: 'grooveland' });
```

Finally we only have to load the initial state of the application from the selected storage.

```js
const initState = {
    ...preload(),
};
```

and then we register the middleware inside the store

```js
const composedEnhancers = compose(storageMiddleware);
export const store = createStore(reducer, composedEnhancers);
```

The middleware registers all changes within our state and stores them in the selected storage.

## API

Description of the properties available within the **storage** method

| Key  | Type            | Default              | Description                               |
| :--- | :-------------- | :------------------- | :---------------------------------------- |
| type | StorageSettings | local                | Type of storage used for data persistence |
| key  | string          | new Date().getTime() | storage access key                        |

### StorageSettings

It only supports storage types such as local and session.
