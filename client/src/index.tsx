/**
 * ELPIS project - 2022
 */

import structuredClone from "core-js/features/structured-clone";
import React, { useCallback } from "react";
import { render } from "react-dom";
import { useTranslation } from "react-i18next";
import "regenerator-runtime/runtime";
import { GeneralView } from "./view/general/GeneralView";
import "./i18n";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

const scopeStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};
const langStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "0.5em",
  right: "0.5em"
};
const signInStyle: React.CSSProperties = {
  position: "absolute",
  top: "0.5em",
  right: "0.5em"
};

console.log(structuredClone(signInStyle));

const changeLangBtnClick = (
  event: React.MouseEvent<HTMLButtonElement>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  i18n: any
): void => {
  const currentBtnText = String(
    event?.currentTarget?.textContent
  ).toLowerCase();
  if (
    i18n &&
    typeof i18n === "object" &&
    "changeLanguage" in i18n &&
    ["fr", "en"].includes(currentBtnText)
  ) {
    i18n.changeLanguage(currentBtnText);
  }
};

function App(): JSX.Element {
  const { i18n, t } = useTranslation();

  const onLanguageClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      changeLangBtnClick(event, i18n);
    },
    [i18n]
  );

  return (
    <GeneralView />
    /*<BrowserRouter>
      <div style={scopeStyle}>
        <span style={signInStyle}>
          <Link id="PAGES_SIGN_IN_LINK" to="sign-in">
            {String(t("FORMS.SIGN_IN.TITLE"))}
          </Link>
          &nbsp;/&nbsp;
          <Link id="PAGES_SIGN_UP_LINK" to="sign-up">
            {String(t("FORMS.SIGN_UP.TITLE"))}
          </Link>
        </span>
        <Routes>
          <Route path="generalView" element={<GeneralView />}></Route>
          <Route path="about" element={<div>page-about-us</div>}></Route>
        </Routes>
        <div style={langStyle}>
          <button id="lang-fr" onClick={onLanguageClick}>
            FR
          </button>
          <button id="lang-en" onClick={onLanguageClick}>
            EN
          </button>
        </div>
      </div>
    </BrowserRouter>*/
  );
}

render(<App />, document.getElementById("root"));
reportWebVitals(console.log);
