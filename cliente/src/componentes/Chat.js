import React, { useState, useEffect, useRef } from "react";
import socket from "./Socket";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// emogis
import Picker from 'emoji-picker-react';


const Chat = ({ nombre }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.emit("conectado", nombre);
  }, [nombre]);

  useEffect(() => {
    socket.on("mensajes", (mensaje) => {
      setMensajes([...mensajes, mensaje]);    ///arreglo de los emnsjaes de la conversacion
    });

    return () => {
      socket.off();   ///mediante el retun evitamos se haga un blucle infinito
    };
  }, [mensajes]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const submit = (e) => {
    e.preventDefault();  //impode que la pagina se recarge
    socket.emit("mensaje",  nombre, mensaje); // enviamos el mensaje con el nombre de queien envia
    setMensaje("");
  };
  // emogis
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  //retormanos el conteido del chat
  return (
    <div>
      <div className="container">
          <table class="table">
          <thead>
            <tr>
              <th>   </th>
              <th>   </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <form onSubmit={submit}>
                  <div align="">
                    <h4>Escriba su mensaje</h4>
                    <div>
                    <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}

                        className="form-control form-control input-lg "

                    ></textarea>

                      <Picker onEmojiClick={onEmojiClick} />
                    </div>
                    <div>
                      <button className="btn btn-info ">
                        Enviar mensaje
                      </button>
                    </div>
                  </div>
                </form>
              </th>
              <td width="default">
                <div className="chat">
                  {mensajes.map((e, i) => (
                      <div key={i}>
                        <div>{e.nombre}</div>
                        <div>{e.mensaje}</div>
                      </div>
                  ))}
                  <div ref={divRef}></div>
                </div>
              </td>
            </tr>

          </tbody>
        </table>

      </div>

    </div>
  );
};

export default Chat;
