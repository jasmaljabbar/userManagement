import React, { useEffect, useState } from "react";
import Navbar from "../../items/navbar/Navbar";
import axios from "axios";

const Home = () => {
  const [message, setMessage] = useState("");
  const [admin, setAdmin] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      console.log("Yes" + localStorage.getItem("access_token"));
      window.location.href = "/login";
    } else {
      (async () => {
        try {
          const access = localStorage.getItem("access_token");
          const { data } = await axios.get("http://127.0.0.1:8000/api/home", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access}`,
            },
          });
          setMessage(data.message);
          setAdmin(localStorage.getItem("is_super"));
          console.log(localStorage.getItem("is_super"));
          console.log(admin);
        } catch (e) {
          alert("error", e);
        }
      })();
    }
  }, [admin]); 
  
  return (
    <>
      <Navbar />

      <section className="relative pt-12 bg-blueGray-50">
  <div className="container mx-auto">
    <div className="flex flex-wrap items-center">
      <div className="w-full md:w-1/3 px-4 mb-6 md:mb-0">
        <img
          alt="Company"
          className="max-w-full rounded-lg "
          src="https://img.freepik.com/premium-vector/cartoon-cube-puzzle-holding-balloon-character-design_309278-2131.jpg"
        />
      </div>
      <div className="w-full md:w-1/2 px-4">
      <div className="md:pr-12">
  <div className="flex flex-col items-center justify-center text-center">
    <h3 className="text-3xl font-semibold mb-4">Welcome to JQ World</h3>
    <p className="text-lg leading-relaxed text-blueGray-500">
      {message && message}
    </p>
  </div>
  {/* <li className="py-2 flex items-center">
      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
        <i className="far fa-paper-plane"></i>
      </span>
      <h4 className="text-lg font-semibold text-blueGray-700">
        {admin !== null
          ? admin
            ? "Admin"
            : "Not admin"
          : "No role assigned"}
      </h4>
    </li> */}
</div>

      </div>
    </div>
  </div>
        <footer className="fixed bottom-0 w-full bg-black text-white text-center py-4">
  <div className="container mx-auto px-4">
    <p className="text-sm font-semibold">
      &copy; {new Date().getFullYear()} Created by Jasmal. All rights reserved.
    </p>
  </div>
</footer>

      </section>
    </>
  );
};

export default Home;
