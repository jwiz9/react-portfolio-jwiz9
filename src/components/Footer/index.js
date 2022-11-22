import ghLogo from '../../assets/images/github.png';
import liLogo from '../../assets/images/linkedin.png';
import PropTypes from "prop-types";

function Footer({ linkSelected }) {

  return (
    <footer className={`
      flex 
      fixed 
      bottom-2 
      md:bottom-10 
      md:right-10 
      w-full 
      justify-center 
      md:w-fit 
      ${linkSelected === 'work' ? 'opacity-0' : 'opacity-70 md:opacity-100 hover:opacity-100' }
      ${linkSelected === 'about' && 'md:bg-primary'}
      ${linkSelected === 'home' && 'md:bg-secondary'}
      ${linkSelected === 'contact' && 'md:bg-secondary'}
      rounded-2xl 
      md:shadow-md 
      ease-in-out 
      duration-300 
      `}
    >
      <ul className={`
        flex 
        items-center 
        md:flex-col 
        gap-10 
        md:gap-6 
        transition 
        ease-in-out 
        duration-300 
        md:p-6 
        p-4 
        rounded-2xl 
        shadow-4xl 
        md:shadow-none
        ${linkSelected === 'about' && 'bg-primary'}
        ${linkSelected === 'home' && 'bg-secondary'}
        ${linkSelected === 'contact' && 'bg-secondary'}`}
      >
        <li><a href="https://github.com/jwiz9" target="_blank" rel="noreferrer"><img src={ghLogo} alt="GitHub" width="50" /></a></li>
        <li><a href="https://www.linkedin.com/in/jordan-heath-aa757819b/" target="_blank" rel="noreferrer"><img src={liLogo} alt="LinkedIn" width="50" /></a></li>
      </ul>
    </footer>
  )
}

Footer.propTypes = {
  linkSelected: PropTypes.string.isRequired,
};

export default Footer;