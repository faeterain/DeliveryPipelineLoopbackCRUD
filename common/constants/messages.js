function Messages(msg) {
    this.msg = msg;
}

Messages.OK = {
    'status': 200,
    'message': 'OK'
};

Messages.NOT_FOUND = {
    'status': 404,
    'message': 'Not Found'
};

Messages.INTERNAL_SERVER_ERROR = {
    'status': 500,
    'message': 'Server Error'
};

Messages.FORBIDDEN = {
    'status': 403,
    'message': 'Forbidden'
};


module.exports = Messages;