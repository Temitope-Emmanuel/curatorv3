import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const createGenericContext = <T extends unknown>() => {
  const genericContext = React.createContext<T | undefined>(undefined);

  const useGenericContext = () => {
    const contextIsDefined = React.useContext(genericContext);
    if (!contextIsDefined) {
      throw new Error('useGenericContext must be used with a provider');
    }
    return contextIsDefined;
  };
  return [useGenericContext, genericContext.Provider] as const;
};

export default createGenericContext;
