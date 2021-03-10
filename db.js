const Sequelize = require('sequelize');

// acá creamos la conexión a la Base de Datos
const sql = new Sequelize('whatsapp', 'root', 'laurasarabia', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sql.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Debe indicar un nombre'
      },
      len: {
        args: [2],
        msg: 'El nombre debe ser de largo al menos 2'
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Debe indicar un email'
      },
      len: {
        args: [3],
        msg: 'El email debe ser de largo al menos 3'
      },
      isEmail: {
        msg: 'Debe ser un email válido'
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Debe indicar una contraseña'
      },
      len: {
        args: [3],
        msg: 'La contraseña debe ser de largo al menos 3'
      },
    }
  },
});


const Mensaje = sql.define('Mensaje', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Debe escribir un mensaje'
      }
    }
  }, 
  time: {
    type: Sequelize.STRING,
    allowNull: false,
  }  
});


User.hasMany(Mensaje);
Mensaje.belongsTo(User);

//  después sincronizamos nuestro código con la base de datos
sql.sync()
.then(() => {
  console.log('Base de datos y tablas creadas');
}); 


// finalmente acá listamos todos los modelos que queremos exportar
module.exports = {
  User,
  Mensaje
};

