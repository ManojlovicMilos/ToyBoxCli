function camel(str)
{
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
}
function kebab(str)
{
    return str.replace(/([a-z])([A-Z])/g, "$1-$2")
             .replace(/\s+/g, '-')
             .toLowerCase();
}
function replace(str, str1, str2, ignore = false) 
{
    return str.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

module.exports = { camel, kebab, replace };