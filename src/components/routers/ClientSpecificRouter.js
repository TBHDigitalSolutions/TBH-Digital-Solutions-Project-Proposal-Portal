// src/components/routers/ClientSpecificRouter.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientPortal from '../ClientPortal';

function ClientSpecificRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/client-portal/:clientname" element={<ClientPortal />} />
            </Routes>
        </Router>
    );
}

export default ClientSpecificRouter;
