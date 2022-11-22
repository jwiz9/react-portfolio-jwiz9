import Nav from "../Nav";
import PropTypes from "prop-types";

function Header({linkSelected, setLinkSelected}) {
  return (
    <header className="flex items-center">
      <h1 
        className={`
          p-5 
          mt-2 
          ${linkSelected === 'home' ? 'text-tertiary' : 'text-quaternary'} 
          text-5xl 
          font-semibold 
          tracking-widest 
          ${linkSelected === 'home' ? 'bg-quaternary' : 'bg-tertiary'} 
          ${linkSelected === 'work' ? 'bg-black' : 'mr-px' }
          transition 
          duration-300 
          ease-in-out 
          hover:text-lighter 
          hover:bg-accentText 
          hover:cursor-default
        `}
      >
        JH
      </h1>
      <Nav linkSelected={linkSelected} setLinkSelected={setLinkSelected}></Nav>
    </header>
  )
}

Header.propTypes = {
  linkSelected: PropTypes.string.isRequired,
  setLinkSelected: PropTypes.func.isRequired,
};

export default Header;