module.exports = {
    notFound: (res, err) => {
        res.status(404).json({
            msg: 'Nor Found ...'
        })
    },
    invalidData: (res, err) => {
        res.status(401).json({
            msg: 'Invalid data ...'
        })
    },
    haventRole: (res, err) => {
        res.status(403).json({
            msg: 'Have not permission ...'
        })
    },
    userSaveError: (res, err) => {
        res.status(409).json({
            msg: "Server error User not added ..."
        })
    }
};
