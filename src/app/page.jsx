'use client';

import React, { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./page.module.css";
import { Card, CardBody, CardHeader } from "react-bootstrap";

import LoginIcon from "@mui/icons-material/Login";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const usernameRef = useRef();

  const handleSubmit = async () => {
    const username = usernameRef.current.value;

    localStorage.clear();

    if(!username.trim()){
      toast.error("Para ingressar informe o nome de usuário")
      return;
    }

    localStorage.setItem('username', username);   
    router.push('/chat')
  }

  const getKeyDown = async (e) => {
    if(e.key == 'Enter'){
     await handleSubmit(); 
    }
  }

  return (
    <div className={`${styles.containerMain} container-xxl`}>
      <div className={`${styles.containerMain}`}>
        <header className={`${styles.header}`}>
          <h1>Bem-vindo ao TalkCall!</h1>
        </header>
        <section className={`${styles.sectionJoin}`}>
          <Card className={`${styles.cardJoin}`}>
            <CardHeader>
              <h4>Ingressar</h4>
            </CardHeader>
            <CardBody>
              <span>Nome de usuário:</span>
              <input className={`${styles.textField}`} ref={usernameRef} onKeyDown={(e) => getKeyDown(e)} />
              <button className={`${styles.buttonEnter}`} onClick={() => handleSubmit()}>
                <LoginIcon className={`${styles.iconEnter}`} />
              </button>
            </CardBody>
          </Card>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
}
