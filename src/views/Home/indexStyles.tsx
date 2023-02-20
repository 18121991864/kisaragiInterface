/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

const StyleBase = styled.div``

const RidingLantern = styled(StyleBase)<{isMobile?: boolean}>`
  // flex-direction: ${({isMobile}) => isMobile ?  'column' : 'column' };
`



// eslint-disable-next-line import/prefer-default-export
export { RidingLantern }