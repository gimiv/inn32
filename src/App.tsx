import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
// Import other pages as we create them
import ThingsToDoPage from './pages/ThingsToDoPage'
import AmenitiesPage from './pages/AmenitiesPage'
import RoomsPage from './pages/RoomsPage'
import EventsPage from './pages/EventsPage'
import BlogPage from './pages/BlogPage'
import GroupsPage from './pages/GroupsPage'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/things-to-do" element={<ThingsToDoPage />} />
                <Route path="/amenities" element={<AmenitiesPage />} />
                <Route path="/rooms" element={<RoomsPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/groups" element={<GroupsPage />} />
            </Routes>
        </Layout>
    )
}

export default App
