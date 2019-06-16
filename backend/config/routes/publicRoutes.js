const publicRoutes = {
  'GET /tables': 'TableController.getTables',
  'POST /table/row': 'TableController.updateRow',
  'POST /table/row/insert': 'TableController.insertRow',
  'DELETE /table/row': 'TableController.deleteRow',
  'PUT /table/rows' : 'TableController.getTableRows',
  'PUT /table/headers' : 'TableController.getTableHeaders'
}


module.exports = publicRoutes;