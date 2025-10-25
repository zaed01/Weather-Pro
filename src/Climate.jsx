import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
//  ICONS
import CloudIcon from "@mui/icons-material/Cloud";

//  EXTERNAL
import axios from "axios";

// REACT
import { useEffect, useState } from "react";

// للترجمة
import { useTranslation } from "react-i18next";
import "./i18";

// MOMENT
import moment from "moment";
import "moment/locale/ar";
moment.locale("ar"); // أو   أي لغة أخرى تريدها

let cancelAxios = null;
export default function Climate() {
  //
  const { t, i18n } = useTranslation();
  //

  // =========  EVENT HANELER =========
  const [locale, setLocale] = useState("ar");

  function handleLanguageClick() {
    if (locale == "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setDateAndTime(moment().format("dddd، D MMMM YYYY، h:mm:ss a"));
  }

  const [dateAndTime, setDateAndTime] = useState("");
  const [temp, setTemp] = useState({
    number: null,
    discription: "",
    max: null,
    min: null,
    icon: null,
  });
  useEffect(() => {
    i18n.changeLanguage("ar");
    setDateAndTime(moment().format("dddd، D MMMM YYYY، h:mm:ss a"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=9.48&lon=48.42&appid=8dd4b67f6f0e403ce2825ad618652f5f",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 273.15);
        const tempMin = Math.round(response.data.main.temp_min - 273.15);
        const tempMax = Math.round(response.data.main.temp_max - 273.15);
        const description = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;
        setTemp({
          number: responseTemp,
          description: description,
          max: tempMax,
          min: tempMin,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });
        // console.log(responseTemp, tempMax, tempMin, description);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return () => {
      console.log("canceling");
      cancelAxios();
    };
  }, []);
  return (
    <>
      <Container maxWidth="sm" style={{}}>
        {/* CONTENT CONTAINER */}
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* CARD */}
          <div
            dir={locale == "ar" ? "rtl" : "ltr"}
            style={{
              background: "rgb(28 52 91 / 36%)",
              padding: "20px",
              width: "700px",
              borderRadius: "20px",
              boxShadow: "0px 10px 1px rgba(0,0,0,0.1)",
            }}
          >
            {/* CONTENT */}
            <div>
              {/* CITY & TIME */}
              <div
                dir={locale == "ar" ? "rtl" : "ltr"}
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "end",
                }}
              >
                <Typography
                  variant="h2"
                  style={{ marginRight: "10px", fontWeight: "700" }}
                >
                  {t("Damas")}
                </Typography>
                <Typography variant="h5" style={{ marginRight: "10px" }}>
                  {dateAndTime}
                </Typography>
              </div>
              {/*=== CITY & TIME ===*/}

              <hr />

              {/* CONTAINER DEGREE +  ICON CLIMATE*/}
              <div
                dir={locale == "ar" ? "rtl" : "ltr"}
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                {/* DEGREE & DESCRIPTION */}
                <div>
                  {/* TEMP */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h1" style={{ textAlign: "right" }}>
                      {temp.number}
                    </Typography>

                    {/* TODO : TEMP IMAGE */}
                    <img src={temp.icon} />
                    {/*=== TODO : TEMP IMAGE ===*/}
                  </div>
                  {/* TEMP */}

                  <Typography variant="h6">{t(temp.description)}</Typography>

                  {/* MIN & MAX */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h5>
                      {t("min")} : {temp.min}
                    </h5>
                    <h5 style={{ margin: "0px 10px" }}>|</h5>
                    <h5>
                      {t("max")} : {temp.max}
                    </h5>
                  </div>
                  {/*== MIN & MAX ==*/}
                </div>
                {/*=== DEGREE & DESCRIPTION ===*/}

                {/* ICON CLIMATE */}
                <CloudIcon style={{ fontSize: "200px" }} />
                {/*== ICON CLIMATE ==*/}
              </div>
              {/*=== CONTAINER DEGREE +  ICON CLIMATE ===*/}
            </div>
            {/*=== CONTENT ===*/}
          </div>
          {/*== CARD ==*/}

          {/* TRANSLATION CONTAINER */}
          <div
            dir={locale == "ar" ? "rtl" : "ltr"}
            style={{
              display: "flex",
              justifyContent: "end",
              width: "700px",
              marginTop: "20px",
            }}
          >
            <Button
              style={{ background: "none", color: "white" }}
              variant="text"
              onClick={handleLanguageClick}
            >
              {locale == "en" ? "Arabic" : "الانجليزية"}
            </Button>
          </div>
          {/*=== TRANSLATION CONTAINER ===*/}
        </div>
        {/*=== CONTENT CONTAINER ===*/}
      </Container>
    </>
  );
}
