import {
  Close,
  MessageOutlined,
  SupportAgentRounded,
} from "@mui/icons-material";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingDots from "./LoadingDots";
import { Link } from "react-router-dom";

export default function Chatbot() {
  const [tooltip, showTooltip] = useState(false);
  const [chatWindow, showChatWindow] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [chatInteract, setChatInteract] = useState({
    response: "",
    options: {},
    redirect: [],
  });
  const [loading, setLoading] = useState(false);

  const startChat = async () => {
    setLoading(true);
    fetch("http://localhost:8080/chatbot")
      .then((response) => response.json())
      .then((data) => {
        setChatInteract(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        setChatInteract({
          response: "An error occurred. Please try again later.",
          options: {},
          redirect: [],
        });
        console.log(error);
        setLoading(false);
      });
  };

  const chatAsked = async (link) => {
    setLoading(true);
    fetch(`http://localhost:8080/${link}`)
      .then((response) => response.json())
      .then((data) => {
        setChatInteract(data);
        console.log(data);
        setLoading(false);
        setOrderNumber(null);
      })
      .catch((error) => {
        setChatInteract({
          response: "An error occurred. Please try again later.",
          options: {},
          redirect: [],
        });
        console.log(error);
        setLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    if (orderNumber) {
      const url = `chatbot/order/${orderNumber}`;
      // You can use fetch or any other method to send the request
      console.log(`Sending request to: ${url}`);
      fetch(`http://localhost:8080/${url}`)
        .then((response) => response.json())
        .then((data) => {
          setChatInteract(data);
          console.log(data);
          setLoading(false);
        })
        .catch((error) => {
          setChatInteract({
            response: "An error occurred. Please try again later.",
            options: {},
            redirect: [],
          });
          console.log(error);
          setLoading(false);
        });
    }
  };

  return (
    <div className="fixed bottom-10 right-10 flex items-center">
      <div
        onMouseEnter={() => showTooltip(true)}
        onMouseLeave={() => showTooltip(false)}
        onClick={() => {
          showChatWindow(!chatWindow);
          showTooltip(false);
          if (!chatWindow) startChat();
        }}
        className="text-white bg-lime-500 p-5 rounded-full shadow-lg cursor-pointer z-10 flex items-center justify-center hover:brightness-90 transition-all"
      >
        <MessageOutlined fontSize="large" />
      </div>

      <motion.p
        initial={{ x: 50, opacity: 0 }}
        animate={tooltip ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
        className="absolute -left-12 transform"
      >
        Chat
      </motion.p>

      <motion.div
        initial={{ scale: 0 }}
        animate={chatWindow ? { scale: 1 } : { scale: 0 }}
        style={{ originX: 0.95, originY: 1.15 }}
        className="absolute bottom-24 flex flex-col right-5 bg-lime-100 rounded-xl w-[25svw] max-h-[70svh] shadow-lg"
      >
        <div className="py-2 flex px-4 justify-between bg-lime-200 rounded-t-xl">
          Chatbot
          <Close
            className="cursor-pointer"
            onClick={() => showChatWindow(false)}
          />
        </div>
        <div className="px-4 py-5 flex flex-col h-full gap-y-10 overflow-auto ">
          <div
            className={`flex gap-x-2 ${
              loading ? "items-center" : "items-start"
            }`}
          >
            <SupportAgentRounded fontSize="large" />
            <AnimatePresence>
              {loading ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <LoadingDots />
                </motion.span>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  dangerouslySetInnerHTML={{
                    __html: chatInteract.response.replace(
                      /(\r\n|\n|\r)/g,
                      "<br />"
                    ),
                  }}
                />
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {!loading && (
              <motion.div
                className="space-y-1 flex flex-col "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {chatInteract.options &&
                  Object.entries(chatInteract.options).map(([option, link]) =>
                    option === "" ? (
                      <form
                        onSubmit={handleSubmit}
                        className="items-center flex justify-center"
                      >
                        <input
                          type="number"
                          id="order"
                          name="order"
                          placeholder="Order Number"
                          required
                          className="rounded-full p-2 text-center"
                          value={orderNumber}
                          onChange={(e) => setOrderNumber(e.target.value)} // Update state on input change
                        />
                        <button
                          type="submit"
                          className="ml-2 rounded-full p-2 bg-lime-500 text-white hover:bg-lime-600"
                        >
                          Submit
                        </button>
                      </form>
                    ) : link === "" ? (
                      <Link
                        to="/loan"
                        key={link}
                        onClick={() => showChatWindow(false)}
                        className="w-5/6 text-left p-2 bg-white rounded-full hover:brightness-90"
                      >
                        {option}
                      </Link>
                    ) : link === "//" ? (
                      <Link
                        to="/vehicles"
                        key={link}
                        onClick={() => showChatWindow(false)}
                        className="w-5/6 text-left p-2 bg-white rounded-full hover:brightness-90"
                      >
                        {option}
                      </Link>
                    ) : (
                      <button
                        key={link}
                        onClick={() => chatAsked(link)}
                        className="w-5/6 text-left p-2 bg-white rounded-full hover:brightness-90"
                      >
                        {option}
                      </button>
                    )
                  )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
