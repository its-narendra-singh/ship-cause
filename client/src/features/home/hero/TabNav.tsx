import React from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

type Props = {
    activeIndex: number;
    onChange: (index: number) => void;
    tabs: { label: string }[];
};

const TabButton = styled(Button) <{ active?: boolean }>`
  background-color: ${(props) => (props.active ? '#fff' : 'transparent')};
  color: ${(props) => (props.active ? '#6a1b9a' : '#fff')};
  font-weight: ${(props) => (props.active ? 700 : 500)};
  text-transform: none;
  padding: 8px 20px;
  border-radius: 12px;

  &:hover {
    background-color: #fff;
    color: #6a1b9a;
  }
`;

const TabNav: React.FC<Props> = ({ activeIndex, onChange, tabs }) => {
    return (
        <Box display="flex" justifyContent="center" mb={4}>
            <ButtonGroup variant="text" sx={{ background: '#fff3', borderRadius: '12px' }}>
                {tabs.map((tab, i) => (
                    <TabButton key={i} active={activeIndex === i} onClick={() => onChange(i)}>
                        {tab.label}
                    </TabButton>
                ))}
            </ButtonGroup>
        </Box>
    );
};

export default TabNav;
