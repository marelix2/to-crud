
const getUpdateQuery = (headers, values, tableName, valueToUpdate) => {

    const headersIds = values.map(cell => cell.id)
    const filteredHeaders = headers.filter((header, index) => headersIds.includes(index))
    let setValues = values.reduce((res, val, index) => res + `${filteredHeaders[index]} =  ${val.cell.type === 'string' ? `'${val.cell.name}'` : val.cell.name },`, "")
    let whereStatement = '';
    Object.keys(valueToUpdate).forEach((key) => whereStatement += `${key} = ${typeof valueToUpdate[key] === 'string' ?  `'${valueToUpdate[key]}'` : valueToUpdate[key] } AND `);

    setValues = setValues.slice(0, setValues.length - 1);
    whereStatement = whereStatement.slice(0, whereStatement.length - 5);
    return `UPDATE ${tableName} SET ${setValues} WHERE ${whereStatement}`;
}

module.exports = {
    getUpdateQuery
}