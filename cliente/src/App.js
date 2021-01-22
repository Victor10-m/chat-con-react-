import React, { useState } from "react";
import Chat from "./componentes/Chat";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
  };
  // formulario de nombre de nuevo usuario de chat
  return (
      <div className="App" >
          <div className="container" align="center">
                {!registrado && (
                    <form onSubmit={registrar} >
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>   </th>
                                    <th>   </th>
                                    <th>   </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td width="300px">
                                        <label> Nombre de integrante de chat </label>
                                    </td>
                                    <td>
                                        <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" className="form-control form-control input-lg" />
                                    </td>
                                    <td>
                                        <div>
                                            <button className="btn btn-info btn-block">
                                                Enviar mensaje
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                )}
                {registrado && <Chat nombre={nombre} />}
            </div>
      </div>
  );
}

export default App;