import { InputBase, MenuItem } from '@mui/material';
import { styled } from '@mui/material';

export const StyledInputBase = styled(InputBase)`
  display: block;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #d8d8d8;
  padding: 0.8rem;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  color: #272727;
  font-size: 0.875rem;
  font-family: inherit;

  &:focus-visible,
  &:focus {
    outline-color: #d8d8d8;
  }

  .MuiChip-root {
    background-color: rgb(186 228 198);
  }
`;

export const StyledSelect = styled(MenuItem)`
  font-size: 0.875rem;
`;
