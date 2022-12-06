import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Button from "react-bootstrap/Button";
import "./Contacts.css";

const Contacts = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [looading, setLooading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast.error("Please fill your name, email, subject and message");
    } else {
      try {
        setLooading(true);
        const { data } = await axios.post(`api/users/contacts`, {
          name,
          email,
          subject,
          message,
        });
        setLooading(false);
        toast.success(data.message);
        document.getElementById("myForm").reset();
        setMessage("");
      } catch (err) {
        setLooading(false);
        toast.error(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
      }
    }
  };
  return (
    <>
      <section className="contact" id="contact">
        <h1 className="heading">
          <span> contact us</span>
        </h1>

        <div className="Contactsrow">
          <div className="contactInfo">
            <h3 className="Contactheading">Where can you find us?</h3>
            <div className="box">
              <div className="iconi">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </div>
              <div className="text">
                <h5>Address</h5>
                <p>
                  Nairobi, Kenya, <br />
                  Kahawa Sukari, Baringo Road
                </p>
              </div>
            </div>
            <div className="box">
              <div className="iconi">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-telephone-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                  <path
                    fill-rule="evenodd"
                    d="M12.5 1a.5.5 0 0 1 .5.5V3h1.5a.5.5 0 0 1 0 1H13v1.5a.5.5 0 0 1-1 0V4h-1.5a.5.5 0 0 1 0-1H12V1.5a.5.5 0 0 1 .5-.5z"
                  />
                </svg>
              </div>
              <div className="text">
                <h5>Phone</h5>
                <p>+254712012113</p>
              </div>
            </div>
            <div className="box">
              <div className="iconi">
                <a href="https://wa.me/+254712012113">
                  <img
                    src="/images/whatsapp.png"
                    alt="whatsapp"
                    style={{
                      maxWidth: "25px",
                      maxHeight: "25px",
                    }}
                  />
                </a>
              </div>
              <div className="text">
                <h5>Whatsapp</h5>
                <p>
                  {" "}
                  <a href="https://wa.me/+254712012113"> +254712012113</a>
                </p>
              </div>
            </div>
            <div className="box">
              <div className="iconi">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                </svg>
              </div>
              <div className="text">
                <h5>Email</h5>
                <p>ec-web@example.com</p>
              </div>
            </div>
            <div className="box">
              <div className="iconi">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-geo-alt icon__color"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg>
              </div>
              <div className="text">
                <h5>Opening Hours</h5>
                <p>
                  10:00-18:00, Mon-Sat <br />{" "}
                  <span style={{ color: "#f0c040" }}>sunday - online</span>
                </p>
              </div>
            </div>
          </div>
          <form action="" id="myForm" onSubmit={submitHandler}>
            <h2 className="Contactheading">Send us message ...</h2>
            <input
              type="text"
              placeholder="Your Name..."
              className="box"
              name="email"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email..."
              className="box"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Number..."
              className="box"
              name="name"
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              name="text"
              className="box"
              placeholder="Enter your message..."
              onChange={(e) => setMessage(e.target.value)}
              id=""
              cols="30"
              rows="10"
            ></textarea>

            <Button
              type="button"
              variant="primary"
              onClick={submitHandler}
              disabled={looading}
            >
              {looading ? "Sending..." : "Send"}{" "}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contacts;
