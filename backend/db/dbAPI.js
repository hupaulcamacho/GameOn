const db = require("./index");
const helpers = require('../auth/helpers');

const getUserById = (id, callback) => {
  db
    .any(
      "SELECT * FROM users WHERE id = ${id}",
      {id: id}
    )
    .then(data => callback(null, data[0]))
    .catch(err => {
      callback(err, false)
    });
};

const getUserByUsername = (username, callback) => {
  db
    .any(
      "SELECT * FROM users WHERE username = ${username}",
      {username: username}
    )
    .then(data => callback(null, data[0]))
    .catch(err => {
      callback(err, false)
    });
};

const registerUser = (user, callback) => {
  const newUser = {
      userName: user.username,
      fullName: user.fullname,
      passwordDigest: helpers.generatePasswordDigest(user.password),
      zipcode: user.zipcode,
      profilePicUrl: '/images/user.png',
      expPoints: 50,
      email: user.email,
      sports: user.sports,
      zipcode: user.zipcode
  }
  const sports = JSON.parse(newUser.sports)
  console.log(sports)
  db.one('INSERT INTO users(fullname, username, email, password_digest, zip_code, profile_pic, exp_points)' +
          'VALUES (${fullName}, ${userName}, ${email}, ${passwordDigest}, ${zipcode}, ${profilePicUrl}, ${expPoints})'+ 
          'RETURNING id, username, fullname, profile_pic', newUser)
  .then((user)=> {
    //id assigned by the database to the newly created user
    var user_id = user.id 
    //Check if the user selected some sports for each sport we in a hacky not sure if good way 
    //concatenate a SQL statement string so that we insert that data in one INSERT statement at once
    //if the user didn't picked any sport then skip this step altogether 
    if(sports.length) {
      //Base (header) for the SQL statement
      var SQLStatement = 'INSERT INTO sports_proficiency (user_id, sport_id, proficiency)'
      sports.forEach((sport, index) => {
        console.log(sport)
        if(index === 0) {
          SQLStatement  =  SQLStatement + '\n' + `VALUES(${user_id}, ${sport.sport_id}, ${sport.proficiency})` 
        } else {
          SQLStatement = SQLStatement + '\n' + `,(${user_id}, ${sport.sport_id}, ${sport.proficiency})`
        }
      })
      SQLStatement += ';' 

      //Feeding that SQL statement into the db instance of pg-promise
      db.none(SQLStatement)
        .then(() => callback(null, user))
        .catch((err) => callback(err))
    }
  })
  .catch(err => callback(err))
}

/**
 * Retrieves user information relevant to their profile
 * @param {string} userId - The user id to grab the info from
 * @param {Function} answer - Function that will be called with (err, data) as its arguments
 */
const getUserInfo = (userId, answer) => {
  console.log(userId)
   db.one(`SELECT id, username, fullname, email, zip_code, profile_pic, exp_points FROM users 
           WHERE id = $1`, userId) 
      .then(user => {
        db.any(`SELECT sports.name, sports.id, proficiency from sports_proficiency 
                INNER JOIN sports ON sports.id = sport_id
                WHERE user_id = $1`, userId)
          .then(sports => {
            //Aggregating info from both queries into one object
            var userInfo = {...user, sports:sports}
            return answer(null, userInfo)
          })
          .catch(err => answer(err, null))
   })
    .catch(err =>  answer(err, null))
}


/**
 * Retrieves all sports with their respective id
 * @param {Function} callback - Function that will be called with (err, data) as its arguments and is in charge of sending the response
 */
const getAllSports = (callback) => {
  db
    .any("SELECT * FROM sports")
    .then(sports => callback(null, sports))
    .catch(err => callback(err, false));
}

const getAllUsers = (callback) => {
  db.any('SELECT username, profile_pic, exp_point FROM users ORDER BY exp_points DESC')
  .then(data => callback(null, data)
  .catch(err => callback(err))
  )
}

const updateUserInfo = (userInfo, callback) => {
  db.none('UPDATE users SET username=${username},fullname=${fullname},' +
  'zip_code= ${zipcode},email=${email} WHERE id=${id}', userInfo)
  .then(() => callback(null))
  .catch(err => callback(err))
}

const updateSport = (sports, callback) => {
  const sport = JSON.parse(sports.sport)
    db.none(`UPDATE sports_proficiency SET proficiency = ${sport.proficiency} WHERE user_id = ${sports.id} AND sport_id = ${sport.sport_id}`)
    .then(() => callback(null))
    .catch(err => callback(err))
}

const addSport = (sport, callback) => {
  console.log("sport", sport);
  db
    .none(
      "INSERT INTO sports_proficiency(user_id, sport_id, proficiency) " +
        "VALUES (${user_id}, ${sport_id}, ${proficiency})",
      sport
    )
    .then(() => callback(null))
    .catch(err => callback(err));
};

const deleteSport = (sport, callback) => {
  db
    .none(
      "DELETE FROM sports_proficiency " +
        "WHERE user_id = ${user_id} AND sport_id = ${sport_id}",
      sport
    )
    .then(() => callback(null))
    .catch(err => callback(err));
};

module.exports = {
  getUserById: getUserById,
  getUserByUsername:getUserByUsername,
  registerUser: registerUser,
  getUserInfo: getUserInfo,
  getAllSports: getAllSports,
  getAllUsers: getAllUsers,
  updateUserInfo: updateUserInfo,
  updateSport: updateSport,
  addSport: addSport,
  deleteSport: deleteSport
};

