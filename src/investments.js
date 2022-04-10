import { Routes, Route, useParams, Link, Outlet } from "react-router-dom";
import "./index.css";
import { getMessageById, messages } from "./messages";
import { NoMatch } from "./no-match";

export default function InboxApp() {
    return (
        <Routes>
            {/* Routes in this app don't need to worry about which URL prefix they are
          mounted at. They can just assume they are mounted at /. Then, if they
          are moved under a different basename later on, all routes and links will
          continue to work. */}
            <Route path="/" element={<Layout />}>
                <Route index element={<Message />} />
                <Route path="stocks" element={<Message />} />
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    );
}

function Layout() {
    return (
        <div>
            <h1>Welcome to the Inbox app!</h1>
            <nav>
                <ul>
                    <li>
                        {/* Using a normal link here will cause the browser to reload the
                document when following this link, which is exactly what we want
                when transitioning to the "Home" app so we execute its entry
                point (see home/main.jsx). */}
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/stocks">About</a>
                    </li>
                </ul>
            </nav>

            <hr />

            <Outlet />
        </div>
    );
}



function Message() {
    let { id } = useParams();
    let message = getMessageById(id);
    if (!message) {
        return <NoMatch />;
    }

    return (
        <div>
            <h2>HI</h2>
        </div>
    );
}
