import { useAtom, WritableAtom } from "jotai";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
type Props = {
	title?: string;
	children: any;
	atom: WritableAtom<any, any, void | Promise<void>>;
};

function GlobalModal({ title, children, atom }: Props) {
	const [show, setShow] = useAtom(atom);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				{title != null ? (
					<Modal.Header>
						<h4 className='modal-title'>{title}</h4>
						<button type='button' className='close' onClick={handleClose}>
							&times;
						</button>
					</Modal.Header>
				) : (
					<></>
				)}
				<Modal.Body>{children}</Modal.Body>
				{/* <Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer> */}
			</Modal>
		</>
	);
}

export default GlobalModal;
