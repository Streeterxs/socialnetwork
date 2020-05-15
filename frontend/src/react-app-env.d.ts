/// <reference types="react-scripts" />
/// <reference types="react-dom/experimental" />
/// <reference types="react/experimental" />
declare module 'babel-plugin-relay/macro' {
	export { graphql as default} from 'react-relay'
}
declare module 'react-relay/lib/relay-experimental' {
	export {
		EntryPointContainer,
		LazyLoadEntryPointContainer_DEPRECATED,
		MatchContainer,
		ProfilerContext,
		RelayEnvironmentProvider,
		PreloadableQueryRegistry,
		fetchQuery,
		preloadQuery,
		prepareEntryPoint,
		useBlockingPaginationFragment,
		useFragment,
		useLazyLoadQuery,
		useMutation,
		usePaginationFragment,
		usePreloadedQuery,
		useRefetchableFragment,
		useRelayEnvironment,
		useSubscribeToInvalidationState
	} from 'react-relay/lib/relay-experimental';
}