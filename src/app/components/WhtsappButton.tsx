'use client';

export default function WhatsAppButton() {
  const phoneNumber = '97400000000'; // TODO: replace with Badeeha's actual WhatsApp number
  const message = 'Hi, I would like to book a service with Badeeha.';
  const link = `https://wa.me/${+97452037373}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/40 transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 fill-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.703 4.605 1.914 6.47L4 29l7.716-1.882A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.628 3 16.001 3zm0 21.75c-1.94 0-3.75-.53-5.303-1.451l-.38-.225-4.58 1.117 1.14-4.463-.248-.4A9.72 9.72 0 016.25 15c0-5.385 4.366-9.75 9.751-9.75 5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75zm5.334-7.302c-.291-.146-1.72-.849-1.987-.946-.267-.097-.462-.146-.657.146-.194.291-.753.946-.923 1.14-.17.194-.34.219-.63.073-.291-.146-1.229-.453-2.34-1.443-.865-.771-1.449-1.723-1.619-2.014-.17-.291-.018-.449.128-.594.132-.131.291-.34.437-.51.146-.17.194-.291.291-.485.097-.194.049-.364-.024-.51-.073-.146-.657-1.584-.9-2.169-.237-.569-.478-.492-.657-.501-.17-.008-.364-.01-.559-.01-.194 0-.51.073-.777.364-.267.291-1.019.996-1.019 2.428 0 1.432 1.043 2.816 1.188 3.01.146.194 2.053 3.135 4.973 4.397.695.3 1.237.48 1.66.614.697.222 1.332.19 1.833.115.559-.083 1.72-.703 1.963-1.382.243-.679.243-1.261.17-1.382-.073-.121-.267-.194-.559-.34z" />
      </svg>
    </a>
  );
}