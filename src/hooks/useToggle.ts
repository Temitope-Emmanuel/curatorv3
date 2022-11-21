import { useCallback, useState } from 'react';

const useToggle = (initialState?: boolean) => {
  const [state, setState] = useState(initialState ?? false);
  const toggle = useCallback(() => setState((prevSt) => !prevSt), []);

  return [state, toggle, setState] as const;
};

export default useToggle;
