/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { useUpdate, useUpdateEffect } from 'ahooks';
import { flagZt } from 'utils/utils'
import Home from './Home'

export default function Index(props: any) {
  const update = useUpdate()
  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 1142px)').matches,
  );

  useEffect(() => {
    window
      .matchMedia('(min-width: 1142px)')
      .addEventListener('change', (e) => setMatches(e.matches));
  }, []);
  return (<Home useMessage={props?.useMessage}/>)
}
