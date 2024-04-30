import { del, get, set } from 'idb-keyval'
import { PersistedClient, Persister, } from '@tanstack/react-query-persist-client'

export function createIDBPersister(
	idbValidKey: IDBValidKey = 'react-query'
) {
	return {
		persistClient: async (client: PersistedClient) => {
			console.log(client.clientState.queries.length);
			await set(idbValidKey, client)
		},
		restoreClient: async () => {
			return await get<PersistedClient>(idbValidKey)
		},
		removeClient: async () => {
			await del(idbValidKey)
		},
	} as Persister
}