save = function(createuser,clientname,address,telegram_id){
    sql = "insert into visits ";
    sql+= "(createuser,clientname,address,telegram_id) ";
    sql+= "values ";
    sql+= "('"+createuser+"','"+clientname+"','"+address+"','"+telegram_id+"') ";
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