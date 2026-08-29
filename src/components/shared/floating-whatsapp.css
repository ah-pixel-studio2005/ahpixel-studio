.global-whatsapp {
  position: fixed;
  right: clamp(18px, 2vw, 30px);
  bottom: max(24px, calc(env(safe-area-inset-bottom) + 18px));
  z-index: 10000;
  display: grid;
  width: 68px;
  height: 78px;
  place-items: center end;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
}

.global-whatsapp__copy {
  position: absolute;
  right: 34px;
  display: grid;
  width: 260px;
  gap: 4px;
  padding: 16px 45px 16px 24px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 18px;
  background: linear-gradient(135deg, #090a0c 0%, #1a1d23 100%);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  opacity: 0;
  pointer-events: none;
  transform: translateX(68px);
  transition: opacity 440ms ease, transform 580ms cubic-bezier(.18,.8,.22,1);
}

.global-whatsapp.is-expanded .global-whatsapp__copy {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0);
}

.global-whatsapp__copy strong {
  color: #f5f1e7;
  font-size: 20px;
  font-weight: 650;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.global-whatsapp__copy small {
  color: #a9adb4;
  font-size: 16px;
  line-height: 1.25;
}

.global-whatsapp__icon {
  position: relative;
  z-index: 1;
  display: grid;
  width: 66px;
  height: 66px;
  place-items: center;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  box-shadow: 
    0 12px 28px rgba(7, 100, 48, 0.43),
    0 4px 12px rgba(0, 0, 0, 0.25),
    inset 0 2px 4px rgba(255, 255, 255, 0.3);
  isolation: isolate;
  transition: transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
}

.global-whatsapp__icon::after {
  position: absolute;
  z-index: -1;
  content: "";
  border-radius: inherit;
  pointer-events: none;
}

.global-whatsapp__icon::after {
  inset: -3px;
  border: 3px solid rgba(32, 201, 104, 0.72);
  animation: whatsapp-wave 2.8s ease-out infinite;
}

.global-whatsapp svg {
  width: 31px;
  height: 31px;
  fill: currentColor;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

.global-whatsapp:hover .global-whatsapp__icon,
.global-whatsapp:focus-visible .global-whatsapp__icon {
  background: linear-gradient(135deg, #2fe36e 0%, #159b8c 100%);
  transform: translateY(-2px) scale(1.04);
  box-shadow: 
    0 16px 36px rgba(7, 100, 48, 0.55),
    0 6px 16px rgba(0, 0, 0, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.4);
}

.global-whatsapp:focus-visible { outline: none; }

@keyframes whatsapp-wave {
  0% { opacity: 0; transform: scale(1); }
  8% { opacity: .8; }
  48% { opacity: 0; transform: scale(1.62); }
  100% { opacity: 0; transform: scale(1.62); }
}

@media (max-width: 720px) {
  .global-whatsapp {
    right: 14px;
    bottom: max(30px, calc(env(safe-area-inset-bottom) + 22px));
    width: 60px;
    height: 68px;
  }

  .global-whatsapp__copy {
    right: 30px;
    width: 232px;
    padding: 14px 39px 14px 18px;
    border-radius: 16px;
  }

  .global-whatsapp__copy strong { font-size: 17px; }
  .global-whatsapp__copy small { font-size: 14px; }

  .global-whatsapp__icon {
    width: 58px;
    height: 58px;
    box-shadow: 0 10px 25px rgba(7, 100, 48, 0.43);
  }

  .global-whatsapp svg { width: 28px; height: 28px; }
}

@media (prefers-reduced-motion: reduce) {
  .global-whatsapp__copy { transition: none; }
  .global-whatsapp__icon::after { animation: none; }
}
