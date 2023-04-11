import React, { FC } from 'react'
import Footer from './footer/footer';
import Header from './header/header';

type Props = {
    children?: React.ReactNode
};

const Layout: FC<Props> = ({children}) => {
    return (
        <>
        <Header/>
            <div style={{width: '99vw', minHeight: '89.6vh'}}>
                {children}
            </div>
        <Footer/>
        </>
    )
}

export default Layout