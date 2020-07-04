import { StoreEnhancer } from 'redux';

export type StorageSettings = {
    type?: 'local' | 'session';
    key?: string;
};

export type StorageMiddleware<Ext = any, StateExt = any> = StoreEnhancer<Ext, StateExt>;

export type StatePreloader = () => { [key: string]: any };

export type StorageInitializer = (settings: StorageSettings | null) => [StatePreloader, StorageMiddleware];
