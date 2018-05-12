save = function(user_id,clientname,address){
    sql = "insert into visits ";
    sql+= "(createuser,purposeofvisit,address) ";
    sql+= "values ";
    sql+= "('"+user_id+"','"+clientname+"','"+address+"') ";
    return sql;
}
getdailyvisits = function(){
    sql = "select a.username name,count(b.id)val from users a ";
    sql+= "left outer join visits b on b.sale_id=a.id ";
    //sql+= "where date(b.createdate)='2018-1-1' ";
    //sql+= "and a.id="+sale_id+" ";
    sql+= "group by a.username ";
    sql+= "limit 1,10 ";
    return sql;
}
module.exports = {
    save: save
}