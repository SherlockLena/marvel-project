import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return(
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Sorry, page doesn't exist</p>
            <Link style={{'display':'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize':'24px',
            'marginTop': '30px', 'color': '#9F0013'}} to='/'>Back to the main page</Link>
        </div>
    )
}

export default Page404;