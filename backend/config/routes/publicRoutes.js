const publicRoutes = {
  'GET /tables': 'TableController.getTables',
  'POST /table/row': 'TableController.updateRow',
  'DELETE /table/row': 'TableController.deleteRow',
  'PUT /table/rows' : 'TableController.getTableRows',
  'PUT /table/headers' : 'TableController.getTableHeaders'
}


module.exports = publicRoutes;