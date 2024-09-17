import { Link, Outlet } from "react-router-dom"
export const Layout = ()=>{
    return <div>
        <nav>
            <Link to="/">Home page</Link>
            <Link to="/add">Add new User</Link>
        </nav>
        <div style={{padding:10,background:"gray", height:600, width:800}}><Outlet/></div>
    </div>
}