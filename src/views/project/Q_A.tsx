import React, { useState } from "react";
import { ProjectDetails } from "../../@types/type";
import api from "../../api/services/api";

type Props = {
    d: ProjectDetails["prebid_messages"][0];
    user: any;
    data: ProjectDetails;
};

const Q_A = ({ d, user, data }: Props) => {
    const [show, toggleShow] = useState(false);

    let [message, setMessage] = useState("");

    const handle_submit = (e) => {
        api.project.addAnswer(
            {
                body: {
                    id: d?.id?.toString(),
                    message: message,
                },
            },
            () => {
                toggleShow(false);
                api.project.detail({ params: { id: d.project_id } });
            },
        );
        e.preventDefault();
        setMessage((e.target.value = ""));
    };

    return (
        <div className='col-sm-12'>
            <div className='ujs'>
                <div className='d-flex justify-content-between flex-warp answer-style'>
                    <p>
                        {" "}
                        <strong>Q.</strong><pre className="custom-pre">{d?.message}</pre>
                    </p>

                    {user?.role_id == 1 &&
                        user?.id == data?.creator_id &&
                        !d?.reply?.length ? (
                        <button
                            className='mysend-message ans-button'
                            onClick={() => toggleShow(!show)}>
                            {show ? "Cancel" : "Add Answer"}
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
                <span>Posted by : {d?.from?.user_name}</span>
                {show && (
                    <div className='send-message-col' id='sendMesage'>
                        <textarea
                            className='form-control'
                            placeholder='Type your message here'
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                        />

                        <button className='mt-3 mysend-message' onClick={handle_submit}>
                            Send
                        </button>
                    </div>
                )}
                <div className='qustion-column'>
                    {d?.reply?.map((elem) => {
                        return (
                            <p>
                                <strong> A.</strong> <pre className="custom-pre">{elem?.message}</pre>
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Q_A;
