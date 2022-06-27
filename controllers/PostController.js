import PostModel from  "../models/Post.js"

export const getAll = async (req, res) => {
 try {
    const posts = await PostModel.find();
    res.json(posts)
 } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалося отримати оголошення",
    });
 }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
   PostModel.findOneAndUpdate({
        _id:postId
   }, 
   {
    returnDocument: "after"
   },
   (err, doc) => {
    if (err) {
        console.log(err);
         return res.status(500).json({
          message: "Не вдалося повернути оголошення",
        });
    }
    if (!doc) {
        return res.status(404).json({
          message: "Оголошення не знайдено",
        });
    }
res.json(doc)

}
   )
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалося отримати оголошення",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndDelete({
      _id: postId
    }, (err, doc) => {
      if (err) {
        console.log(err);
         return res.status(500).json({
          message: "Не вдалося видалити оголошення",
        });
      }
      if (!doc) {
          return res.status(404).json({
            message: "Оголошення не знайдено",
          });
      }
res.json({
  success: true
})
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалося отримати оголошення",
    });
  }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
          title: req.body.title,
          address: req.body.address,
          price: req.body.price,
          text: req.body.text,
          imageUrl: req.body.imageUrl,
        });

        const post = await doc.save();
        res.json(post)
    } catch (err) {
         console.log(err);
         res.status(500).json({
           message: "Не вдалося створити оголошення",
         });
    }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        address: req.body.address,
        price: req.body.price,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
      }
    );

    res.json({
      success: true
    })
  } catch (err) {
    res.status(500).json({
      message: "Не вдалося оновити оголошення",
    });
  }
}