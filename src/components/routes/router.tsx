import { FC } from 'react'
import { BrowserRouter as Router, Routes as Switch , Route } from 'react-router-dom'
import Layout from '../layout/layout'
import { routes } from './routes'

const Routes: FC = () => {

    return (
        <Router>
            <Switch>
                {routes.map(route => {

                    return (
                        <Route
                            path={route.path}
                            key={`route ${route.path}`}
                            element={
                                <Layout>
                                    <route.element/>
                                </Layout>
                            }
                        />
                    )
                })}
            </Switch>
        </Router>
    )
}

export default Routes 