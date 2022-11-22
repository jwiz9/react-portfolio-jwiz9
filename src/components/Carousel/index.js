import { slideData } from './data';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { useTransition, animated, config } from 'react-spring';
import { useEffect, useState } from 'react';

const Carousel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageHover, setImageHover] = useState(false);
  const [show, setShow] = useState(false)
  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 100,
    config: config.slow,
  })

  useEffect(() => {
    if (!isLoading) {
      setShow(true);
    }
  }, [isLoading])

  const cacheImages = async (pathArr) => {
    const promises = await pathArr.map((path) => {
      return new Promise(function (resolve, reject) {
        const img = new Image();

        img.src = path;
        img.onload = resolve();
        img.enerror = reject();
      });
    });

    await Promise.all(promises);

    setIsLoading(false);
  }

  useEffect(() => {
    const imagePaths = slideData.map((slide) => slide.image);

    cacheImages(imagePaths);
  }, [])

  const [currentSlide, setCurrentSlide] = useState(0);
  const length = slideData.length;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1);
  };

  const openTab = (link) => {
    window.open(
      link, "_blank");
  }

  if (!Array.isArray(slideData) || slideData.length <= 0) {
    return null;
  }

  const slideCircles = () => {
    const circles = [];
    for (let num = 0; num < slideData.length; num++) {
      circles.push(<div className={`${currentSlide === num ? 'w-3 h-3' : 'w-2 h-2'} rounded-full border border-quaternary ${currentSlide === num ? 'bg-quaternary' : 'bg-tertiary'}`}></div>);
    }
    return <div className='flex gap-3 items-center'>{circles}</div>
  }

  return (
    <section className='flex justify-center items-center relative h-screen2' >
      {!isLoading &&
        <div>
          {transitions((styles, item) => item && (
            <animated.div style={styles}>
              <div className='md:mx-8 mx-0 relative bg-tertiary py-4 md:py-12 shadow-2xl shadow-black'>
                <div className='absolute left-0 right-0 bottom-4 flex justify-center'>{slideCircles()}</div>
                <MdNavigateBefore className='md:active:top-[202px] active:top-[182px] absolute top-1/2 text-quaternary z-20 cursor-pointer select-none left-0 md:-left-4 top-[180px] md:top-[200px] text-9xl' onClick={prevSlide} />
                <MdNavigateBefore className='absolute top-1/2 text-black z-10 cursor-pointer select-none left-0 md:-left-4 top-[185px] md:top-[205px] text-9xl' />
                <MdNavigateNext className='md:active:top-[202px] active:top-[182px] absolute top-1/2 text-quaternary z-20 cursor-pointer select-none right-0 md:-right-4 top-[180px] md:top-[200px] text-9xl' onClick={nextSlide} />
                <MdNavigateNext className='absolute top-1/2 text-black z-10 cursor-pointer select-none right-0 md:-right-4 top-[185px] md:top-[205px] text-9xl' />
                {slideData.map((slide, index) => {
                  return (
                    <div
                      className={`${index === currentSlide ? 'opacity-100 duration-200 ' : 'display-none ease-in-out duration-200 translate-x-16'}`}
                      key={index}
                    >
                      {index === currentSlide && (
                        <>
                          <div className='relative'>
                            <div
                            className={`
                                absolute 
                                top-0 
                                left-28 
                                bottom-0 
                                right-0 
                                w-1/2 
                                lg:inline-block
                                z-10
                                lg:inline-block
                                hidden
                                hover:cursor-pointer 
                              `} 
                              onMouseEnter={() => setImageHover(true)}
                              onMouseLeave={() => setImageHover(false)}
                              onClick={() => openTab(slide.deployUrl)}
                            />
                            <div  
                              className={`
                                absolute 
                                top-0 
                                left-28 
                                bottom-0 
                                right-0 
                                w-1/2 
                                bg-gradient-to-l 
                                from-tertiary 
                                hidden 
                                lg:inline-block
                                ease-in-out duration-500 
                                ${imageHover && 'translate-x-[342px]'}
                              `} 
                            />
                            <img 
                              src={slide.image} 
                              alt='travel image' 
                              className={`
                                rounded-md 
                                h-[430px] 
                                w-full 
                                md:w-1/2 
                                object-cover 
                                object-left 
                                md:ml-28 
                                opacity-5 
                                md:opacity-10 
                                lg:opacity-100
                                md:hover:opacity-100 
                                md:hover:cursor-pointer 
                                ease-in-out 
                                duration-300
                              `}
                            />
                          </div>
                          <div className='absolute top-0 right-28 bottom-0 text-right'>
                            <div className='flex items-center h-full '>
                              <div className='flex flex-col gap-14 items-end '>
                                <div className='w-96'>
                                  <p className='text-secondary'>Project name:</p>
                                  <a className='hover:cursor-pointer' onClick={() => openTab(slide.deployUrl)}><h2 className='text-5xl text-quaternary font-bold'>{slide.name}</h2></a>
                                </div>
                                <div className='bg-secondary text-tertiary rounded-sm py-4 px-8 flex flex-col gap-6 w-72'>
                                  <p>{slide.description}</p>
                                  <p>Made with {slide.techUsed}</p>
                                </div>
                                <div className='flex justify-end text-2xl gap-6 relative'>
                                  <FaExternalLinkAlt className='cursor-pointer select-none text-primary text-3xl hover:text-[#4fbbd8] active:text-[#2eaed1]' onClick={() => openTab(slide.deployUrl)} />
                                  <FaGithub className='cursor-pointer select-none text-primary text-3xl hover:text-[#4fbbd8] active:text-[#2eaed1]' onClick={() => openTab(slide.repoUrl)} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </animated.div>
          ))}
        </div>
      }
    </section>
          
  );
};

export default Carousel;