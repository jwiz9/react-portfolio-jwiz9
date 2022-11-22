import { useTransition, animated, config } from 'react-spring';
import { useEffect, useState, useRef } from 'react';
import { validateEmail } from "../../utils/helpers";
import { RiMailSendLine } from 'react-icons/ri';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const formRef = useRef();

  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false)
  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 100,
    config: config.slow,
  })

  useEffect(() => {
    setShow(true);
  }, [])

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const { name, email, message } = formState;
  const [errorMessage, setErrorMessage] = useState({ target: '', val: '' });

  const notify = (status) => {
    if (status === 'success') return toast.success('Email sent, thank you!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
    return toast.error('Unexpected error...', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function clearErrors() {
    if (!name) return;
    if (!validateEmail(email)) return;
    if (!message) return;

    return setErrorMessage({ target: '', val: ''});
  }

  function handleChange(e) {
    setFormState({...formState, [e.target.name]: e.target.value});
    clearErrors();
  }

  function checkErrors() {
    const validEmail = validateEmail(email);

    if (!name) {
      setErrorMessage({ target: 'name', val: 'Please enter your name' });
      nameRef.current.focus();
      return true;
    }
    if (!validEmail) { 
      setErrorMessage({ target: 'email', val: 'Please enter a valid email' });
      emailRef.current.focus();
      return true;
    }
    if (!message) {
       setErrorMessage({ target: 'message', val: 'Please enter a message' });
       messageRef.current.focus();
       return true;
    }

    setErrorMessage({ target: '', val: ''});
    return false;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const errors = checkErrors();
    if (errors) return setLoading(false);

    try {
      const result = await emailjs.sendForm('portfolio_service', 'contact_form', formRef.current, 'EdN6ktJzo4SGJL4tX');
      if (result.text === 'OK') {
        notify('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        notify('');
      }
    } catch (err) {
      console.log(err);
      notify('');
    } finally {
      setLoading(false);
    }

    return;
  }

  return (
    <section className="flex justify-center items-center mt-12">
      {transitions((styles, item) => item && (
        <animated.div style={styles}>
          <div className='bg-quaternary flex flex-col max-w-[570px] gap-2 p-8 md:p-14 md:pb-10 shadow-2xl shadow-tertiary'>
            <div className='flex items-end gap-6 md:justify-start justify-center md:min-w-[515px]'>
              <h2 className="text-6xl text-tertiary font-bold">Contact Me</h2>
              <RiMailSendLine className='text-6xl text-primary'/>
            </div>
            <div className='hidden md:inline-block'>
              <p className='text-zinc-600 md:text-left text-center text-lg leading-6'>Reach out below or email me at <span className='font-bold'>jordanheath945@gmail.com</span></p>
            </div>
            <form onSubmit={handleSubmit} ref={formRef} className="mt-4">
              <div className={`w-full md:w-1/2 ${errorMessage.target === 'name' && 'mb-3'}`}>
                <label htmlFor="name" className='text-lg text-zinc-600'>Name*</label>
                <div className='relative'>
                  <input type="text" name="name" value={name} ref={nameRef} onChange={(e) => handleChange(e)} className={`focus:outline-primary px-1 text-lg h-8 w-full ${errorMessage.target === 'name' ? 'focus:outline-red-300 border-red-300' : 'focus:outline-primary' } border rounded-sm mb-2`} />
                  <p className={`absolute left-2 -bottom-3 font-xl text-red-500 ${errorMessage.target !== 'name' && 'hidden'}`}>{errorMessage.val}</p>
                </div>
              </div>
              <div className={`w-full md:w-1/2 ${errorMessage.target === 'email' && 'mb-3'}`}>
                <label htmlFor="email" className='text-lg text-zinc-600'>Email*</label>
                <div className='relative'>
                  <input type="text" name="email" value={email} ref={emailRef} onChange={(e) => handleChange(e)} className={`focus:outline-primary px-1 text-lg h-8 w-full ${errorMessage.target === 'email' ? 'focus:outline-red-300 border-red-300' : 'focus:outline-primary' } border rounded-sm mb-2`} />
                <p className={`absolute left-2 -bottom-3 font-xl text-red-500 ${errorMessage.target !== 'email' && 'hidden'}`}>{errorMessage.val}</p>
                </div>
              </div>
              <div className={`w-full md:w-full ${errorMessage.target === 'message' && 'mb-3'}`}>
                <label htmlFor="message" className='text-lg text-zinc-600'>Message*</label>
                <div className='relative'>
                  <textarea name="message" value={message} ref={messageRef} onChange={(e) => handleChange(e)} className={`${errorMessage.target === 'message' ? 'focus:outline-red-300 border-red-300' : 'focus:outline-primary' } border-slate-300 border resize-none px-1 text-lg w-full h-32 rounded-sm mb-0 pb-0`} />
                  <p className={`absolute left-2 -bottom-4 font-xl text-red-500 ${errorMessage.target !== 'message' && 'hidden'}`}>{errorMessage.val}</p>
                </div>
              </div>
              <div>
                <button type="submit" className="flex items-center justify-center tracking-wider bg-[#ffdca4] w-full md:w-36 rounded border-2 border-tertiary text-xl font-bold text-tertiary px-8 h-12 transition ease-in-out duration-75 hover:bg-[#ffce80] active:bg-secondary mt-3">
                  {loading ?
                    <div className="inline-block w-8 h-8 
                    border-4
                    border-t-quaternary
                    border-l-tertiary
                    border-b-tertiary
                    border-r-tertiary
                    rounded-full 
                    animate-spin" 
                  />
                  :
                  'Submit'
                }
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </animated.div>
      ))}
    </section>
  )
}

export default Contact;