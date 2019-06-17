
const getUpdateQuery = (headers, values, tableName, valueToUpdate) => {

    const headersIds = values.map(cell => cell.id)
    const filteredHeaders = headers.filter((header, index) => headersIds.includes(index))
    let setValues = values.reduce((res, val, index) => res + `${filteredHeaders[index]} =  ${val.cell.type === 'string' || val.cell.type === 'TEXT' ? `'${val.cell.name}'` : val.cell.name},`, "")
    let whereStatement = '';
    Object.keys(valueToUpdate).forEach((key) => whereStatement += `${key} = ${typeof valueToUpdate[key] === 'string' || typeof valueToUpdate[key] === 'TEXT' ? `'${valueToUpdate[key]}'` : valueToUpdate[key]} AND `);

    setValues = setValues.slice(0, setValues.length - 1);
    whereStatement = whereStatement.slice(0, whereStatement.length - 5);
    return `UPDATE ${tableName} SET ${setValues} WHERE ${whereStatement}`;
}

const getDeleteQuery = (tableName, valueToDelete) => {
    let whereStatement = '';
    Object.keys(valueToDelete).forEach((key) => whereStatement += `${key} = ${typeof valueToDelete[key] === 'string' || typeof valueToDelete[key] === 'TEXT' ? `'${valueToDelete[key]}'` : valueToDelete[key]} AND `);
    whereStatement = whereStatement.slice(0, whereStatement.length - 5);
    return `DELETE FROM ${tableName} WHERE ${whereStatement}`;
}

const getInsertQuery = (tableName, headers, values) => {
    let insertValues = values.reduce((res, val, index) => res + `${val.type === 'string' || val.type === 'TEXT' ? `'${val.name }'` : val.name },`, "")
    insertValues = insertValues.slice(0, insertValues.length - 1);

    return `INSERT INTO ${tableName} VALUES (${insertValues})`
}

module.exports = {
    getUpdateQuery,
    getDeleteQuery,
    getInsertQuery
}