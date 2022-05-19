import React, { useState } from "react";

function ContactVendor({ services, messages, postReq }) {
  const [msg, setMsg] = useState("");
  const [service, setService] = useState("");
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");

  const serviceChangeHandler = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    console.log(label);
    let value = e.target.value;
    setService(value);
    setTitle(label);
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Send your requirement
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Your requirement will be sent to the selected relevant
                businesses.
              </p>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={serviceChangeHandler}
              >
                <option selected value="">
                  Select a service
                </option>
                {services.map((service) => {
                  return (
                    <option key={service.id} value={service.id}>
                      {service.sub_category}
                    </option>
                  );
                })}
              </select>
              <br />
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setMsg(e.target.value)}
              >
                <option selected value="">
                  Select a Message
                </option>
                {messages.map((message) => {
                  return (
                    <option key={message.id} value={message.id}>
                      {message.msg}
                    </option>
                  );
                })}
              </select>
              <br />
              <div>
                <label htmlFor="inputPassword">
                  Budget (provide for better responses)
                </label>
                <div>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g. RS-10000"
                    onChange={(event) => setBudget(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => postReq(service, msg, title, budget)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactVendor;
