/* TABLA DE USUARIOS */
CREATE TABLE users(
    user_id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username varchar(20) NOT NULL,
    first_name varchar(20) DEFAULT 'Primer Nombre',
    last_name varchar(20) DEFAULT 'Apellido',
    email varchar(20) DEFAULT 'Email',
    pass varchar(100) NOT NULL,
    gro_ups varchar(20) NOT NULL, --modificado por Matias, groups es una palabra prohibida en SQL Server
    user_permission varchar(20) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    is_superuser boolean NOT NULL,
    last_login varchar(20),
    date_joined varchar(20),
    money int(20) DEFAULT 0
)

/* TABLA DE TRANSACCIONES */
CREATE TABLE transactions(
    id_transaction int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    source_ int(10) NOT NULL,
    destiny int(10) NOT NULL,
    quantity int(50) NOT NULL,
    date_ varchar(20) NOT NULL,
    FOREIGN KEY (source_) REFERENCES users(user_id),
    FOREIGN KEY (destiny) REFERENCES users(user_id)
)

/* Modelo para cargar en Postman
{
    "username": "roberto",
    "first_name": "Roberto",
    "last_name": "Aqueveque",
    "email": "roberto27111989@gmail.com",
    "pass": "123456",
    "gro_ups": "logistica",
    "user_permission": "all",
    "is_staff": true,
    "is_active": true,
    "is_superuser": true
}
*/