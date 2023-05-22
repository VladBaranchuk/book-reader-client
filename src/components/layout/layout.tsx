import React, { FC, createContext, useState } from 'react'
import Header from './header/header';

type Props = {
    children?: React.ReactNode
};

export const MyContext = React.createContext({
    read: true,
    setTrue: () => {},
    setFalse: () => {},
});

const Layout: FC<Props> = ({children}) => {

    const [value, setValue] = useState(true);

    const setTrue = () => setValue(true);
    const setFalse = () => setValue(false);

    return (
        <MyContext.Provider value={{read: value, setTrue: setTrue, setFalse: setFalse }}>
            <Header/>
                <div style={{width: '100vw', minHeight: '89.6vh'}}>
                    {children}
                </div>
            {/* <Footer/> */}
        </MyContext.Provider>
    )
}

export default Layout