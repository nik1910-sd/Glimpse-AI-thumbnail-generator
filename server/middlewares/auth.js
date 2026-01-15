const protect = async (req, res, next) => {

    if (!req.session) {
        return res.status(401).json({ 
            success: false, 
            message: 'Session not found. Please enable cookies.' 
        });
    }

    const { isLoggedIn, userId } = req.session;

    if (!isLoggedIn || !userId) {
        return res.status(401).json({ 
            success: false, 
            message: 'You are not logged in' 
        });
    }

    next();
};

export default protect;