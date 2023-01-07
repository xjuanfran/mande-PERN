const getAllWork = async (req, res) => {
    res.send("Get Puto");
};

const getWork = (req, res) => [
    res.send("Te liste Putoooo")
]

const createWork = (req, res) => [
    res.send("Post Puto")
]

const deleteWork = (req, res) => [
    res.send("Te Elimine Putoooo")
]

const updateWork = (req, res) => [
    res.send("Te edite Putoooo")
]

module.exports = {
    getAllWork,
    getWork,
    createWork,
    deleteWork,
    updateWork
}