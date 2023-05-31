import { Box } from '@mui/material';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  index: number;
  value: number;
}

const TabPanel: React.FC<Props> = ({ index, value, children }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
