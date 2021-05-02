import { IoClose } from 'react-icons/io5';

interface ModalProps {
    onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onCancel = () => {} }) => {
  return (
    <div className='fixed flex bg-gray-200 items-center py-5 justify-center top-0 right-0 bottom-0 left-0 bg-black bg-opacity-70 min-h-screen z-auto'>
      <div className='relative m-5 p-6 pt-4 md:p-8 md:pt-6 w-96 max-w-full max-h-full overflow-auto'>
          <div className="flex">
            {children}
            <button
            className='absolute mb-4 text-lg text-gray-600 focus:outline-none'
            onClick={onCancel}
            >
            <IoClose />
            </button>
          </div>
      </div>
    </div>
  );
};


export default Modal;