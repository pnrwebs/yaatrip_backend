let errors = {
  404: {
    status: 404,
    errorCode: "NOT_FOUND",
    error: "Not Found",
  },
};

module.exports = {
  successResponse: (res, code, resData, message) => {
    res.status(200).json({
      status: "SUCCESS",
      code,
      data: resData,
      message,
    });
  },
  badRequest: (res, code, resData) => {
    res.status(400).json({
      status: "Failure",
      code: code,
      message: resData,
    });
  },
  somethingErrorResponse: (res, code, resData, data = "") => {
    res.status(202).json({
      status: "ERROR",
      code: code,
      message: resData,
      data: data,
    });
  },
};
