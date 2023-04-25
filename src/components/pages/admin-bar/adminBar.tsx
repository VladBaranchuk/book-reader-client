import { Box, Typography, Tabs, Tab } from '@mui/material';
import React, { FC, useState } from 'react'
import BooksBar from './booksBar';
import AuthorsBar from './authorsBar';
import CategoriesBar from './categoriesBar';
import UsersBar from './usersBar';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AdminBar: FC = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <Box sx={{display: 'flex', flexDirection: 'column', pt:1}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Книги" {...a11yProps(0)} />
                    <Tab label="Авторы" {...a11yProps(1)} />
                    <Tab label="Категории" {...a11yProps(2)} />
                    <Tab label="Пользователи" {...a11yProps(3)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <BooksBar/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AuthorsBar/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <CategoriesBar/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <UsersBar/>
                </TabPanel>
            </Box>
        </div>  
    )
}

export default AdminBar