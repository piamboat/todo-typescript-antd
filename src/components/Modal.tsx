import { IoClose } from 'react-icons/io5';

interface ModalProps {
    onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onCancel = () => {} }) => {
  return (
    <div className='fixed flex items-center py-5 justify-center top-0 right-0 bottom-0 left-0 bg-black bg-opacity-70 z-auto'>
      <div className='relative bg-gray-200 m-5 p-6 pt-4 md:p-8 md:pt-6 w-96 max-w-full max-h-full overflow-auto'>
        <button
          className='absolute text-lg text-gray-600 top-4 right-4 focus:outline-none'
          onClick={onCancel}
        >
          <IoClose />
        </button>
        {children}
      </div>
    </div>
  );
};


export default Modal;