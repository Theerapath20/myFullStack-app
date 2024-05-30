import Navbar from './Nabvar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import ControlSidebar  from './ControlSidebar'

function BackOffice(props) {
  return (
    <div>
        <div className="wrapper">
            <Navbar />
            <Sidebar />
            <div  className='content-wrapper'>
                {props.children}
            </div>
            <Footer />
            <ControlSidebar />
        </div>
    </div>
  )
}

export default BackOffice