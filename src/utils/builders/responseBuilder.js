class ResponseBuilder {
  static CODE = {
    GET_INFO_SUCCESS: "GET_INFO_SUCCESS",
  };

  constructor() {
    this.response = {
      ok: false,
      status: 500,
      message: "",
      payload: {},
    };
  }

  setStatus(status) {
    this.response.status = status;
    return this;
  }

  setOk(ok) {
    this.response.ok = ok;
    return this;
  }

  setPayload(payload) {
    this.response.payload = payload;
    return this;
  }

  setCode(code) {
    this.response.code = code;
    return this;
  }

  setMessage(message) {
    this.response.message = message;
    return this;
  }

  build() {
    return this.response;
  }
}

export default ResponseBuilder;

export const responseBuilder = (ok, status, message, payload) => {
  return new ResponseBuilder().setOk(ok).setStatus(status).setMessage(message).setPayload(payload).build();
};
