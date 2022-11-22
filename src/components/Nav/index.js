import { Link } from "react-router-dom";
import resumePDF from '../../assets/documents/resume.pdf';
import PropTypes from "prop-types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Nav({linkSelected, setLinkSelected}) {
  const notify = () => toast.success('Resume Downloaded', {
    position: "top-right",
  });

  function clickHandler(section) {
    switch(section) {
      case 'about':
        setLinkSelected('about');
        break;
      case 'work':
        setLinkSelected('work');
        break;
      case 'contact':
        setLinkSelected('contact');
        break;
      case 'resume':
        setLinkSelected('resume');
        break;
      default:
        setLinkSelected('home');
    }
  }

  return (
<nav>
  <ul 
    className={`
      flex ml-6 rounded 
      ${linkSelected === 'work' ? 'bg-black border border-tertiary' : 'bg-quaternary'}
      shadow-md
    `}
  >
    <Link to="/" className=""> 
      <li className=
        {`
          py-2 
          px-8 
          text-lg 
          ${linkSelected === 'work' ? 'text-quaternary' : 'text-tertiary'} 
          tracking-wide 
          transition-all 
          ease-in-out 
          duration-300 
          cursor-pointer 
          rounded-sm 
          ${linkSelected === 'home' ? 'bg-secondary' : 'hover:bg-primary'}
          ${linkSelected === 'about' && 'hover:bg-secondary'}
          ${linkSelected === 'work' && 'hover:bg-quaternary hover:text-tertiary'}
        `} 
        onClick={() => clickHandler('home')}>Home
      </li>
    </Link>
    <Link to="/about"> 
      <li className=
        {`
          py-2 
          px-8 
          text-lg 
          ${linkSelected === 'work' ? 'text-quaternary' : 'text-tertiary'} 
          tracking-wide 
          transition-all 
          ease-in-out 
          duration-300 
          cursor-pointer 
          rounded-sm 
          ${linkSelected === 'about' ? 'bg-primary' : 'hover:bg-primary'}
          ${linkSelected === 'work' && 'hover:bg-quaternary hover:text-tertiary'}
        `} 
        onClick={() => clickHandler('about')}>About
      </li>
    </Link>
    <Link to="/portfolio"> 
      <li className=
        {`
          py-2 
          px-8 
          text-lg 
          ${linkSelected === 'work' ? 'text-tertiary' : 'text-tertiary'} 
          tracking-wide 
          transition-all
          ease-in-out 
          duration-300
          cursor-pointer 
          rounded-sm 
          ${linkSelected === 'about' && 'hover:bg-secondary'}
          ${linkSelected === 'work' ? 'bg-quaternary' : 'hover:bg-primary'}
          ${linkSelected === 'work' && 'hover:bg-quaternary hover:text-tertiary'}
        `}  
        onClick={() => clickHandler('work')}>Work
      </li>
    </Link>
    <Link to="/contact"> 
      <li className=
        {`
          py-2 
          px-8 
          text-lg 
          ${linkSelected === 'work' ? 'text-quaternary' : 'text-tertiary'} 
          tracking-wide 
          transition-all
          ease-in-out 
          duration-300 
          cursor-pointer 
          rounded-sm 
          ${linkSelected === 'about' && 'hover:bg-secondary'}
          ${linkSelected === 'contact' ? 'bg-secondary' : 'hover:bg-primary'}
          ${linkSelected === 'work' && 'hover:bg-quaternary hover:text-tertiary'}
        `} 
        onClick={() => clickHandler('contact')}
      >
        Contact
      </li>
    </Link>
    <a href={resumePDF} 
      download 
      className={`
        py-2 
        px-8 
        text-lg 
        ${linkSelected === 'work' ? 'text-quaternary' : 'text-tertiary'} 
        ${linkSelected === 'work' && 'hover:bg-quaternary hover:text-tertiary'}
        ${linkSelected === 'about' && 'hover:bg-secondary'}
        tracking-wide 
        transition-all
        ease-in-out 
        duration-300 
        hover:border-lighter 
        cursor-pointer 
        rounded-sm 
        hover:bg-primary
      `}
      onClick={notify}
    >
      Resume
    </a>
  </ul>
  <ToastContainer />
</nav>
  )
}

Nav.propTypes = {
  linkSelected: PropTypes.string.isRequired,
  setLinkSelected: PropTypes.func.isRequired,
};

export default Nav;