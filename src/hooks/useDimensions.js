import { useEffect } from 'react';

import { atom, useRecoilState } from 'recoil';

const fetchDimensions = () => ({
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  bodyScrollWidth: document.body.scrollWidth,
  bodyScrollHeight: document.body.scrollHeight,
  clientWidth: document.body.clientWidth,
  clientHeight: document.body.clientHeight,
});

const DimensionsAtom = atom({
  key: 'Dimensions',
  default: fetchDimensions(),
});

export function useDimensions() {
  const [dimensions, setDimensions] = useRecoilState(DimensionsAtom);

  function updateDimensions() {
    setDimensions(fetchDimensions());
  }

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return dimensions;
}
