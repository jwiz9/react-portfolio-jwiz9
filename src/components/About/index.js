import photo from '../../assets/images/jordan-face.png';
import { useTransition, animated, config } from 'react-spring';
import { useEffect, useState } from 'react';

function About() {
  const [show, setShow] = useState(false)
  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 100,
    config: config.slow,
  })

  useEffect(() => {
    setShow(true);
  }, [])

  return (
    <section className="flex justify-center items-center mt-12">
      {transitions((styles, item) => item && (
        <animated.div style={styles}>
          <div className='bg-secondary flex flex-col max-w-5xl gap-8 p-4 md:p-14 shadow-2xl shadow-tertiary'>
            <div className="flex items-center gap-6 md:gap-8 lg:gap-12">
              <h2 className="text-6xl text-tertiary font-bold">About Me</h2>
              <div className="w-32 md:w-40 bg-[#fea516] p-1 rounded-full">
                <div className='bg-quaternary p-1 rounded-full'>
                  <img src={photo} alt="Jordan Heath" />
                </div>
              </div>
            </div>
            <div className="leading-7 text-lg text-tertiary">
              <p className="max-w-2xl">
                My name is Jordan, I graduated from the University of Toronto with a Honours Bachelor of Arts, where I was given the opporunity to develop 
                my ability to critically analyze data and then critically reason in essays and presentations. Currently, I'm continuing to self teach myself 
                more programing languages past the U of T Coding boot camp and currently hold a IT Administration position at Holland Christian Homes that I 
                plan to expand on.
              </p>
            </div>
          </div>
        </animated.div>
      ))}
    </section>
  )
}

export default About;