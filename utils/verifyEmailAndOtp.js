module.exports = {  
    updateWithObject: (schema, object, data) => {
      return new Promise(function (resolve, reject) {
        schema
          .findOneAndUpdate(object, data, { $new: true })
          .then((resData) => {
            resolve(resData);
          })
          .catch((error) => {
            console.log("error :", error);
            reject(error);
          });
      });
    },
}