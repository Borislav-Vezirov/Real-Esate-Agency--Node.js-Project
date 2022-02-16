exports.errorHandler = function(error) {

    const errorArr = Object.keys(error.errors);

    if(errorArr.length > 0){
        return error.errors[errorArr[0]];
    }else{
        return error.message;
    };
};