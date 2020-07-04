import { applyMiddleware } from 'redux';
import { StorageSettings } from './types';

export * from './types';

export const storage = (settings: StorageSettings | null = null) => {
    const defaultSettings: StorageSettings = {
        type: 'local',
        key: `${new Date().getTime()}`,
        ...(settings || {}),
    };

    let dataStorage: Storage;

    switch (defaultSettings.type) {
        case 'session':
            dataStorage = window.sessionStorage;
            break;
        case 'local':
        default:
            dataStorage = window.localStorage;
            break;
    }

    const middleware = applyMiddleware((store: any) => (next: any) => (action: any) => {
        const result = next(action);
        const state = store.getState();

        const data = state.computedStates[state.currentStateIndex].state;

        dataStorage.setItem(defaultSettings.key as string, JSON.stringify(data));
        return result;
    });

    const preload = () => {
        const loadedState = dataStorage.getItem(defaultSettings.key as string);
        let result = {};
        if (loadedState) {
            result = JSON.parse(loadedState);
        }
        return result;
    };

    return [preload, middleware];
};
