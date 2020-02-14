import AbortController from 'abort-controller';

type FetchRes<T> = Response & {
  data: T;
};

type PromiseWithAbort<T> = Promise<T> & { abort: AbortController['abort'] };

/**
 * A Fetch Request that errors on non 2xx status codes
 * Returns JSON data.
 */
export default function betterFetch<T = any>(
  input: RequestInfo,
  init?: RequestInit
): PromiseWithAbort<FetchRes<T>> {
  const abortController = new AbortController();
  let isFetchPending = true;

  const fetchPromise = fetch(input, {
    signal: abortController.signal,
    ...init,
  })
    .then(async (response) => {
      isFetchPending = false;
      if (response.ok) {
        return {
          ...response,
          data: await response.json(),
        };
      }

      throw response;
    })
    .catch((err: Response) => {
      throw err;
    });

  // @ts-ignore
  fetchPromise.abort = () => {
    // Only abort if we still have a pending request
    if (isFetchPending) abortController.abort();
  };

  return fetchPromise as PromiseWithAbort<FetchRes<T>>;
}
