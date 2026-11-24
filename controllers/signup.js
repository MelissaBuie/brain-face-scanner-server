const handleSignup = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    
    // Generate a salt
    const saltRounds = 10; // You can adjust the number of salt rounds if needed
    const salt = bcrypt.genSaltSync(saltRounds);
    
    // Hash the password with the salt
    const hash = bcrypt.hashSync(password, salt);
    
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0].email, // Access the first element from the returned array
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    // Respond with the new user (excluding the password for security reasons)
                    res.json(user[0]);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch(err => res.status(400).json('unable to register'));
}

module.exports = {
    handleSignup: handleSignup
};