import Head from 'next/head';
import Image from 'next/image';
import Select from 'react-select';
import Typewriter from 'typewriter-effect';
import classnames from 'classnames';
// import { isMobile } from 'react-device-detect';
import { useState } from 'react';
// import { Nav } from '../components';
import { gitOptionsFirst, gitOptionsSecond, gitOptionsThird } from '../data';

export default function Git() {
  
  const [state, setState] = useState(
    {
      dark: typeof window !== "undefined" ? JSON.parse(localStorage.getItem('dark')) : false,
      fastType: typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('fastType')) : false,
      firstOption: null,
      showSecond: false,
      secondOption: null,
      showThird: false,
      thirdOption: null,
      nb: '',
      usage: '',
      copied: false
    }
  )
  
  // const handleToggle = (evt) => {
  //   const { id } = evt.target;

  //   setState(
  //     prevState => ({ [id]: !prevState[id] }),
  //     () => {
  //       localStorage.setItem(id, state[id]);
  //     }
  //   );
  // };

  const onFirstChange = (selectedOption) => {
    if (state.secondOption) {
      setState((prevState) => ({ 
        ...prevState,
        firstOption: selectedOption,
        showSecond: true,
        secondOption: null,
        showThird: false,
        nb: '',
        usage: ''
      }));
    } else if (gitOptionsSecond[selectedOption.value].length === 1) {
      setState((prevState) => ({ ...prevState, firstOption: selectedOption, showSecond: true }));
      onSecondChange(gitOptionsSecond[selectedOption.value][0]);
    } else {
      setState((prevState) => ({ ...prevState, firstOption: selectedOption, showSecond: true }));
    }
  };

  const onSecondChange = async (selectedOption) => {
    if (selectedOption.usage) {
      setState((prevState) => ({
        ...prevState,
        nb: '',
        usage: ''
      }));

      await setTimeout(()=>{}, 0);
      
      setState((prevState) => ({
        ...prevState,
        secondOption: selectedOption,
        showThird: false,
        nb: selectedOption.nb,
        usage: selectedOption.usage,
        thirdOption: null
      }));
    } else if (gitOptionsThird[selectedOption.value].length === 1) {
      setState((prevState) => ({ 
        ...prevState,
        secondOption: selectedOption,
        showThird: true,
        nb: '',
        usage: ''
      }));
      onThirdChange(gitOptionsThird[selectedOption.value][0]);
    } else {
      setState((prevState) => ({ 
        ...prevState,
        secondOption: selectedOption,
        showThird: true,
        thirdOption: null,
        nb: '',
        usage: ''
      }));
    }
  };

  const onThirdChange = async (selectedOption) => {
    setState((prevState) => ({
      ...prevState,
      nb: '',
      usage: ''
    }));

    await setTimeout(()=>{}, 0);
      
    setState((prevState) => ({ 
      ...prevState,
      thirdOption: selectedOption,
      nb: selectedOption.nb,
      usage: selectedOption.usage
    }));
  };

  const onCopy = () => {
    setState((prevState) => ({ 
      ...prevState, 
      copied: true 
    }));
    setTimeout(() => {
      setState((prevState) => ({ 
        ...prevState, 
        copied: false 
    }));
    }, 1000);
  };

  const copyUsage = () => {
    const el = document.createElement('textarea');
    el.value = state.usage;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected = document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    onCopy();

    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  };

  // const avgTypingDelay = state.fastType ? 0 : 50;
  const avgTypingDelay = 0;

  return (
    <>
    <Head>
      <title>Command Explorer</title>
      <meta name="description" content="Command Explorer" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={classnames('home', state.dark )}>
      <div className="py-8 px-12">
        {/* <Nav mode={state.dark} onToggle={handleToggle} fastType={state.fastType} /> */}
        <div className="grid grid-cols-3">
          <div className="flex flex-col m-12">
            <h2 className="text-[#20252d] text-3xl font-bold tracking-wider mb-6">
              Git <span className='text-[#f05030]'>Command</span> Explorer
            </h2>

            <div className="">
              <h4 className="text-[#f05030] tracking-wider text-xl font-medium mb-4">I want to:</h4>

              <Select
                instanceId='firstSelect'
                placeholder="..."
                className='mb-4'
                isSearchable={true}
                onChange={onFirstChange}
                value={state.firstOption}
                options={gitOptionsFirst}
              />

              {state.showSecond && (
                <Select
                  instanceId='secondSelect'
                  placeholder="..."
                  className='mb-4'
                  isSearchable={true}
                  onChange={onSecondChange}
                  value={state.secondOption}
                  options={gitOptionsSecond[state.firstOption.value]}
                />
              )}

              {state.showThird && (
                <Select
                  instanceId='thirdSelect'
                  placeholder="..."
                  isSearchable={true}
                  onChange={onThirdChange}
                  value={state.thirdOption}
                  options={gitOptionsThird[state.secondOption.value]}
                />
              )}
            </div>
          </div>

          <div className="m-12 flex flex-col col-span-2">
          {state.usage.length > 0 && (
            <>
            <h2 className="text-[#20252d] tracking-wider text-2xl font-bold mb-4">Usage</h2>
            <div className="bg-[#20252d] rounded-lg border-l-8 border-solid border-l-[#f05030] flex flex-row justify-between">
              <pre className='text-white tracking-wider font-semibold p-7 whitespace-pre-wrap'>
                <Typewriter 
                  onInit={(typewriter) => {
                    typewriter.typeString(state.usage)
                    .start();
                  }} 
                  options={{
                    delay: avgTypingDelay,
                    cursor: ""
                  }}
                />
              </pre>
              <div className="relative inline-block">
                <div className={`bg-white rounded-md bottom-[80%] text-[#20252d] text-xs p-1 border-2 absolute right-[80%] text-center translate-x-1/2 transition-all ease-out duration-300 ${state.copied ? 'block' : 'hidden'}`}>
                  Command Copied
                </div>
                <Image
                  className="cursor-pointer w-6 py-6 mr-4"
                  onClick={copyUsage}
                  width={24}
                  height={24}
                  src="/assets/images/clipboard.svg"
                  alt="Clipboard"
                />
              </div>
            </div>
            {state.nb && (
              <>
              <h2 className="text-[#20252d] tracking-wider text-2xl font-bold my-4">Note</h2>
              <div className="bg-[#20252d] rounded-lg border-l-8 border-solid border-l-[#f05030] flex flex-row justify-between">
                <pre className='text-white tracking-wider font-semibold p-7 whitespace-pre-wrap'>
                  <Typewriter 
                  onInit={(typewriter) => {
                    typewriter.typeString(state.nb)   
                    .start();
                  }} 
                  options={{
                    delay: avgTypingDelay,
                    cursor: ""
                  }}
                />
                </pre>
              </div>
              </>
            )}
            </>
          )}
        </div>
        </div>
      </div>
    </div>
    </>
  );
}