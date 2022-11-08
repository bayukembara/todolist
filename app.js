const exp = require("express");
const bParser = require("body-parser");
const mongo = require("mongoose");
const { list } = require("postcss");

const app = exp();

app.set("view engine", "ejs");

app.use(bParser.urlencoded({ extended: true }));
app.use(exp.static("public/css"));

// Connection MongoDB
mongo.connect(
  "mongodb+srv://Kemba23:kembara2312@cluster0.hzg3dsh.mongodb.net/todoDB?retryWrites=true&w=majority"
);

const mongoose = require("mongoose");

const url = `mongodb+srv://Kemba23:kembara2312@cluster0.hzg3dsh.mongodb.net/todoDB?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

// connect tabel
const listSchema = {
  name: String,
};
const List = mongo.model("lists", listSchema);

app.get("/", (req, res) => {
  List.find({}, (err, found) => {
    if (found.length === 0) {
    } else {
      res.render("index", {
        dataTitle: "Hari ini",
        newList: found,
      });
    }
  });
});

app.post("/", (req, res) => {
  const listName = req.body.newList;

  const list = new List({
    name: listName,
  });

  list.save();
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const checkedId = req.body.checkedId.toString().trim();
  List.findByIdAndRemove(checkedId, (err) => {
    if (!err) {
      console.log("Successfully Deleted Item");
      res.redirect("/");
    }
  });
});

app.get("/:customLink", (req, res) => {});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started");
});
