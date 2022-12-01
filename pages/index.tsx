import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import {
  DataGridComponent,
  transformUserData,
} from "../components/DataGrid/DataGridComponent";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../slice/usersSlice";
import { selectAllSelected } from "../slice/selectedSlice";
import { Message } from "../interface/dataUser.interface";

export default function Home() {
  const [listMessage, setListMessage] = useState<Message[]>([]);

  const user = useSelector(selectAllUsers);
  const selectionModel = useSelector(selectAllSelected);

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function generateMessages() {
    let users = transformUserData(user).filter((u) =>
      selectionModel.includes(u._id)
    );
    let message: Message[] = [];
    users.forEach((u) => {
      message.push({
        message: `
      !Feliz cumpleanos ${u.name}!
      Hoy en tu cumpleanos numero ${
        u.age
      } sabemos que una de las cosas que te gusta hacer es: ${
          u.hobbies[randomIntFromInterval(0, u.hobbies.length - 1)]
        } por esta razón te enviamos este bono, esperamos lo disfrutes.      
      `,
        email: u.email,
      });
    });
    setListMessage(message);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Lista de Empleados</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main">
        <h1>Lista de empleados</h1>
        <DataGridComponent />
      </div>
      {selectionModel.length > 0 && (
        <button onClick={generateMessages}>Generar mensajes</button>
      )}
      {listMessage.length > 0 &&
        selectionModel.length > 0 &&
        listMessage.map((message, it) => {
          return (
            <div key={it}>
              <p>{message.message}</p>
              <a href={`mailto:${message.email}?subject=Feliz Cumpleaños&body=${message.message}`}>Enviar email</a>
            </div>
          );
        })}
    </div>
  );
}
