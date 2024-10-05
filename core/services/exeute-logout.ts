let logouthandler: (() => void) | null = null;

export const registerlogouthandler = (handler: () => void) => {
  logouthandler = handler;
};

export const executelogout = () => {
  if (logouthandler) {
    logouthandler();
  }
};
