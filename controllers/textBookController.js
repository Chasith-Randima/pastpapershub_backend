const TextBook = require("./../models/textBookModel");
const factory = require("./handlerFactory");
const multer = require("multer");
const sharp = require("sharp");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const path = require("path");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image,Please upload only an Image", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPhoneImages = upload.fields([{ name: "images", maxCount: 5 }]);

exports.resizePhoneImages = catchAsync(async (req, res, next) => {
  if (!req.files.images) return next();
  // console.log(req.files);

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `phone-${req.user._id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2400, 1600)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/phones/${filename}`);

      req.body.images.push(filename);
    })
  );
  next();
});

exports.getImage = catchAsync(async (req, res) => {
  let fileName = req.params.imageName;
  // console.log(path.join(__dirname, "../public/img/phones"));
  let options = {
    root: path.join(__dirname, "../public/img/phones"),
    // path: `public/img/phones/${req.params.name}`,
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile(fileName, options, function (err) {
    if (err) {
      // next(err)
      // console.log(err);
      res.status(500).json({
        err,
      });
    } else {
      console.log("Sent:", fileName);
    }
  });
});

exports.searchPapers = catchAsync(async (req, res) => {
  const { search } = req.query;

  if (search) {
    await Phone.find(
      {
        $or: [
          { brandname: { $regex: search, $options: "i" } },
          { model: { $regex: search, $options: "i" } },
          { slug: { $regex: search, $options: "i" } },
          { condition: { $regex: search, $options: "i" } },
        ],
      }
      // (err, phones) => {
      //   if (err) {
      //     console.log(err);
      //     // res.status(500).json({
      //     //   status: "failed",
      //     //   message: "There was an error...",
      //     // });
      //   }

      //   res.status(200).json(phones);
      // }
    )
      .select(
        "-images -description -network -sim -os -memory -main_camera -selfie_camera -sound -wifi -bluetooth -radio -usb -sensors -location -phoneNumber -price -createdAt -user"
      )
      .then((data) => {
        // console.log(data);
        res.status(200).json({
          status: "success",
          message: `${data.length} found...`,
          data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "failed",
          message: err,
        });
      });
  }
});

exports.createOneTextBook = factory.createOne(TextBook);
exports.getOneTextBook = factory.getOne(TextBook);
// exports.getOnePhone = factory.getOne(Phone, {
//   path: "user_virtual",
//   select: "-__v",
// });
exports.getAllTextBooks = factory.getAll(TextBook);
exports.updateTextBook = factory.updateOne(TextBook);
exports.deleteTextBook = factory.deleteOne(TextBook);
