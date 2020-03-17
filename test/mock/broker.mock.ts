export function createMockBrokerService(returnValue) {
  return {
    onInit: () => { Promise.resolve(); },
    start: () => ({
      add: () => ({
        end: () => (Promise.resolve(returnValue)),
      }),
    }),
  };
}
