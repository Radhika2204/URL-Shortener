const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const { checkforauthentication, rstrictTo } = require("./middleware/auth");
const path = require("path");
const { connectmongoose } = require("./connect");
const staticrouter = require("./routes/staticrouter");
const urlRoute = require("./routes/url");
const port = 8001;
const url = require("./models/url");
const userroute = require("./routes/user");
connectmongoose("mongodb://localhost:27017/short-url").then(
  console.log("db has connected")
);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(checkforauthentication);
app.use("/user", userroute);
app.use("/", staticrouter);

app.use("/url", rstrictTo(["NORMAL", "ADMIN"]), urlRoute);

app.get("/url/:shortid", async (req, res) => {
  const shortidd = req.params.shortid;
  const entry = await url.findOneAndUpdate(
    {
      shortId: shortidd,
    },
    {
      $push: {
        visithistory: {
          timestamps: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(port, () => {
  console.log("server has started");
});
