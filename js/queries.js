save = function(user_id,clientname,address,telegram_id){
    sql = "insert into visits ";
    sql+= "(createuser,purposeofvisit,address,telegram_id) ";
    sql+= "values ";
    sql+= "('"+user_id+"','"+clientname+"','"+address+"','"+telegram_id+"') ";
    return sql;
}
checkExists = function(telegram_id){
    sql = "select count(id)cnt from visits a ";
    sql+= "where telegram_id='"+telegram_id+"' ";
    return sql;
}
module.exports = {
    checkexists: checkExists,
    save: save
}