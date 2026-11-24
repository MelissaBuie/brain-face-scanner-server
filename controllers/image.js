// Adds one to a user's entry count after the front end detects faces in a photo.
// Face detection itself now runs in the browser with MediaPipe, so the API needs no AI key.
const handleImagePut = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImagePut: handleImagePut
}
