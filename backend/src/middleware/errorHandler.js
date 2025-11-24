const errorHandler = (req, res, err, next)=>{
    console.log(err);
    const status = err.status || 500
    const message = err.message || "Servor Error"
    res.status(status).json({message})
}

module.exports= errorHandler