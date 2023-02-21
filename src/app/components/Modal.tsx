/* eslint-disable jsx-a11y/label-has-associated-control */
import { ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';

interface Props {
  children: ReactNode;
  id: string;
}

function Modal({
  children,
  id,
}: Props) {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl relative">
          <label htmlFor={id} className="btn btn-ghost absolute top-5 right-5">
            <IoMdClose size={26} />
          </label>
          {children}
        </div>
      </div>
    </>
  );
}
export default Modal;
