import express from "express";
import path from "path";
import url from "url";
import bodyParser from "body-parser";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const app = express();
const PORT = 5000;

let isAuhtorised = false;

app.use(bodyParser.urlencoded({ extended: true }));


const passwordChecker = (req, res, next) => {
    const controlPassword = req.body["password"];
    if(controlPassword === "ILoveCoding") {
        isAuhtorised = true;
    }
    next();
}
app.use(passwordChecker);


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.post("/check", (req, res) => {
    if(isAuhtorised) {
        res.sendFile(path.join(__dirname, "public", "secret.html"));
    }
    else {
        res.sendFile(path.join(__dirname, "public", "index.html"));
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});