import React from "react";
import ApplyStoreModal from "./ApplyStoreModal";
import { useSelector } from "react-redux";

function Footer() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    (user === null || (user && user.user_level !== 0)) && (
      <footer className="footer-dark" style={{ flexShrink: 0 }}>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-3 item">
              <h3>Used Technologies</h3>
              <ul>
                <li>
                  <a href="https://tr.reactjs.org/" target="_blank" rel="noopener noreferrer">
                    React
                  </a>
                </li>
                <li>
                  <a href="https://laravel.com/" target="_blank" rel="noopener noreferrer">
                    Laravel
                  </a>
                </li>
                <li>
                  <a href="https://react-bootstrap.github.io/" target="_blank" rel="noopener noreferrer">
                    React Bootstrap
                  </a>
                </li>
                <li>
                  <a href="https://mui.com/" target="_blank" rel="noopener noreferrer">
                    MUI
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-3 item">
              <h3>Useful Links</h3>
              <ul>
                <li>
                  <span className="">Contact</span>
                </li>
              </ul>
              {user && user.user_level === 2 && !user.store_id && (
                <span className="" style={{ opacity: "0.6" }}>
                  <ApplyStoreModal />
                </span>
              )}
            </div>
            <div className="col-md-6 item text">
              <h3>
                Pro<strong style={{ color: "red", marginInline: "1px" }}>x</strong>tore
              </h3>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus omnis similique voluptates officia, vero quis reiciendis eius minima
                saepe quidem excepturi a distinctio sit nobis iure optio molestias quasi molestiae?
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
  );
}

export default Footer;
