
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

export function createMockBrokerWithTransferData() {
  return {
    onInit: () => { Promise.resolve(); },
    start: () => ({
      add: (handler: any) => ({
        end: () => (Promise.resolve({ data: handler.data, total: handler.data?.total, error: handler.data?.error })),
      }),
    }),
  };
}
