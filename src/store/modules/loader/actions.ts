export const startLoading = () =>
  ({
    type: "LOADER/START",
  } as const);

export const stoptLoading = () =>
  ({
    type: "LOADER/STOP",
  } as const);
