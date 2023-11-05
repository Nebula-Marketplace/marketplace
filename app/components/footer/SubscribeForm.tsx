'use client'

import {useState} from "react";
import EmailSentModal from "../modal/EmailSentModal";

export default function SubscribeForm() {
  let [sent,setSent] = useState(false);

  async function send(){
    setSent(true);
  }

  return (
    <>
      <form className="form-submit">
        <input
          name="email"
          className="email"
          type="email"
          placeholder="info@yourgmail.com"
          required
        />
    
        <button id="submit" name="submit" onClick={() =>send()}>
          <i className="icon-fl-send" />
        </button>
      </form>
      {
        sent && <EmailSentModal />
      }
    </>
  );
}
